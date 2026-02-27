// This is where we store our storage logic AKA what we will replace later with a real database
// we are creating a temporary in-memory tasks array to simulate a database

let tasks = [];
let idCounter = 1;

module.exports = {
  tasks,
  getNextId: () => idCounter++,
};
