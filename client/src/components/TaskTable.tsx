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
    <div>
      <table className="min-w-full bg-white  border-gray-200 rounded-xl">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-4 py-2 text-left">S. No.</th>
            {/* <th className="px-4 py-2 text-left">ID</th> */}
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-center">Completed</th>
            {/* <th className="px-4 py-2 text-left">Created At</th> */}
            {/* <th className="px-4 py-2 text-left">Updated At</th> */}
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-gray-50">
                <td colSpan={5} className="px-4 py-3">
                  <div className="h-12 w-full bg-gray-100 animate-pulse rounded"></div>
                </td>
              </tr>
            ))
          ) : error ? (
            <tr>
              <td
                colSpan={9}
                className="p-6 pt-20 text-center text-[15px] text-red-600"
              >
                Failed to load tasks.
              </td>
            </tr>
          ) : !tasks || tasks.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="p-6 pt-20 text-center text-[30px] text-gray-200"
              >
                Click "Add Task" to create your first task!
              </td>
            </tr>
          ) : (
            tasks.map((task, idx) => (
              <tr
                key={task._id || idx}
                className="hover:bg-gray-50 border-b border-gray-200"
              >
                <td className="px-4 py-2">{getSerialNo(task)}</td>
                {/* <td className="px-4 py-2">{task._id}</td> */}
                <td className="px-4 py-2 max-w-xs ">{task.title}</td>
                <td
                  className="px-4 py-2 max-w-sm whitespace-pre-line wrap-break-words text-justify "
                  style={{ wordBreak: "break-word", maxWidth: "20rem" }}
                >
                  {task.description || "-"}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-6 py-2 rounded-full text-sm font-medium ${
                      task.completed
                        ? "bg-green-100 text-green-900"
                        : "bg-yellow-100 text-yellow-900"
                    }`}
                  >
                    {task.completed ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-evenly items-center space-x-2">
                    <button
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      onClick={() => handleEditClick(task._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-700 transition"
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
    </div>
  );
};

export default TaskTable;
