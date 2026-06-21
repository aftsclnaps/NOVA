/**
 * Minimal Gemini API client.
 *
 * Gemini's request/response shape is different from Anthropic's:
 * - "system" prompts go in `system_instruction`, not a top-level `system` field
 * - chat history uses `role: "user" | "model"` (not "assistant")
 * - each message is `{ role, parts: [{ text }] }` instead of `{ role, content }`
 * - the API key is passed as a header, not via an SDK client object
 *
 * Keeping all of that translation in one place means the route files stay
 * simple and read almost the same as the old Anthropic versions.
 */

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * @param {string} systemPrompt - Nova's personality / instructions for this call
 * @param {Array<{role: 'user'|'assistant', content: string}>} messages - chat history in Anthropic-style shape
 * @param {number} maxOutputTokens - cap on response length
 * @returns {Promise<string>} the model's reply text
 */
export async function callGemini(systemPrompt, messages, maxOutputTokens = 600) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
  }

  // Translate Anthropic-style messages into Gemini's `contents` shape.
  // Gemini uses "model" instead of "assistant" for the AI's own turns.
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      maxOutputTokens,
    },
  };

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return text;
}
