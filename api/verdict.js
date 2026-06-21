import { callGemini } from "../lib/gemini.js";
import { VERDICT_SYSTEM_PROMPT } from "../lib/personas.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { situation } = req.body;

    if (!situation || typeof situation !== "string" || !situation.trim()) {
      return res.status(400).json({ error: "situation is required" });
    }

    const raw = await callGemini(
      VERDICT_SYSTEM_PROMPT,
      [{ role: "user", content: situation }],
      400
    );

    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    res.status(200).json(parsed);
  } catch (err) {
    console.error("Error in /api/verdict:", err.message);
    res.status(500).json({
      error: "Nova glitched but she still thinks it's messy. Try again.",
    });
  }
}
