// controllers/tasksController.js

// -----------------------------------------------------------------------------
// TEMP IN-MEMORY DATABASE
// -----------------------------------------------------------------------------
// This array simulates a database.
// IMPORTANT: This resets every time you restart the server.
let tasks = [];

// This helps us generate unique IDs for each task
let idCounter = 1;

// -----------------------------------------------------------------------------
// CREATE TASK
// This function runs when a POST request is made to /tasks
// -----------------------------------------------------------------------------
const createTask = (req, res) => {
  // Extract values from the request body (sent from client)
  const { title, dueDate } = req.body;

  // Basic validation: title is required
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  // Create a new task object
  const newTask = {
    id: idCounter++, // Assign ID, then increment counter
    title, // Task title
    completed: false, // Default completed value
    dueDate: dueDate || null, // If dueDate exists use it, otherwise null
  };

  // Add the task to our "database"
  tasks.push(newTask);

  // 201 = Created (standard HTTP response for POST success)
  res.status(201).json(newTask);
};

// -----------------------------------------------------------------------------
// GET ALL TASKS
// Runs when a GET request is made to /tasks
// -----------------------------------------------------------------------------
const getAllTasks = (req, res) => {
  // Simply return the entire tasks array
  res.json(tasks);
};

// -----------------------------------------------------------------------------
// GET SINGLE TASK BY ID
// Runs when GET /tasks/:id is called
// -----------------------------------------------------------------------------
const getTaskById = (req, res) => {
  // req.params.id comes from the URL
  // URL params are always strings — convert to number
  const id = parseInt(req.params.id);

  // Find the matching task
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
};

// -----------------------------------------------------------------------------
// UPDATE TASK
// Runs when PUT /tasks/:id is called
// -----------------------------------------------------------------------------
const updateTask = (req, res) => {
  const id = parseInt(req.params.id);

  // Find the task we want to update
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Pull potential updated fields from request body
  const { title, completed, dueDate } = req.body;

  // Only update fields that were provided
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  if (dueDate !== undefined) task.dueDate = dueDate;

  // Return updated task
  res.json(task);
};

// -----------------------------------------------------------------------------
// DELETE TASK
// Runs when DELETE /tasks/:id is called
// -----------------------------------------------------------------------------
const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);

  // Find index of task in array
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Remove task from array
  const deletedTask = tasks.splice(index, 1);

  // splice returns an array — we return the first item
  res.json(deletedTask[0]);
};

// -----------------------------------------------------------------------------
// EXPORT FUNCTIONS
// This allows routes/tasks.js to import and use them
// -----------------------------------------------------------------------------
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
