const mongoose = require("mongoose");
const Task = require("../config/tasks");

// GET ALL TASKS (only for logged-in user)
exports.getAllTasks = async (req, res) => {
  try {
    const { completed } = req.query;

    const filter = { user: req.user.userId };

    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    const tasks = await Task.find(filter).sort({ createdAt: 1 });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET TASK BY ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// CREATE TASK (attach user from JWT)
exports.createTask  = async (req, res) => {
  try {
    const { title, completed = false, description = "" } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const newTask = await Task.create({
      title,
      completed,
      description,
      user: req.user.userId,
    });
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE TASK (only if owned by user)
exports.updateTask  = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed, description = "" } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { title, completed, description },
      { new: true, runValidators: true },
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ error: "Task not found or not authorized" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE TASK (only if owned by user)
exports.deleteTask  = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ error: "Task not found or not authorized" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getStats    = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const stats = await Task.aggregate([
      {
        $match: { user: userId },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: ["$completed", 1, 0] },
          },
          incomplete: {
            $sum: { $cond: ["$completed", 0, 1] },
          },
        },
      },
    ]);

    res.json(stats[0] || { total: 0, completed: 0, incomplete: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
 