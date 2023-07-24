const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

function addTask(indicator, description) {
  tasks.push({
    indicator,
    description,
    completed: false,
  });
}

function removeTask(indicator) {
  const taskIndex = tasks.findIndex((task) => task.indicator === indicator);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
}

function completeTask(indicator) {
  const task = tasks.find((task) => task.indicator === indicator);
  if (task) {
    task.completed = true;
  }
}

function displayTasks() {
  console.log("--- Tasks ---");
  tasks.forEach((task) => {
    const status = task.completed ? "Completed" : "Not completed";
    console.log(`${task.indicator}: ${task.description} (${status})`);
  });
  console.log("-------------");
}

function promptUser() {
  rl.question(
    "Enter a command (add, remove, complete, list, quit): ",
    (command) => {
      switch (command) {
        case "add":
          rl.question("Enter task indicator: ", (indicator) => {
            rl.question("Enter task description: ", (description) => {
              addTask(indicator, description);
              displayTasks();
              promptUser();
            });
          });
          break;
        case "remove":
          rl.question("Enter task indicator to remove: ", (indicator) => {
            removeTask(indicator);
            displayTasks();
            promptUser();
          });
          break;
        case "complete":
          rl.question("Enter task indicator to complete: ", (indicator) => {
            completeTask(indicator);
            displayTasks();
            promptUser();
          });
          break;
        case "list":
          displayTasks();
          promptUser();
          break;
        case "quit":
          rl.close();
          break;
        default:
          console.log("Invalid command. Try again.");
          promptUser();
          break;
      }
    }
  );
}

promptUser();
