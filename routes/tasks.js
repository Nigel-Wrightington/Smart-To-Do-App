const express = require("express");

// Instead of attaching routes directly to app, you're creating a mini Express router.
// This keeps things clean and separates the main server from this one.
// think of it like: app = main server //// router = mini server just for tasks

const router = express.Router();

// this pulls in functions from the controller file - Those function contain the real logic.
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

// this defines the routes
// so if someone htis GET /tasks, it will run getAlltasks function.

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

// this allows the router to be imported elsewhere
module.exports = router;
