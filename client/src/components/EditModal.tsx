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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => setShowEditModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-xl z-10 p-8 w-full max-w-md relative border border-gray-100 overflow-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          onClick={() => setShowEditModal(false)}
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Edit Task</h2>
        {editLoading ? (
          <div className="space-y-4">
            <div className="h-10 bg-gray-100 animate-pulse rounded-lg" />
            <div className="h-20 bg-gray-100 animate-pulse rounded-lg" />
            <div className="h-10 bg-gray-100 animate-pulse rounded-lg" />
          </div>
        ) : (
          <>
            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  placeholder="Task title"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  disabled={editSaving}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
                  placeholder="Description"
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  disabled={editSaving}
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-700">Completed</span>
                <ToggleSwitch
                  value={!!editTask.completed}
                  onToggle={(val) => setEditTask({ ...editTask, completed: val })}
                  readOnly={editSaving}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
                disabled={editSaving}
              >
                {editSaving ? "Saving..." : "Save Changes"}
              </button>
            </form>
            {(editTask.createdAt || editTask.updatedAt) && (
              <div className="mt-5 pt-4 border-t border-gray-100 text-xs text-gray-400 space-y-1">
                {editTask.createdAt && (
                  <p>Created: {new Date(editTask.createdAt).toLocaleString()}</p>
                )}
                {editTask.updatedAt && (
                  <p>Updated: {new Date(editTask.updatedAt).toLocaleString()}</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditModal;
