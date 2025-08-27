"use client";

export default function TaskItem({ task, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 1rem",
        marginBottom: "0.5rem",
        borderRadius: "6px",
        backgroundColor: "#e9e9e9",
      }}
    >
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "black",
          cursor: "pointer",
        }}
      >
        {task.title}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <img src="/trashcan24.svg" alt="Eliminar" width={20} height={20} />
      </button>
    </li>
  );
}
