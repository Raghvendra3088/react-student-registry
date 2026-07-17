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

  const pad  = (n) => String(n).padStart(2, "0");
  const rawH = time.getHours();
  const hr12 = rawH % 12 || 12;
  const min  = time.getMinutes();
  const sec  = time.getSeconds();
  const ampm = rawH >= 12 ? "PM" : "AM";

  const tzStr = time.toTimeString().match(/\((.+)\)/)?.[1];
  const tzAbbr = tzStr ? tzStr.split(" ").map(w => w[0]).join("") : "UTC";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap');
        @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse  { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes scan   { from { transform:translateY(-100%); } to { transform:translateY(100vh); } }
        .clock-grid {
          position:fixed; inset:0; pointer-events:none;
          background-image: linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .scanline {
          position:fixed; top:0; left:0; right:0; height:80px; pointer-events:none;
          background: linear-gradient(transparent, rgba(0,229,255,0.025), transparent);
          animation: scan 6s linear infinite;
        }
        .status-dot { animation: pulse 2s ease-in-out infinite; }
      `}</style>

      <div className="clock-grid" />
      <div className="scanline" />

      <div style={{
        minHeight: "100vh", background: "#050a0f",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Share Tech Mono', monospace",
        animation: "fadeIn 1s ease both",
        position: "relative",
      }}>
        {/* Label */}
        <p style={{
          fontSize: 11, letterSpacing: "0.4em", color: "#4d9ab5",
          textTransform: "uppercase", marginBottom: 24,
          borderBottom: "1px solid #0f3a55", paddingBottom: 8,
        }}>
          // system time — live feed
        </p>

        {/* Main Panel */}
        <div style={{
          background: "#0a1520", border: "1px solid #0f3a55",
          borderRadius: 4, padding: "40px 50px 36px",
          boxShadow: "0 0 40px rgba(0,229,255,0.08), inset 0 1px 0 rgba(0,229,255,0.06)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
          position: "relative",
        }}>
          {/* Corner decorators */}
          <span style={{ position:"absolute", top:-1, left:-1, width:12, height:12, borderTop:"2px solid #00e5ff", borderLeft:"2px solid #00e5ff", opacity:0.5 }} />
          <span style={{ position:"absolute", bottom:-1, right:-1, width:12, height:12, borderBottom:"2px solid #00e5ff", borderRight:"2px solid #00e5ff", opacity:0.5 }} />

          {/* Time Row */}
          <div style={{ display:"flex", alignItems:"center" }}>
            {/* Hours */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <span style={{
                fontFamily:"'Orbitron', monospace", fontSize: 80, fontWeight:900,
                color:"#00e5ff", letterSpacing:"0.05em", minWidth:"2ch", textAlign:"center",
                textShadow:"0 0 8px #00e5ff, 0 0 20px rgba(0,229,255,0.5)",
              }}>{pad(hr12)}</span>
              <span style={{ fontSize:9, color:"#1a4a6a", letterSpacing:"0.25em" }}>HRS</span>
            </div>

            {/* Colon 1 */}
            <span style={{
              fontFamily:"'Orbitron', monospace", fontSize:80, fontWeight:700,
              color:"#00e5ff", padding:"0 4px", marginBottom:20,
              textShadow:"0 0 10px #00e5ff",
              opacity: blink ? 1 : 0.15, transition:"opacity 0.15s",
            }}>:</span>

            {/* Minutes */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <span style={{
                fontFamily:"'Orbitron', monospace", fontSize:80, fontWeight:900,
                color:"#00e5ff", letterSpacing:"0.05em", minWidth:"2ch", textAlign:"center",
                textShadow:"0 0 8px #00e5ff, 0 0 20px rgba(0,229,255,0.5)",
              }}>{pad(min)}</span>
              <span style={{ fontSize:9, color:"#1a4a6a", letterSpacing:"0.25em" }}>MIN</span>
            </div>

            {/* Colon 2 */}
            <span style={{
              fontFamily:"'Orbitron', monospace", fontSize:56, fontWeight:700,
              color:"#00ff99", padding:"0 4px", marginBottom:20,
              textShadow:"0 0 10px #00ff99",
              opacity: blink ? 1 : 0.15, transition:"opacity 0.15s",
            }}>:</span>

            {/* Seconds */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <span style={{
                fontFamily:"'Orbitron', monospace", fontSize:56, fontWeight:900,
                color:"#00ff99", letterSpacing:"0.05em", minWidth:"2ch", textAlign:"center",
                textShadow:"0 0 8px #00ff99, 0 0 20px rgba(0,255,153,0.4)",
              }}>{pad(sec)}</span>
              <span style={{ fontSize:9, color:"#1a4a6a", letterSpacing:"0.25em" }}>SEC</span>
            </div>

            {/* AM/PM */}
            <span style={{
              fontSize:13, letterSpacing:"0.2em", color:"#ff6b35",
              background:"rgba(255,107,53,0.08)", border:"1px solid rgba(255,107,53,0.25)",
              padding:"3px 10px", borderRadius:2, marginLeft:12, marginBottom:18,
              textShadow:"0 0 8px #ff6b35", alignSelf:"flex-end",
            }}>{ampm}</span>
          </div>

          {/* Date Bar */}
          <div style={{
            display:"flex", alignItems:"center", gap:16,
            paddingTop:16, borderTop:"1px solid #0f3a55",
            width:"100%", justifyContent:"center",
          }}>
            <span style={{ fontSize:12, letterSpacing:"0.15em", color:"#4d9ab5" }}>
              {DAYS[time.getDay()]}
            </span>
            <span style={{ width:3, height:3, borderRadius:"50%", background:"#0f3a55", display:"inline-block" }} />
            <span style={{ fontSize:12, letterSpacing:"0.15em", color:"#4d9ab5" }}>
              {pad(time.getDate())} {MONTHS[time.getMonth()]} {time.getFullYear()}
            </span>
            <span style={{ width:3, height:3, borderRadius:"50%", background:"#0f3a55", display:"inline-block" }} />
            <span style={{ fontSize:12, letterSpacing:"0.15em", color:"#4d9ab5" }}>{tzAbbr}</span>
          </div>
        </div>

        {/* Status Bar */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:20 }}>
          <span className="status-dot" style={{
            width:5, height:5, borderRadius:"50%",
            background:"#00ff99", boxShadow:"0 0 6px #00ff99", display:"inline-block",
          }} />
          <span style={{ fontSize:10, letterSpacing:"0.2em", color:"#1a4a6a", textTransform:"uppercase" }}>
            Clock Synchronized — Updating Every Second
          </span>
        </div>
      </div>
    </>
  );
}
