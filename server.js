// we are creating a temporary in-memory tasks array to simulate a database
let tasks = [];
let idCounter = 1;

// prefix all routes with /tasks
const tasksRoutes = require("./routes/tasks");
app.use("/tasks", tasksRoutes);

// require('express') loads the Express library into your project.
// express is a Node.js web framework that helps you build APIs and servers easily.
// We are storing it in a variable named express
const express = require(`express`);

// express() is a function - Calling it creates a new Express application
// We are storing the application in a variable named app
// The app is now the server object. - Everything built from here on (routes, middleware, etc) attaches to app.
const app = express();

// this is the middleware -- this just tells the system to use express for request/responses
// This helps the system use Express for translating JSON requests and responses.
app.use(express.json());

// This created a route to respond to HTTP GET requests.
// GET requests are what your browser sends when you visit a webpage.
// "/" is called the root URL and will run when someone visits the localhost:3000
// (req, res) => {}
// // This is a function that runs when someone hits that route.
// It has two parameters:
// req → the request (what the client sent)
// res → the response (what you send back)
// res.send(...) is what sends the text back to the browser
app.get(`/`, (req, res) => {
  res.send(`Smart To-Do API is running`);
});

// This starts the server and tells the app to listen on port 3000.
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
