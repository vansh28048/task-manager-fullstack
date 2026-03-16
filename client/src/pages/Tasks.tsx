import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import EditModal from "../components/EditModal";
import AddModal from "../components/AddModal";
import TaskTable from "../components/TaskTable";
import Pagination from "../components/Pagination";

// Define the Task type
export type Task = {
  _id: string;
  title: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
};


function Tasks() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  //   const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter, sort, and paginate tasks
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  const paginatedTasks = sortedTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const filteredTotalPages = Math.ceil(filteredTasks.length / pageSize);

  // Add modal state
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState<{
    _id: string | null;
    title: string;
    description: string;
    completed?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }>({ _id: null, title: "", description: "" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  //get Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        let url = "http://localhost:4000/tasks";
        if (filter === "completed") {
          url += "?completed=true";
        } else if (filter === "incomplete") {
          url += "?completed=false";
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(res.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filter]);

  const handleDeleteTask = async (_id: string) => {
    if (!_id) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmed) return;
    try {
      await axios.delete(`http://localhost:4000/tasks/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== _id));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  // Open edit modal and fetch task data
  const handleEditClick = async (_id: string) => {
    setLoading(true);
    setShowEditModal(false);
    try {
      const res = await axios.get(`http://localhost:4000/tasks/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEditTask({
        _id,
        title: res.data.title || "",
        description: res.data.description || "",
        completed: res.data.completed,
        createdAt: res.data.createdAt,
        updatedAt: res.data.updatedAt,
      });
      setShowEditModal(true);
    } catch (err) {
      toast.error("Failed to fetch task data");
      setShowEditModal(false);
    } finally {
      setLoading(false);
    }
  };

  // Save edited task
  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTask._id) return;
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:4000/tasks/${editTask._id}`,
        {
          title: editTask.title,
          description: editTask.description,
          completed: editTask.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setTasks((prev) =>
        prev.map((task) =>
          task._id === editTask._id ? { ...task, ...res.data } : task,
        ),
      );
      setShowEditModal(false);
      toast.success("Task updated successfully");
    } catch (err) {
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 px-10 gap-4">
        <h1 className="text-2xl font-bold">Tasks</h1>

        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-72"
            placeholder="Search tasks by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Add Task
          </button>
        </div>
      </div>
      {
        <>
          <TaskTable
            tasks={paginatedTasks}
            handleEditClick={handleEditClick}
            handleDeleteTask={handleDeleteTask}
            loading={loading}
            error={error}
            currentPage={currentPage}
            pageSize={pageSize}
            getSerialNo={(task) =>
              sortedTasks.length -
              sortedTasks.findIndex((t) => t._id === task._id)
            }
          />
          <Pagination
            currentPage={currentPage}
            totalPages={filteredTotalPages}
            onPageChange={setCurrentPage}
          />
        </>
      }

      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editTask={editTask}
        setEditTask={setEditTask}
        editLoading={loading}
        editSaving={loading}
        handleEditSave={handleEditSave}
      />
      <AddModal
        showModal={showModal}
        setShowModal={setShowModal}
        newTask={newTask}
        setNewTask={setNewTask}
        setTasks={setTasks}
        toast={toast}
      />
    </div>
  );
}

export default Tasks;
