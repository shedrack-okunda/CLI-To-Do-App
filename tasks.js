// 13/10/2024
const fs = require("fs");

// adding a task - reads the data json, appends the new task and writes it back to the file
// accepts a category
const addTask = (taskName, category = "general", status = "incomplete") => {
  const tasks = loadTasks();
  tasks.push({ name: taskName, category, status });
  saveTasks(tasks);
};

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync("data.json");
    return JSON.parse(dataBuffer.toString());
  } catch (err) {
    return [];
  }
};

const saveTasks = (tasks) => {
  fs.writeFileSync("data.json", JSON.stringify(tasks));
};

// listing tasks - reads data from data.json and  logs them to the terminal
const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach((task, index) => {
    console.log(
      `${index + 1}. ${task.name} - ${task.completed ? "Completed" : "Incomplete"}`,
    );
  });
};

// deleting a task - filter out data based on its name
const deleteTask = (taskName) => {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter((task) => task.name !== taskName);
  saveTasks(filteredTasks);
};

// marking task status - updates the task status
const updateTaskStatus = (taskName, newStatus) => {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex((task) => task.name === taskName);

  if (taskIndex !== -1) {
    tasks[taskIndex].status = newStatus;
    saveTasks(tasks);
    console.log(`Task "${taskName}" updated to "${newStatus}" status.`);
  } else {
    console.log(`Task "${taskName}" not found.`);
  }
};

// mark task as completed
const completeTask = (taskName) => {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex((task) => task.name === taskName);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
    saveTasks(tasks);
  }
};

const listTasksByCategory = (category) => {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter((task) => task.category === category);
  if (filteredTasks.length > 0) {
    console.log(`Tasks under '${category}':`);
    filteredTasks.forEach((task, index) => {
      console.log(
        `${index + 1}. ${task.name} - ${task.completed ? "Completed" : "Incomplete"}`,
      );
    });
  } else {
    console.log(`No tasks found under '${category}'`);
  }
};

const listTasksByStatus = (status) => {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter((task) => task.status === status);

  if (filteredTasks.length > 0) {
    console.log(`Tasks with status '${status}':`);
    filteredTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.name} - ${task.category}`);
    });
  } else {
    console.log(`No tasks found with status '${status}'.`);
  }
};

module.exports = {
  addTask,
  listTasks,
  deleteTask,
  completeTask,
  listTasksByCategory,
  updateTaskStatus,
  listTasksByStatus,
};
