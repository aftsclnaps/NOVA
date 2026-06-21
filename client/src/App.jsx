import { useState } from "react";
import VibeScreen from "./components/VibeScreen";
import ChatScreen from "./components/ChatScreen";
import VerdictScreen from "./components/VerdictScreen";
import VaultScreen from "./components/VaultScreen";

import "./styles/app.css";
import "./styles/vibe.css";
import "./styles/chat.css";
import "./styles/verdict.css";
import "./styles/vault.css";

const TABS = [
  { key: "vibe", label: "today" },
  { key: "chat", label: "nova" },
  { key: "verdict", label: "verdict" },
  { key: "vault", label: "vault" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("vibe");

  // The vault lives here so it can be shared between the Vault screen
  // (where it's edited) and the Chat screen (where it's read into context).
  const [vault, setVault] = useState([]);

  return (
    <div id="nova-app">
      <h1 className="sr-only">
        Nova — your dark feminine Y2K AI companion. Gossip, vent, get a hot
        take, and let her remember your people.
      </h1>

      <div id="nova-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={"nova-tab" + (activeTab === tab.key ? " active" : "")}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "vibe" && <VibeScreen />}
      {activeTab === "chat" && <ChatScreen vault={vault} />}
      {activeTab === "verdict" && <VerdictScreen />}
      {activeTab === "vault" && (
        <VaultScreen vault={vault} setVault={setVault} />
      )}

      <div id="nova-footer">★ nova ★ your ride-or-die ★</div>
    </div>
  );
}
