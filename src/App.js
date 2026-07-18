import { useState } from "react";
import StudentRegistry from "./components/StudentRegistry/StudentRegistry";
import LiveClock from "./components/LiveClock/LiveClock";

export default function App() {
  const [view, setView] = useState("registry");

  return (
    <div>
      <nav style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 24px", background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#111", marginRight: 8 }}>
          🎓 R.Tripathi
        </span>
        <span style={{ color: "#e5e7eb", fontSize: 18 }}>|</span>
        {[
          { key: "registry", label: "Student Registry" },
          { key: "clock",    label: "Live Clock" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            style={{
              padding: "7px 16px", borderRadius: 8, border: "none",
              background: view === key ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#f3f4f6",
              color: view === key ? "#fff" : "#6b7280",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: view === key ? "0 3px 10px rgba(99,102,241,0.3)" : "none",
            }}
          >{label}</button>
        ))}
      </nav>
      {view === "registry" ? <StudentRegistry /> : <LiveClock />}
    </div>
  );
}
