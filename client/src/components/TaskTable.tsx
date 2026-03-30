import type { Task } from "../pages/Tasks";

type TaskTableProps = {
  tasks: Task[];
  handleEditClick: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  getSerialNo: (task: Task) => number;
};

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  handleEditClick,
  handleDeleteTask,
  loading,
  error,
  getSerialNo,
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-100 bg-gray-50/50">
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            #
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Description
          </th>
          <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <tr key={i}>
              <td colSpan={5} className="px-6 py-4">
                <div className="h-10 w-full bg-gray-100 animate-pulse rounded-lg" />
              </td>
            </tr>
          ))
        ) : error ? (
          <tr>
            <td colSpan={5} className="px-6 py-16 text-center">
              <p className="text-red-500 font-medium">Failed to load tasks.</p>
              <p className="text-gray-400 text-sm mt-1">Please try again later.</p>
            </td>
          </tr>
        ) : !tasks || tasks.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-16 text-center">
              <div className="text-gray-300 mb-3">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">No tasks yet</p>
              <p className="text-gray-300 text-sm mt-1">Click "Add Task" to get started</p>
            </td>
          </tr>
        ) : (
          tasks.map((task, idx) => (
            <tr
              key={task._id || idx}
              className="hover:bg-gray-50/50 transition"
            >
              <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                {getSerialNo(task)}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-800 max-w-xs">
                {task.title}
              </td>
              <td
                className="px-6 py-4 text-sm text-gray-600 max-w-sm whitespace-pre-line"
                style={{ wordBreak: "break-word", maxWidth: "20rem" }}
              >
                {task.description || "-"}
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    task.completed
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      task.completed ? "bg-green-500" : "bg-amber-500"
                    }`}
                  />
                  {task.completed ? "Done" : "Pending"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center items-center gap-2">
                  <button
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                    onClick={() => handleEditClick(task._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TaskTable;
