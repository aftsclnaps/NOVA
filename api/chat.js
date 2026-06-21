import { callGemini } from "../lib/gemini.js";
import { MOOD_PROMPTS, DEFAULT_MOOD, buildVaultContext } from "../lib/personas.js";

export default async function handler(req, res) {
  // Basic CORS so this works whether the frontend is on the same domain or not.
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
    const { messages, mood, vault } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages must be a non-empty array" });
    }

    const selectedMood = MOOD_PROMPTS[mood] ? mood : DEFAULT_MOOD;
    const basePrompt = MOOD_PROMPTS[selectedMood];
    const vaultContext = buildVaultContext(vault);
    const systemPrompt = basePrompt + vaultContext;

    const reply = await callGemini(systemPrompt, messages, 600);
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Error in /api/chat:", err.message);
    res.status(500).json({ error: "Nova glitched. Try again in a second." });
  }
}
