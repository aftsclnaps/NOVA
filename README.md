# nova 🖤

> your ride-or-die. a dark feminine, Y2K-coded AI companion for the girls who need to vent, gossip, and get a real verdict — not another wellness app.

Nova is an AI companion chatbot with four core experiences:

- **Today** — a chaotic daily "vibe read" (no astrology, just sharp intuition)
- **Nova** — live chat with 5 mood modes (spill it / vent / hype me / soft mode / real talk)
- **Verdict** — describe a situation, get a 1–10 hot take with a verdict you can copy and share
- **Vault** — a personal "drama dossier": save people in your life with notes and a vibe score, and Nova remembers them in conversation

Built as a portfolio project. Deployed entirely on **Vercel** — static React frontend + serverless API functions, powered by the Anthropic Claude API.

---

## Project structure

```
nova/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Nova's screens: VibeScreen, ChatScreen, VerdictScreen, VaultScreen
│   │   ├── styles/         # Global theme + design tokens
│   │   ├── api.js          # Frontend API client — calls our own /api routes
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── api/                     # Vercel serverless functions (the backend)
│   ├── chat.js              # Handles chat + mood system prompts
│   ├── vibe.js               # Daily vibe check endpoint
│   └── verdict.js            # Hot take / verdict endpoint
├── lib/
│   └── personas.js           # Nova's personality system prompts, shared by all functions
├── vercel.json                # Tells Vercel how to build the client + route /api
└── package.json                # Root deps (Anthropic SDK) needed by the serverless functions
```

## Why serverless functions instead of an Express server?

Vercel doesn't run a persistent `app.listen()` server. Each file inside `/api`
automatically becomes its own HTTP endpoint (`api/chat.js` → `/api/chat`,
etc.), spun up on demand. This keeps everything — frontend and backend — on
one Vercel project with one deploy, and your `ANTHROPIC_API_KEY` stays
server-side as a Vercel environment variable, never exposed to the browser.

## Local development

### 1. Install the Vercel CLI (one time)

```bash
npm install -g vercel
```

### 2. Install dependencies

```bash
npm install              # root deps used by /api functions
cd client && npm install # frontend deps
cd ..
```

### 3. Add your API key locally

Create a `.env` file at the project root:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 4. Run it

```bash
vercel dev
```

This serves the frontend **and** the `/api` functions together, exactly like
production. Open the URL it gives you (usually `http://localhost:3000`).

## Deploying to Vercel

See the step-by-step deployment guide in this conversation, or:

1. Push this repo to GitHub
2. Import it on [vercel.com/new](https://vercel.com/new)
3. Add `ANTHROPIC_API_KEY` as an environment variable in the Vercel dashboard
4. Deploy

## Tech stack

- **Frontend:** React + Vite, no UI library — fully custom design system
- **Backend:** Vercel Serverless Functions (Node.js)
- **AI:** Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Fonts:** Cormorant Garamond (serif/editorial) + Space Mono (UI/technical)
- **Persistence:** in-memory for vault data in this version (see "Next steps")

## Next steps / roadmap

- [ ] Add a real database (e.g. Vercel Postgres or Supabase) so the vault persists across sessions
- [ ] User accounts + auth
- [ ] Mobile app (React Native) once the web MVP is validated

---

Built with Claude. 🖤
