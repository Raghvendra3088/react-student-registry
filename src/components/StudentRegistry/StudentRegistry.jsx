import { useState } from "react";

const initialStudents = [
  { id: 1, name: "Aisha Patel",   age: 20, course: "Computer Science" },
  { id: 2, name: "Rohan Mehta",   age: 22, course: "Data Science" },
  { id: 3, name: "Priya Sharma",  age: 21, course: "Web Development" },
  { id: 4, name: "Dev Kapoor",    age: 23, course: "Cybersecurity" },
];

const COURSES = [
  "Computer Science", "Data Science", "Web Development",
  "Cybersecurity", "AI & Machine Learning", "Mobile Development",
];

const courseColors = {
  "Computer Science":      { bg: "#e8f4fd", accent: "#2563eb", dot: "#3b82f6" },
  "Data Science":          { bg: "#fef3c7", accent: "#d97706", dot: "#f59e0b" },
  "Web Development":       { bg: "#ecfdf5", accent: "#059669", dot: "#10b981" },
  "Cybersecurity":         { bg: "#fdf2f8", accent: "#7c3aed", dot: "#8b5cf6" },
  "AI & Machine Learning": { bg: "#fff1f2", accent: "#e11d48", dot: "#f43f5e" },
  "Mobile Development":    { bg: "#f0fdf4", accent: "#16a34a", dot: "#22c55e" },
};

function getInitials(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function Avatar({ name, course }) {
  const c = courseColors[course] || { bg: "#f3f4f6", accent: "#6b7280" };
  return (
    <div style={{
      width: 44, height: 44, borderRadius: "50%",
      background: c.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 700, fontSize: 15,
      color: c.accent, flexShrink: 0,
      border: `2px solid ${c.accent}22`,
    }}>
      {getInitials(name)}
    </div>
  );
}

function CoursePill({ course }) {
  const c = courseColors[course] || { bg: "#f3f4f6", accent: "#6b7280", dot: "#9ca3af" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: c.bg, color: c.accent,
      borderRadius: 999, padding: "3px 10px",
      fontSize: 11, fontWeight: 600, letterSpacing: "0.03em",
      border: `1px solid ${c.accent}30`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {course}
    </span>
  );
}

function StudentCard({ student, onDelete, index }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 18px",
        background: hover ? "#fafafa" : "#fff",
        borderRadius: 12,
        border: "1px solid #f0f0f0",
        boxShadow: hover ? "0 4px 20px rgba(0,0,0,0.07)" : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "all 0.18s ease",
        transform: hover ? "translateY(-1px)" : "none",
        animation: `slideIn 0.35s ease ${index * 0.05}s both`,
      }}
    >
      <Avatar name={student.name} course={student.course} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 15, fontWeight: 700, color: "#111",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>{student.name}</span>
          <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'DM Sans', sans-serif" }}>
            · {student.age} yrs
          </span>
        </div>
        <CoursePill course={student.course} />
      </div>
      <button
        onClick={() => onDelete(student.id)}
        title="Remove student"
        style={{
          background: "none", border: "none", cursor: "pointer",
          width: 30, height: 30, borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: hover ? "#ef4444" : "#d1d5db",
          transition: "color 0.15s, background 0.15s",
          fontSize: 16, flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
        onMouseLeave={e => e.currentTarget.style.background = "none"}
      >✕</button>
    </div>
  );
}

