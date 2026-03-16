const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const taskRoutes = require("./src/routes/taskRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");

// Import and use CORS middleware
const cors = require("cors");

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err)); 

//Routes
app.use("/uploads", express.static("uploads"));
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
