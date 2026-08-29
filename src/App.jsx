import React, { useState } from "react";
import { Plus, X, LogOut, Trash2, Pencil, CheckCircle2, Circle, Clock3, LayoutGrid } from "lucide-react";

const PRIORITY_STYLES = {
  Low: { bg: "#ECFDF5", text: "#059669", dot: "#10B981" },
  Medium: { bg: "#FFFBEB", text: "#B45309", dot: "#F59E0B" },
  High: { bg: "#FEF2F2", text: "#DC2626", dot: "#EF4444" },
};

const COLUMN_META = {
  "To Do": { icon: Circle, color: "#6366F1" },
  "In Progress": { icon: Clock3, color: "#7C3AED" },
  Done: { icon: CheckCircle2, color: "#059669" },
};

const seedTasks = [
  { id: "t1", title: "Design landing page", description: "Draft hero section and color system", priority: "High", column: "To Do" },
  { id: "t2", title: "Set up database schema", description: "Users, tasks, boards tables", priority: "Medium", column: "To Do" },
  { id: "t3", title: "Build login flow", description: "Email + password auth", priority: "High", column: "In Progress" },
  { id: "t4", title: "Write project README", description: "Setup instructions for the repo", priority: "Low", column: "Done" },
];

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }
    setError("");
    onLogin(email.trim());
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "380px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "28px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #4F46E5, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LayoutGrid size={20} color="white" />
          </div>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#1F2937" }}>TaskFlow</span>
        </div>

        <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(79,70,229,0.08)", border: "1px solid #EEF0F4" }}>
          <h1 style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937", marginBottom: "4px" }}>
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "22px" }}>
            {mode === "login" ? "Log in to see your boards" : "Start organizing your work"}
          </p>

          <form onSubmit={handleSubmit}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #D1D5DB", marginBottom: "16px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
              onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
              onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
            />
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #D1D5DB", marginBottom: password ? "8px" : "22px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
              onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
              onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
            />
            {error && (
              <p style={{ color: "#DC2626", fontSize: "12.5px", marginBottom: "14px" }}>{error}</p>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              style={{ width: "100%", padding: "11px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #4F46E5, #7C3AED)", color: "white", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
            >
              {mode === "login" ? "Log In" : "Sign Up"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "13px", color: "#6B7280", marginTop: "18px" }}>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              style={{ color: "#4F46E5", fontWeight: 600, cursor: "pointer" }}
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, onDelete, onEdit, onDragStart }) {
  const p = PRIORITY_STYLES[task.priority];
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "14px",
        marginBottom: "10px",
        border: "1px solid #EEF0F4",
        boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
        cursor: "grab",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937", margin: 0 }}>{task.title}</h3>
        <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
          <button onClick={() => onEdit(task)} style={{ border: "none", background: "transparent", cursor: "pointer", padding: "2px", color: "#9CA3AF" }}>
            <Pencil size={13} />
          </button>
          <button onClick={() => onDelete(task.id)} style={{ border: "none", background: "transparent", cursor: "pointer", padding: "2px", color: "#9CA3AF" }}>
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      {task.description && (
        <p style={{ fontSize: "12.5px", color: "#6B7280", margin: "6px 0 10px 0", lineHeight: 1.4 }}>{task.description}</p>
      )}
      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 600, padding: "3px 9px", borderRadius: "999px", background: p.bg, color: p.text }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.dot }} />
        {task.priority}
      </span>
    </div>
  );
}

