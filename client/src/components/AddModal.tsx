import React from "react";

import type { Dispatch, SetStateAction } from "react";
import type { Task } from "../pages/Tasks";

interface AddModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  newTask: { title: string; description: string };
  setNewTask: (task: { title: string; description: string }) => void;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  toast: any;
}


const AddModal: React.FC<AddModalProps> = ({
  showModal,
  setShowModal,
  newTask,
  setNewTask,
  setTasks,
  toast,
}) => {
  const [adding, setAdding] = React.useState(false);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
        }),
      });
      const data = await res.json();
      setTasks((prev: Task[]) => [...prev, data]);
      setShowModal(false);
      toast.success("Task added successfully");
      setNewTask({ title: "", description: "" });
    } catch (err) {
      toast.error("Failed to add task");
    } finally {
      setAdding(false);
    }
  };
    


  if (!showModal) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={() => setShowModal(false)}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            disabled={adding}
            autoFocus
          />
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            disabled={adding}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={adding}
          >
            {adding ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;