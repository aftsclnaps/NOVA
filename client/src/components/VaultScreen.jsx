import { useState } from "react";

const AVATAR_FILLS = ["#2a1060", "#1a1a5a", "#1a3a28", "#3a1a10", "#281040"];
const AVATAR_TEXTS = ["#c9b8ff", "#88b8ff", "#88e0b8", "#f0a878", "#d088f0"];

const EMPTY_FORM = { name: "", tag: "", receipts: "", score: "" };

export default function VaultScreen({ vault, setVault }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  function openModal() {
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleSave() {
    const name = form.name.trim();
    if (!name) return;

    setVault((prev) => [
      ...prev,
      {
        name,
        tag: form.tag.trim() || "person",
        receipts: form.receipts.trim() || "no receipts yet",
        score: form.score || "5",
      },
    ]);
    closeModal();
  }

  function scoreColor(score) {
    const n = parseInt(score, 10) || 5;
    if (n >= 8) return "var(--pk)";
    if (n >= 5) return "var(--v)";
    return "var(--gd)";
  }

  return (
    <div className="nova-screen" id="vault-screen-component">
      <div className="vault-hero">
        <div>
          <div className="vault-ey">drama dossier</div>
          <div className="vault-hl">the vault.</div>
        </div>
        <button className="vault-add-btn" onClick={openModal}>
          + add person
        </button>
      </div>

      <div className="vault-body">
        {modalOpen && (
          <div className="vmodal open">
            <div className="vmodal-title">add to the vault</div>

            <div>
              <div className="vm-lbl">name or nickname</div>
              <input
                className="vm-in"
                placeholder="e.g. the situationship..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <div className="vm-lbl">who are they?</div>
              <input
                className="vm-in"
                placeholder="e.g. coworker, ex..."
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
              />
            </div>

            <div>
              <div className="vm-lbl">the receipts</div>
              <input
                className="vm-in"
                placeholder="give nova the full context..."
                value={form.receipts}
                onChange={(e) => setForm({ ...form, receipts: e.target.value })}
              />
            </div>

            <div>
              <div className="vm-lbl">vibe score 1–10</div>
              <input
                className="vm-in"
                type="number"
                min="1"
                max="10"
                placeholder="1 = red flag city, 10 = she approves"
                value={form.score}
                onChange={(e) => setForm({ ...form, score: e.target.value })}
              />
            </div>

            <div className="vm-btns">
              <button className="vm-btn vms" onClick={handleSave}>
                save to vault
              </button>
              <button className="vm-btn vmc" onClick={closeModal}>
                cancel
              </button>
            </div>
          </div>
        )}

        {vault.length === 0 ? (
          <div className="vault-empty">
            the vault is empty.
            <br />
            add people so nova
            <br />
            can keep the receipts.
          </div>
        ) : (
          <div className="vault-list">
            {vault.map((p, i) => {
              const ci = i % AVATAR_FILLS.length;
              return (
                <div className="pcard" key={i}>
                  <div className="pcard-top">
                    <div
                      className="pav"
                      style={{
                        background: AVATAR_FILLS[ci],
                        color: AVATAR_TEXTS[ci],
                      }}
                    >
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="pname">{p.name}</div>
                      <div className="ptag">{p.tag}</div>
                    </div>
                    <div className="pscore-wrap">
                      <span
                        className="pscore"
                        style={{ color: scoreColor(p.score) }}
                      >
                        {p.score}
                      </span>
                      <span className="pscore-denom">/10</span>
                    </div>
                  </div>
                  <div className="preceipts">{p.receipts}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
