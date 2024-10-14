const tasks = require("./tasks");
const colors = require("colors");

// reads command from the terminal
const command = process.argv[2];
const taskName = process.argv[3];
const newStatus = process.argv[4];

// add task to the JSON file
if (command === "add") {
  const category = process.argv[4] || "general";
  tasks.addTask(taskName, category);
  console.log(`Task "${taskName}" added under category "${category}".`);
}

// lists the tasks in the JSON file
else if (command === "list") {
  tasks.listTasks();
}
// updates the status of a task
else if (command === "update") {
  tasks.updateTaskStatus(taskName, newStatus);
}
// deletes a task
else if (command === "delete") {
  tasks.deleteTask(taskName);
  console.log(`Task "${taskName}" deleted.`);
}
// marks a task as completed
else if (command === "complete") {
  tasks.completeTask(taskName);
  console.log(`Task "${taskName}" marked as completed.`);
}
// list a list of sorted tasks
else if (command === "sort") {
  const category = taskName;
  tasks.listTasksByCategory(category);
}
// lists tasks based on their status
else if (command === "status") {
  tasks.listTasksByStatus(newStatus);
}
// executes where there is no command passed
else {
  console.log(
    "Command not recognized. Available commands: add, list, delete, complete, sort, update, status.",
  );
}
