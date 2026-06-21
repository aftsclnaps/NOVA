/**
 * Gemini sometimes wraps JSON in markdown fences, and on rare occasions a
 * response gets cut off mid-string if it runs against the token limit
 * (especially since Gemini 2.5 models spend some of that budget on internal
 * "thinking" before the visible answer). This helper makes parsing resilient
 * to both problems instead of letting a single truncated reply 500 the whole
 * endpoint.
 */
export function parseNovaJson(raw) {
  const cleaned = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    // Fall through to the repair attempt below.
  }

  // Attempt a light repair: close any unterminated string and brace, then
  // retry. This rescues a response that was truncated mid-value rather than
  // failing outright.
  let repaired = cleaned;

  // If there's an odd number of unescaped quotes, the last string never closed.
  const quoteCount = (repaired.match(/(?<!\\)"/g) || []).length;
  if (quoteCount % 2 !== 0) {
    repaired += '"';
  }

  // Balance any unclosed braces.
  const openBraces = (repaired.match(/{/g) || []).length;
  const closeBraces = (repaired.match(/}/g) || []).length;
  repaired += "}".repeat(Math.max(0, openBraces - closeBraces));

  try {
    return JSON.parse(repaired);
  } catch (err) {
    // Give up gracefully with a clear error rather than a cryptic JSON one.
    throw new Error(
      `Could not parse Nova's response as JSON, even after repair attempt: ${err.message}`
    );
  }
}
