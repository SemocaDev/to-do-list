"use client";

import { useState } from "react";

export default function TaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Por favor ingresa un título para la tarea");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd(title.trim());
      setTitle("");
    } catch (error) {
      console.error("Error al crear tarea:", error);
    } finally {
      setIsSubmitting(false);
    }
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
        zIndex: 1000,
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
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <textarea
            placeholder="Escribe tu tarea..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            rows={4}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "1rem",
              outline: "none",
              resize: "vertical", // Permite al usuario ajustar el tamaño si quiere
            }}
            autoFocus
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "none",
                borderRadius: "6px",
                background: "#ccc",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "none",
                borderRadius: "6px",
                background:
                  !title.trim() || isSubmitting ? "#ccc" : "#0070f3",
                color: "white",
                cursor:
                  !title.trim() || isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
