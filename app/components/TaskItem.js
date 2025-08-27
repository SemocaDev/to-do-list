"use client";

export default function TaskItem({ task }) {
  return (
    <li className="flex justify-between items-center border p-2 rounded-md">
      <span
        className={
          task.completed
            ? "line-through text-gray-500 cursor-pointer"
            : "cursor-pointer"
        }
      >
        {task.title}
      </span>
      <button className="text-red-500 hover:text-red-700">🗑</button>
    </li>
  );
}
