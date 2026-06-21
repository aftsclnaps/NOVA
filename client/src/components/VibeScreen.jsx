import { useEffect, useState } from "react";
import { fetchDailyVibe } from "../api";

export default function VibeScreen() {
  const [vibe, setVibe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  async function loadVibe() {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchDailyVibe();
      setVibe(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVibe();
  }, []);

  return (
    <div className="nova-screen" id="vibe-screen-component">
      <div className="vibe-hero">
        <div className="vibe-eyebrow">nova's read</div>
        <div className="vibe-headline">
          what's the energy
          <br />
          today?
        </div>
        <div className="vibe-day-sub">{today.toUpperCase()}</div>
      </div>

      <div className="vibe-body">
        <div className="vibe-read-label">the vibe</div>

        {loading && (
          <div className="vibe-loading-txt">
            reading the room
            <span className="vibe-dots">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}

        {!loading && error && (
          <div className="vibe-loading-txt">
            nova's signal is off right now. try refreshing.
          </div>
        )}

        {!loading && !error && vibe && (
          <>
            <div className="vibe-text">{vibe.pep}</div>
            <div className="vibe-sep" />
            <div className="vibe-warn-row">
              <div className="vibe-warn-label">watch out for</div>
              <div className="vibe-warn-text">{vibe.warning}</div>
            </div>
            <div className="vibe-directive">{vibe.directive}</div>
          </>
        )}

        <button className="vibe-refresh" onClick={loadVibe} disabled={loading}>
          refresh read &#8635;
        </button>
      </div>
    </div>
  );
}
