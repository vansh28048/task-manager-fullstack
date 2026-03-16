import ToggleSwitch from "./ToggleSwitch";
import React from "react";

interface EditModalProps {
  showEditModal: boolean;
  setShowEditModal: (show: boolean) => void;
  editTask: {
    _id: string | null;
    title: string;
    description: string;
    completed?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  setEditTask: (task: {
    _id: string | null;
    title: string;
    description: string;
    completed?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }) => void;
  editLoading: boolean;
  editSaving: boolean;
  handleEditSave: (e: React.FormEvent) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  showEditModal,
  setShowEditModal,
  editTask,
  setEditTask,
  editLoading,
  editSaving,
  handleEditSave,
}) => {
  if (!showEditModal) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={() => setShowEditModal(false)}
      />
      <div
        className="bg-white rounded-lg shadow-lg z-10 p-6 w-full max-w-md relative overflow-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={() => setShowEditModal(false)}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        {editLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <form onSubmit={handleEditSave}>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Task title"
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                disabled={editSaving}
                required
              />
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Description"
                value={editTask.description}
                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                disabled={editSaving}
                rows={3}
              />
              <div className="mb-4 flex items-center gap-4">
                <span className="font-semibold">Completed:</span>
                <ToggleSwitch
                  value={!!editTask.completed}
                  onToggle={(val) => setEditTask({ ...editTask, completed: val })}
                  readOnly={editSaving}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={editSaving}
              >
                {editSaving ? "Saving..." : "Save Changes"}
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-500">
              {editTask.createdAt && (
                <div>
                  <span className="font-semibold">Created At:</span> {new Date(editTask.createdAt).toLocaleString()}
                </div>
              )}
              {editTask.updatedAt && (
                <div>
                  <span className="font-semibold">Updated At:</span> {new Date(editTask.updatedAt).toLocaleString()}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditModal;