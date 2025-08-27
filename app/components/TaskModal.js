"use client";

import { useState } from "react";

export default function TaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_CHARS = 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert("Por favor ingresa un título para la tarea");
      return;
    }

    if (title.length > MAX_CHARS) {
      alert(`El título no puede tener más de ${MAX_CHARS} caracteres`);
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

  const charsRemaining = MAX_CHARS - title.length;

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
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <textarea
            placeholder="Escribe tu tarea..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            rows={4}
            maxLength={MAX_CHARS}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "1rem",
              outline: "none",
              resize: "vertical",
            }}
            autoFocus
          />
          
          {/* Contador de caracteres */}
          <div style={{ 
            textAlign: "right", 
            fontSize: "0.8rem", 
            color: charsRemaining < 20 ? "#ff6b6b" : "#666",
            marginBottom: "0.5rem"
          }}>
            {charsRemaining} caracteres restantes
          </div>

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
              disabled={isSubmitting || !title.trim() || title.length > MAX_CHARS}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "none",
                borderRadius: "6px",
                background: 
                  !title.trim() || isSubmitting || title.length > MAX_CHARS ? "#ccc" : "#0070f3",
                color: "white",
                cursor: 
                  !title.trim() || isSubmitting || title.length > MAX_CHARS ? "not-allowed" : "pointer",
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