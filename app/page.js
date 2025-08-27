"use client";

import { useState, useEffect } from "react";
import TaskItem from "@/app/components/TaskItem";
import TaskModal from "@/app/components/TaskModal";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar tareas al montar el componente
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks');
      const result = await response.json();
      
      if (result.success) {
        setTasks(result.data);
      } else {
        setError('Error al cargar las tareas');
        console.error('Error:', result.message);
      }
    } catch (error) {
      setError('Error de conexión');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTasks([result.data, ...tasks]); // Agregar la nueva tarea al inicio
        setIsModalOpen(false);
      } else {
        alert('Error al crear la tarea: ' + result.message);
      }
    } catch (error) {
      alert('Error de conexión al crear la tarea');
      console.error('Error:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        alert('Error al eliminar la tarea: ' + result.message);
      }
    } catch (error) {
      alert('Error de conexión al eliminar la tarea');
      console.error('Error:', error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, completed: !completed } : task
        ));
      } else {
        alert('Error al actualizar la tarea: ' + result.message);
      }
    } catch (error) {
      alert('Error de conexión al actualizar la tarea');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <main
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "1rem" }}>Lista de Tareas</h1>
        <p>Cargando tareas...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "1rem" }}>Lista de Tareas</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button 
          onClick={loadTasks}
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Reintentar
        </button>
      </main>
    );
  }

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
        Lista de Tareas ({tasks.length})
      </h1>

      {tasks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666", padding: "2rem" }}>
          No tienes tareas aún. ¡Crea tu primera tarea!
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          ))}
        </ul>
      )}

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