function TaskModal({ initial, onClose, onSave }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [priority, setPriority] = useState(initial?.priority || "Medium");
  const [column, setColumn] = useState(initial?.column || "To Do");

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ id: initial?.id || `t${Date.now()}`, title: title.trim(), description: description.trim(), priority, column });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "16px" }}>
      <div style={{ background: "white", borderRadius: "16px", padding: "24px", width: "100%", maxWidth: "420px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#1F2937", margin: 0 }}>{initial ? "Edit Task" : "New Task"}</h2>
          <button onClick={onClose} style={{ border: "none", background: "#F3F4F6", borderRadius: "8px", padding: "6px", cursor: "pointer" }}>
            <X size={16} color="#6B7280" />
          </button>
        </div>

        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #D1D5DB", marginBottom: "14px", fontSize: "14px", boxSizing: "border-box" }}
        />

        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
          rows={3}
          style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #D1D5DB", marginBottom: "14px", fontSize: "14px", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
        />

        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #D1D5DB", fontSize: "13px" }}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Column</label>
            <select value={column} onChange={(e) => setColumn(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #D1D5DB", fontSize: "13px" }}>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          style={{ width: "100%", padding: "11px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #4F46E5, #7C3AED)", color: "white", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
        >
          Save Task
        </button>
      </div>
    </div>
  );
}

export default function TaskFlowApp() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(seedTasks);
  const [modalTask, setModalTask] = useState(undefined); // undefined = closed, null = new, obj = edit
  const [dragOverCol, setDragOverCol] = useState(null);

  if (!user) return <LoginScreen onLogin={setUser} />;

  const columns = ["To Do", "In Progress", "Done"];

  const handleDragStart = (e, id) => e.dataTransfer.setData("taskId", id);
  const handleDrop = (e, col) => {
    const id = e.dataTransfer.getData("taskId");
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, column: col } : t)));
    setDragOverCol(null);
  };

  const saveTask = (task) => {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === task.id);
      return exists ? prev.map((t) => (t.id === task.id ? task : t)) : [task, ...prev];
    });
    setModalTask(undefined);
  };

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ background: "white", borderBottom: "1px solid #EEF0F4", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg, #4F46E5, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LayoutGrid size={17} color="white" />
          </div>
          <span style={{ fontSize: "17px", fontWeight: 700, color: "#1F2937" }}>TaskFlow</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ fontSize: "13px", color: "#6B7280" }}>{user}</span>
          <button onClick={() => setUser(null)} style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #E5E7EB", background: "white", borderRadius: "9px", padding: "7px 12px", fontSize: "13px", color: "#374151", cursor: "pointer" }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#1F2937", margin: 0 }}>My Board</h1>
            <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0 0" }}>Drag cards between columns to update progress</p>
          </div>
          <button
            onClick={() => setModalTask(null)}
            style={{ display: "flex", alignItems: "center", gap: "6px", border: "none", background: "linear-gradient(135deg, #4F46E5, #7C3AED)", color: "white", borderRadius: "10px", padding: "9px 16px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
          >
            <Plus size={15} /> New Task
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
          {columns.map((col) => {
            const Icon = COLUMN_META[col].icon;
            const colTasks = tasks.filter((t) => t.column === col);
            return (
              <div
                key={col}
                onDragOver={(e) => { e.preventDefault(); setDragOverCol(col); }}
                onDragLeave={() => setDragOverCol(null)}
                onDrop={(e) => handleDrop(e, col)}
                style={{
                  background: dragOverCol === col ? "#EEF2FF" : "#F1F3F9",
                  borderRadius: "14px",
                  padding: "14px",
                  minHeight: "200px",
                  border: dragOverCol === col ? "2px dashed #4F46E5" : "2px dashed transparent",
                  transition: "background 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
                  <Icon size={15} color={COLUMN_META[col].color} />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>{col}</span>
                  <span style={{ fontSize: "11px", color: "#9CA3AF", background: "white", borderRadius: "999px", padding: "1px 8px", marginLeft: "auto" }}>{colTasks.length}</span>
                </div>
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onDelete={deleteTask} onEdit={setModalTask} onDragStart={handleDragStart} />
                ))}
                {colTasks.length === 0 && (
                  <div style={{ fontSize: "12px", color: "#9CA3AF", textAlign: "center", padding: "20px 0" }}>No tasks yet</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "24px", fontSize: "12px", color: "#9CA3AF" }}>
        Built with care by Ayesha
      </div>

      {modalTask !== undefined && (
        <TaskModal initial={modalTask} onClose={() => setModalTask(undefined)} onSave={saveTask} />
      )}
    </div>
  );
}
