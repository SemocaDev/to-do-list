"use client";

import TaskItem from "./TaskItem";

export default function TaskList() {
  const tasks = [
    { id: 1, title: "Tarea 1", completed: false },
    { id: 2, title: "Tarea 2", completed: true },
    { id: 3, title: "Tarea 3", completed: false },
  ];

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
