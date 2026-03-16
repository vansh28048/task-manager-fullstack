# Task Manager Fullstack App

A full-stack task management application built with **React, Node.js, Express, and MongoDB**.
Users can register, log in, manage tasks, filter them, and view task statistics on a dashboard.

---

## Features

* User authentication (JWT)
* Create, update, and delete tasks
* Filter tasks (All / Completed / Incomplete)
* Search tasks by title
* Dashboard with task statistics
* User profile update
* Profile image upload
* Protected API routes

---

## Tech Stack

### Frontend

* React
* TypeScript
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer (image upload)

---

## Project Structure

```
task-manager
│
├── client
│   └── src
│       ├── pages
│       │   ├── AuthLogin.tsx
│       │   ├── AuthRegister.tsx
│       │   ├── Dashboard.tsx
│       │   ├── Tasks.tsx
│       │   ├── Settings.tsx
│       │   └── Home.tsx
│
├── server
│   └── src
│       ├── config
│       ├── controllers
│       ├── middleware
│       ├── routes
│
└── README.md
```

---

## Installation

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/task-manager-fullstack.git
cd task-manager-fullstack
```

---

### 2. Install backend dependencies

```
cd server
npm install
```

---

### 3. Install frontend dependencies

```
cd ../client
npm install
```

---

## Environment Variables

Create a `.env` file inside the **server** folder:

```
PORT=4000
MONGO_URI=your_mongodb_connection
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
```

---

## Run the Application

### Start backend

```
cd server
npm run dev
```

### Start frontend

```
cd client
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

Backend will run on:

```
http://localhost:4000
```

---

## API Features

* User authentication
* Protected routes using JWT
* CRUD operations for tasks
* Task filtering
* Dashboard statistics endpoint

---

## Future Improvements

* Task priority levels
* Due dates for tasks
* Dashboard charts
* Drag and drop task management
* Email reminders

---

## Author

Vansh Sharma
