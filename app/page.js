import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
      <section className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">To-do PRUEBA TECNICA</h1>
        <TaskForm />
        <TaskList />
      </section>
    </main>
  );
}
