"use client";

import { useState } from "react";
import TaskItem from "@/app/components/TaskItem";
import TaskModal from "@/app/components/TaskModal";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = (title) => {
    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
    setIsModalOpen(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <main
      style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "500px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Lista de Tareas
      </h1>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={deleteTask} />
        ))}
      </ul>

      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "56px",
          height: "56px",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        +
      </button>

      {isModalOpen && (
        <TaskModal onClose={() => setIsModalOpen(false)} onAdd={addTask} />
      )}
    </main>
  );
}
