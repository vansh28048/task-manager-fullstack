import React from "react";

import type { Dispatch, SetStateAction } from "react";
import type { Task } from "../pages/Tasks";
import { API_URL } from "../config/api";

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
      const res = await fetch(`${API_URL}/tasks`, {
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
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          onClick={() => setShowModal(false)}
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Task</h2>
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="What needs to be done?"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              disabled={adding}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
              placeholder="Add details..."
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              disabled={adding}
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
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
