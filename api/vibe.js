import Anthropic from "@anthropic-ai/sdk";
import { VIBE_SYSTEM_PROMPT } from "../lib/personas.js";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: VIBE_SYSTEM_PROMPT(day),
      messages: [{ role: "user", content: `vibe for ${day}` }],
    });

    const raw = response.content?.[0]?.text ?? "";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    res.status(200).json(parsed);
  } catch (err) {
    console.error("Error in /api/vibe:", err.message);
    res.status(500).json({
      error: "Nova's signal is off right now. Try refreshing.",
    });
  }
}
