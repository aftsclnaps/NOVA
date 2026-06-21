import { useState } from "react";
import { fetchVerdict } from "../api";

export default function VerdictScreen() {
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copyLabel, setCopyLabel] = useState("copy as shareable text");

  async function handleGetVerdict() {
    const text = situation.trim();
    if (!text) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await fetchVerdict(text);
      setResult({ ...data, situation: text });
    } catch {
      setResult({
        score: "?",
        label: "signal lost",
        verdict: "nova glitched but she still thinks it's messy. try again.",
        situation: text,
      });
    } finally {
      setLoading(false);
    }
  }

  function scoreColor(score) {
    const n = parseInt(score, 10);
    if (Number.isNaN(n)) return "var(--v)";
    if (n >= 8) return "var(--pk)";
    if (n >= 5) return "var(--v)";
    return "var(--gd)";
  }

  function handleCopy() {
    if (!result) return;
    const text = `nova's verdict:\n\n"${result.situation}"\n\n${result.score}/10 — ${result.label}\n\n${result.verdict}\n\n★ nova ★`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopyLabel("copied ✓");
    setTimeout(() => setCopyLabel("copy as shareable text"), 2000);
  }

  return (
    <div className="nova-screen" id="verdict-screen-component">
      <div className="take-hero">
        <div className="take-ey">nova's verdict</div>
        <div className="take-hl">
          she will rate this.
          <br />
          she will not be gentle.
        </div>
      </div>

      <div className="take-body">
        <textarea
          className="take-inp"
          placeholder="describe the situation in full. she needs all of it."
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
        />
        <button className="take-go" onClick={handleGetVerdict} disabled={loading}>
          {loading ? "nova is thinking..." : "get the verdict"}
        </button>

        {result && (
          <div className="take-card">
            <div className="take-card-top">
              <div className="take-num" style={{ color: scoreColor(result.score) }}>
                {result.score}/10
              </div>
              <div className="take-num-meta">
                <div className="take-num-label">nova's rating</div>
                <div className="take-rating-txt">{result.label}</div>
              </div>
            </div>
            <div className="take-verdict">{result.verdict}</div>
            <button className="take-share" onClick={handleCopy}>
              {copyLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
