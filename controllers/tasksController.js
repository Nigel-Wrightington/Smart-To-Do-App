// Use this controller file for all task logic

// Create a task! -- POST request
app.post(`/tasks`, (req, res) => {
  const { title, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: `Title is required` });
  }

  const newTask = {
    id: idCounter++,
    title,
    completed: false,
    dueDate: dueDate || null,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// GET all tasks --GET request
app.get(`/tasks`, (req, res) => {
  res.json(tasks);
});

// GET ONE task --GET request
app.get(`/tasks/:id`, (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({ error: `Task not found` });
  }

  res.json(task);
});

// UPDATE a single task -- PUT REQUEST
app.put(`/tasks/:id`, (req, res) => {
  // Look through the tasks array and find the task whose id matches the id from the URL
  // We have to use parseInt because the id property is always a string. We need to convert that string to a number.
  const task = tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({ error: `Task not found` });
  }

  const { title, completed, dueDate } = req.body;

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  if (dueDate !== undefined) task.dueDate = dueDate;

  res.json(task);
});

// Delete a task! - Delete request
app.delete(`/tasks/:id`, (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: `Task not found` });
  }

  const deletedTask = tasks.splice(index, 1);

  res.json(deletedTask[0]);
});
