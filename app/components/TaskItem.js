"use client";

import { useState } from "react";
import TaskDetailModal from "./TaskDetailModal";

export default function TaskItem({ task, onDelete, onToggle, onUpdate }) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Limita el texto a 40 caracteres y muestra "..." si es más largo
  const maxChars = 40;
  const isLong = task.title.length > maxChars;
  const displayText = isLong ? task.title.slice(0, maxChars) + "..." : task.title;

  const handleUpdate = async (id, newTitle) => {
    await onUpdate(id, newTitle);
    setShowDetailModal(false);
  };

  return (
    <>
      <li
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem 1rem",
          marginBottom: "0.5rem",
          borderRadius: "6px",
          backgroundColor: task.completed ? "#f0f8f0" : "#e9e9e9",
          border: task.completed ? "1px solid #4caf50" : "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
          <button
            onClick={() => onToggle(task.id, task.completed)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
          >
            <img 
              src={task.completed ? "/checkboxcheck.svg" : "/checkboxblank.svg"} 
              alt={task.completed ? "Completada" : "Pendiente"} 
              width={20} 
              height={20}
              style={{
                filter: task.completed ? "none" : "opacity(0.7)",
              }}
            />
          </button>
          <span
            onClick={() => setShowDetailModal(true)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "#666" : "black",
              cursor: "pointer",
              flex: 1,
              maxWidth: "220px",
              overflow: "hidden",
              whiteSpace: "pre-line",
              textOverflow: "ellipsis",
              display: "inline-block",
              verticalAlign: "middle",
            }}
            title={task.title}
          >
            {displayText}
          </span>
        </div>
        
        <button
          onClick={() => onDelete(task.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#ffebee"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
        >
          <img 
            src="/trashcan.svg" 
            alt="Eliminar" 
            width={18} 
            height={18}
            style={{
              filter: "opacity(0.7)",
            }}
          />
        </button>
      </li>

      {showDetailModal && (
        <TaskDetailModal
          task={task}
          onClose={() => setShowDetailModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}