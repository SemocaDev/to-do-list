"use client";

import { useState } from "react";

export default function TaskForm() {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    console.log("Nueva tarea:", title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Escribe una tarea..."
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Agregar
      </button>
    </form>
  );
}
