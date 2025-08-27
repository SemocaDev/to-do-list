"use client";

import { useState } from "react";

export default function TaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
          Nueva tarea
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Escribe tu tarea..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "none",
                borderRadius: "6px",
                background: "#ccc",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "none",
                borderRadius: "6px",
                background: "#0070f3",
                color: "white",
                cursor: "pointer",
              }}
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
