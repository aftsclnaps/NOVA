// On Vercel, the frontend and the /api serverless functions live on the same
// domain, so a relative path works in both production and local `vercel dev`.
const API_BASE = import.meta.env.VITE_API_BASE || "/api";

/**
 * Sends the chat history + mood + vault to our backend and returns Nova's reply text.
 */
export async function sendChatMessage({ messages, mood, vault }) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, mood, vault }),
  });

  if (!res.ok) {
    throw new Error("Failed to reach Nova");
  }

  const data = await res.json();
  return data.reply;
}

/**
 * Fetches today's chaotic vibe read: { pep, warning, directive }
 */
export async function fetchDailyVibe() {
  const res = await fetch(`${API_BASE}/vibe`);

  if (!res.ok) {
    throw new Error("Failed to fetch today's vibe");
  }

  return res.json();
}

/**
 * Sends a situation description and returns Nova's hot take: { score, label, verdict }
 */
export async function fetchVerdict(situation) {
  const res = await fetch(`${API_BASE}/verdict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ situation }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch verdict");
  }

  return res.json();
}
