import { useState, useEffect } from "react";

const DAYS   = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

export default function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setBlink(b => !b);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const rawH = time.getHours();
  const hr12 = rawH % 12 || 12;
  const min  = time.getMinutes();
  const sec  = time.getSeconds();
  const ampm = rawH >= 12 ? "PM" : "AM";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div style={{
        minHeight: "100vh", background: "#050a0f",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Share Tech Mono', monospace",
        backgroundImage: "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}>
        <div style={{ animation: "fadeUp 0.8s ease both" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#4d9ab5", textTransform: "uppercase", textAlign: "center", marginBottom: 24 }}>
            system time — live feed
          </p>

          <div style={{
            background: "#0a1520", border: "1px solid #0f3a55", borderRadius: 4,
            padding: "40px 50px 36px",
            boxShadow: "0 0 40px rgba(0,229,255,0.08), inset 0 1px 0 rgba(0,229,255,0.06)",
            position: "relative",
          }}>
            {/* Corner accents */}
            {[
              { top: -1, left: -1, borderWidth: "2px 0 0 2px" },
              { bottom: -1, right: -1, borderWidth: "0 2px 2px 0" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: 12, height: 12, borderStyle: "solid", borderColor: "#00e5ff", opacity: 0.5, ...s }} />
            ))}

            {/* Time display */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Hours */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 80, fontWeight: 900, color: "#00e5ff", textShadow: "0 0 20px rgba(0,229,255,0.5)", lineHeight: 1 }}>
                  {pad(hr12)}
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#1a4a6a", textTransform: "uppercase", marginTop: 6 }}>HRS</div>
              </div>

              {/* Colon 1 */}
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 80, fontWeight: 700, color: "#00e5ff", padding: "0 6px", marginBottom: 20, opacity: blink ? 1 : 0.15, transition: "opacity 0.15s", textShadow: "0 0 10px #00e5ff" }}>:</div>

              {/* Minutes */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 80, fontWeight: 900, color: "#00e5ff", textShadow: "0 0 20px rgba(0,229,255,0.5)", lineHeight: 1 }}>
                  {pad(min)}
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#1a4a6a", textTransform: "uppercase", marginTop: 6 }}>MIN</div>
              </div>

              {/* Colon 2 */}
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 56, fontWeight: 700, color: "#00ff99", padding: "0 6px", marginBottom: 20, opacity: blink ? 1 : 0.15, transition: "opacity 0.15s", textShadow: "0 0 10px #00ff99" }}>:</div>

              {/* Seconds */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 56, fontWeight: 900, color: "#00ff99", textShadow: "0 0 20px rgba(0,255,153,0.4)", lineHeight: 1 }}>
                  {pad(sec)}
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#1a4a6a", textTransform: "uppercase", marginTop: 6 }}>SEC</div>
              </div>

              {/* AM/PM */}
              <div style={{
                fontFamily: "'Share Tech Mono', monospace", fontSize: 13, letterSpacing: "0.2em",
                color: "#ff6b35", background: "rgba(255,107,53,0.08)",
                border: "1px solid rgba(255,107,53,0.25)", padding: "3px 10px", borderRadius: 2,
                marginLeft: 14, alignSelf: "flex-end", marginBottom: 22,
                textShadow: "0 0 8px #ff6b35",
              }}>{ampm}</div>
            </div>

            {/* Date bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, paddingTop: 16, borderTop: "1px solid #0f3a55", marginTop: 8 }}>
              <span style={{ fontSize: 12, letterSpacing: "0.15em", color: "#4d9ab5" }}>{DAYS[time.getDay()]}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#0f3a55", display: "inline-block" }} />
              <span style={{ fontSize: 12, letterSpacing: "0.15em", color: "#4d9ab5" }}>
                {pad(time.getDate())} {MONTHS[time.getMonth()]} {time.getFullYear()}
              </span>
            </div>
          </div>

          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 20 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00ff99", boxShadow: "0 0 6px #00ff99", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "#1a4a6a", textTransform: "uppercase" }}>
              Clock Synchronized — Updating Every Second
            </span>
          </div>
        </div>
      </div>
    </>
  );
}