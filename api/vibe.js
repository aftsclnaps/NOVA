import { callGemini } from "../lib/gemini.js";
import { VIBE_SYSTEM_PROMPT } from "../lib/personas.js";
import { parseNovaJson } from "../lib/parseJson.js";

const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const day = DAYS[new Date().getDay()];

    const raw = await callGemini(
      VIBE_SYSTEM_PROMPT(day),
      [{ role: "user", content: `vibe for ${day}` }],
      800
    );

    const parsed = parseNovaJson(raw);

    res.status(200).json(parsed);
  } catch (err) {
    console.error("Error in /api/vibe:", err.message);
    res.status(500).json({
      error: "Nova's signal is off right now. Try refreshing.",
    });
  }
}