function AddStudentForm({ onAdd, onClose }) {
  const [form, setForm] = useState({ name: "", age: "", course: COURSES[0] });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    const age = parseInt(form.age);
    if (!form.age || isNaN(age) || age < 15 || age > 60) e.age = "Valid age (15–60)";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ name: form.name.trim(), age: parseInt(form.age), course: form.course });
    onClose();
  };

  const field = (label, key, type = "text", extra = {}) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(err => ({ ...err, [key]: "" })); }}
        placeholder={extra.placeholder || ""}
        style={{
          padding: "9px 12px", borderRadius: 8, fontSize: 14,
          border: errors[key] ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
          outline: "none", fontFamily: "'DM Sans', sans-serif",
          background: "#fafafa", color: "#111", transition: "border 0.15s",
        }}
        onFocus={e => e.target.style.border = "1.5px solid #6366f1"}
        onBlur={e => e.target.style.border = errors[key] ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb"}
      />
      {errors[key] && <span style={{ fontSize: 11, color: "#ef4444" }}>{errors[key]}</span>}
    </div>
  );

  return (
    <div style={{
      background: "#fff", borderRadius: 16,
      border: "1px solid #e5e7eb",
      boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
      padding: 24,
      display: "flex", flexDirection: "column", gap: 16,
      animation: "slideDown 0.25s ease both",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#111" }}>
          Add New Student
        </span>
        <button onClick={onClose} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 18, color: "#9ca3af", lineHeight: 1,
        }}>✕</button>
      </div>
      {field("Full Name", "name", "text", { placeholder: "e.g. Riya Desai" })}
      {field("Age", "age", "number", { placeholder: "e.g. 21" })}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Course
        </label>
        <select
          value={form.course}
          onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
          style={{
            padding: "9px 12px", borderRadius: 8, fontSize: 14,
            border: "1.5px solid #e5e7eb", background: "#fafafa",
            fontFamily: "'DM Sans', sans-serif", color: "#111",
            outline: "none", cursor: "pointer",
          }}
        >
          {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <button
        onClick={handleSubmit}
        style={{
          padding: "11px", borderRadius: 10, border: "none",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff", fontFamily: "'DM Sans', sans-serif",
          fontSize: 14, fontWeight: 700, cursor: "pointer",
          letterSpacing: "0.02em",
          boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 18px rgba(99,102,241,0.45)"; }}
        onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 12px rgba(99,102,241,0.35)"; }}
      >
        Add Student
      </button>
    </div>
  );
}

export default function StudentRegistry() {
  const [students, setStudents] = useState(initialStudents);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [nextId, setNextId] = useState(5);

  const handleAdd = (student) => {
    setStudents(s => [{ id: nextId, ...student }, ...s]);
    setNextId(n => n + 1);
  };

  const handleDelete = (id) => {
    setStudents(s => s.filter(st => st.id !== id));
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  );

  const courseCount = [...new Set(students.map(s => s.course))].length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5f4f0; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }
      `}</style>
      <div style={{
        minHeight: "100vh", background: "#f5f4f0",
        fontFamily: "'DM Sans', sans-serif",
        padding: "32px 16px",
        display: "flex", justifyContent: "center",
      }}>
        <div style={{ width: "100%", maxWidth: 560 }}>
          <div style={{ marginBottom: 28, animation: "slideDown 0.4s ease both" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 4 }}>
                  Raghvendra Tripathi
                </p>
                <h1 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 32, fontWeight: 900, color: "#111",
                  lineHeight: 1.1, letterSpacing: "-0.02em",
                }}>
                  Student<br />
                  <span style={{ color: "#6366f1" }}>Registry</span>
                </h1>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <div style={{
                  background: "#fff", borderRadius: 10, padding: "8px 14px",
                  border: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", textAlign: "center",
                }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#6366f1", fontFamily: "'Playfair Display', serif" }}>
                    {students.length}
                  </div>
                  <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Students</div>
                </div>
                <div style={{
                  background: "#fff", borderRadius: 10, padding: "6px 14px",
                  border: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", textAlign: "center",
                }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#10b981" }}>{courseCount}</div>
                  <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Courses</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, animation: "slideDown 0.4s ease 0.05s both" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#9ca3af" }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or course…"
                style={{
                  width: "100%", padding: "10px 12px 10px 34px",
                  borderRadius: 10, border: "1.5px solid #e5e7eb",
                  fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                  background: "#fff", color: "#111", outline: "none",
                }}
                onFocus={e => e.target.style.border = "1.5px solid #6366f1"}
                onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"}
              />
            </div>
            <button
              onClick={() => setShowForm(f => !f)}
              style={{
                padding: "10px 18px", borderRadius: 10, border: "none",
                background: showForm ? "#f3f4f6" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: showForm ? "#6b7280" : "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: showForm ? "none" : "0 4px 12px rgba(99,102,241,0.3)",
                transition: "all 0.2s",
              }}
            >
              {showForm ? "Cancel" : "+ Add Student"}
            </button>
          </div>
          {showForm && (
            <div style={{ marginBottom: 16 }}>
              <AddStudentForm onAdd={handleAdd} onClose={() => setShowForm(false)} />
            </div>
          )}
          <div style={{
            background: "#fff", borderRadius: 16,
            border: "1px solid #f0f0f0",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden",
          }}>
            <div style={{
              padding: "12px 18px", borderBottom: "1px solid #f5f5f5",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {filtered.length} {filtered.length === 1 ? "record" : "records"}
                {search && ` for "${search}"`}
              </span>
              {search && (
                <button onClick={() => setSearch("")} style={{
                  fontSize: 11, color: "#6366f1", background: "none",
                  border: "none", cursor: "pointer", fontWeight: 600,
                }}>Clear</button>
              )}
            </div>
            <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: 6, maxHeight: 420, overflowY: "auto" }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 24px", color: "#9ca3af", fontSize: 14 }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>🎓</div>
                  {search ? "No students match your search." : "No students yet. Add one above!"}
                </div>
              ) : (
                filtered.map((s, i) => (
                  <StudentCard key={s.id} student={s} onDelete={handleDelete} index={i} />
                ))
              )}
            </div>
          </div>
          <p style={{ textAlign: "center", fontSize: 11, color: "#c4c4c4", marginTop: 20, letterSpacing: "0.05em" }}>
            Built with React · Functional components · useState · JSX
          </p>
        </div>
      </div>
    </>
  );
}
