"use client";

import { useState } from "react";

export default function TaskDetailModal({ task, onClose, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_CHARS = 100;

  const handleSave = async () => {
    if (editedTitle.trim() === task.title) {
      setIsEditing(false);
      return;
    }

    if (!editedTitle.trim()) {
      alert("El título no puede estar vacío");
      return;
    }

    if (editedTitle.length > MAX_CHARS) {
      alert(`El título no puede tener más de ${MAX_CHARS} caracteres`);
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdate(task.id, editedTitle.trim());
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      alert("Error al actualizar la tarea");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const charsRemaining = MAX_CHARS - editedTitle.length;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "400px",
          maxWidth: "90vw",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
          Detalle de la tarea
        </h3>
        
        {/* Fecha de creación */}
        <p style={{ 
          color: "#666", 
          fontSize: "0.85rem", 
          margin: "0 0 1rem 0",
          fontStyle: "italic"
        }}>
          Creada: {formatDate(task.createdAt)}
        </p>

        {/* Contenido editable/non-editable */}
        {isEditing ? (
          <>
            <textarea
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              disabled={isSubmitting}
              rows={6}
              maxLength={MAX_CHARS}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                marginBottom: "0.5rem",
              }}
              autoFocus
            />
            {/* Contador de caracteres */}
            <div style={{ 
              textAlign: "right", 
              fontSize: "0.8rem", 
              color: charsRemaining < 20 ? "#ff6b6b" : "#666",
              marginBottom: "1rem"
            }}>
              {charsRemaining} caracteres restantes
            </div>
          </>
        ) : (
          <div style={{ 
            whiteSpace: "pre-line", 
            fontSize: "1.1rem",
            padding: "0.75rem",
            border: "1px solid transparent",
            borderRadius: "6px",
            backgroundColor: "#f9f9f9",
            marginBottom: "1.5rem",
            minHeight: "120px"
          }}>
            {task.title}
          </div>
        )}

        {/* Botones */}
        <div style={{ 
          display: "flex", 
          gap: "1rem", 
          justifyContent: "flex-end",
          flexWrap: "wrap"
        }}>
          {isEditing ? (
            <>
              <button
                onClick={handleCancelEdit}
                disabled={isSubmitting}
                style={{
                  padding: "0.5rem 1.2rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  background: "transparent",
                  color: "#666",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={isSubmitting || !editedTitle.trim() || editedTitle.length > MAX_CHARS}
                style={{
                  padding: "0.5rem 1.2rem",
                  border: "none",
                  borderRadius: "4px",
                  background: isSubmitting || !editedTitle.trim() || editedTitle.length > MAX_CHARS ? "#ccc" : "#4caf50",
                  color: "white",
                  cursor: isSubmitting || !editedTitle.trim() || editedTitle.length > MAX_CHARS ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "0.5rem 1.2rem",
                  border: "none",
                  borderRadius: "4px",
                  background: "#0070f3",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Editar
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: "0.5rem 1.2rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  background: "transparent",
                  color: "#666",
                  cursor: "pointer",
                }}
              >
                Cerrar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}