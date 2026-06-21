import { useEffect, useRef, useState } from "react";
import NovaAvatar from "./NovaAvatar";
import { sendChatMessage } from "../api";

const MOODS = [
  { key: "gossip", label: "spill it" },
  { key: "vent", label: "vent" },
  { key: "hype", label: "hype me" },
  { key: "soft", label: "soft mode" },
  { key: "advice", label: "real talk" },
];

const STARTER_PROMPTS = [
  { label: "work drama", text: "work drama, i need to talk about it" },
  { label: "boy situation", text: "something happened with this guy" },
  { label: "not okay", text: "i'm not okay honestly" },
];

const INITIAL_MESSAGE = {
  role: "nova",
  text: "heyyy. nova's here. what's the situation? because i know there's always one.",
  showStarters: true,
};

export default function ChatScreen({ vault }) {
  const [mood, setMood] = useState("gossip");
  const [displayMessages, setDisplayMessages] = useState([INITIAL_MESSAGE]);
  const [apiHistory, setApiHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayMessages, isTyping]);

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 80) + "px";
  }

  async function handleSend(overrideText) {
    const text = (overrideText ?? input).trim();
    if (!text) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setDisplayMessages((prev) => [...prev, { role: "user", text }]);
    const newHistory = [...apiHistory, { role: "user", content: text }];
    setApiHistory(newHistory);
    setIsTyping(true);

    try {
      const reply = await sendChatMessage({
        messages: newHistory,
        mood,
        vault,
      });
      setApiHistory((prev) => [...prev, { role: "assistant", content: reply }]);
      setDisplayMessages((prev) => [...prev, { role: "nova", text: reply }]);
    } catch {
      setDisplayMessages((prev) => [
        ...prev,
        { role: "nova", text: "bestie i glitched — say that again?" },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="nova-screen" id="chat-screen-component">
      <div className="chat-top">
        <div className="nova-av-wrap">
          <NovaAvatar size={44} />
        </div>
        <div>
          <div className="nova-nm">nova.</div>
          <div className="nova-st">
            <span className="nova-dot" />
            online — and she has thoughts
          </div>
        </div>
      </div>

      <div className="mpills">
        {MOODS.map((m) => (
          <button
            key={m.key}
            className={"mp" + (mood === m.key ? " on" : "")}
            onClick={() => setMood(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="msgs" ref={scrollRef}>
        {displayMessages.map((msg, i) => (
          <div className={"row " + (msg.role === "user" ? "me" : "nova")} key={i}>
            {msg.role === "nova" && (
              <div className="mav">
                <NovaAvatar size={28} />
              </div>
            )}
            <div>
              <div className="bbl">{msg.text}</div>
              {msg.showStarters && (
                <div className="qrow">
                  {STARTER_PROMPTS.map((s) => (
                    <button
                      key={s.label}
                      className="qb"
                      onClick={() => handleSend(s.text)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="row nova">
            <div className="mav">
              <NovaAvatar size={28} />
            </div>
            <div className="bbl typing-bbl">
              <div className="tdots">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="inp-row">
        <textarea
          ref={textareaRef}
          className="chat-inp"
          placeholder="tell nova everything..."
          rows={1}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            autoResize();
          }}
          onKeyDown={handleKeyDown}
        />
        <button className="sbtn" onClick={() => handleSend()} aria-label="Send">
          ↑
        </button>
      </div>
    </div>
  );
}
