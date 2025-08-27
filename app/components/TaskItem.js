"use client";

export default function TaskItem({ task, onDelete, onToggle }) {
  return (
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
          onClick={() => onToggle(task.id, task.completed)}
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#666" : "black",
            cursor: "pointer",
            flex: 1,
          }}
        >
          {task.title}
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
  );
}