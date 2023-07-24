const readline = require("readline");

const tasks = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function addTask() {
  return new Promise((resolve) => {
    rl.question("Descripción de la tarea: ", (description) => {
      tasks.push({
        indicator: tasks.length + 1,
        description,
        completed: false,
      });
      console.log("Tarea agregada con éxito.");
      resolve();
    });
  });
}

function removeTask() {
  return new Promise((resolve, reject) => {
    rl.question(
      "Ingrese el indicador de la tarea que desea eliminar: ",
      (indicator) => {
        const index = indicator - 1;
        if (tasks[index]) {
          tasks.splice(index, 1);
          console.log("Tarea eliminada con éxito.");
          resolve();
        } else {
          console.log("Indicador inválido. Intente nuevamente.");
          reject();
        }
      }
    );
  });
}

function completeTask() {
  return new Promise((resolve, reject) => {
    rl.question(
      "Ingrese el indicador de la tarea completada: ",
      (indicator) => {
        const index = indicator - 1;
        if (tasks[index]) {
          tasks[index].completed = true;
          console.log("Tarea completada con éxito.");
          resolve();
        } else {
          console.log("Indicador inválido. Intente nuevamente.");
          reject();
        }
      }
    );
  });
}

function displayTasks() {
  console.log("\nLista de tareas:");
  tasks.forEach((task) => {
    const status = task.completed ? "Completada" : "Pendiente";
    console.log(`${task.indicator}. ${task.description} - ${status}`);
  });
  console.log("\n");
  rl.prompt();
}

function showMenu() {
  console.log("----- Menú -----");
  console.log("1. Agregar tarea");
  console.log("2. Eliminar tarea");
  console.log("3. Marcar tarea como completada");
  console.log("4. Salir");
  console.log("-----------------");
}

async function main() {
  showMenu();

  rl.on("line", async (input) => {
    switch (input.trim()) {
      case "1":
        await addTask();
        displayTasks();
        break;
      case "2":
        try {
          await removeTask();
          displayTasks();
        } catch (error) {
          displayTasks();
        }
        break;
      case "3":
        try {
          await completeTask();
          displayTasks();
        } catch (error) {
          displayTasks();
        }
        break;
      case "4":
        rl.close();
        break;
      default:
        console.log("Opción inválida. Intente nuevamente.");
        break;
    }
  });

  await new Promise((resolve) => rl.on("close", resolve));
  console.log("¡Hasta luego!");
  process.exit(0);
}

main();
