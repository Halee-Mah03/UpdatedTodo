const addButton = document.getElementById("add-task");
const inputElement = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

window.addEventListener("DOMContentLoaded", loadTasks);

addButton.addEventListener("click", () => {
  addTask();
});

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
    return;
  }
});

function addTask(taskObj) {
  const taskText = taskObj ? taskObj.text : inputElement.value.trim();

  if (taskText === "") {
    document.getElementById("errorMessage").innerHTML =
      "Please enter a new task!";
    return;
  }

  document.getElementById("errorMessage").innerHTML = ""; // Clear error message

  const li = document.createElement("li");
  li.innerHTML = taskText;

  if (taskObj && taskObj.completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", () => {
    li.classList.add("completed");
    saveTasks();
  });

  li.addEventListener("dblclick", () => {
    li.classList.remove("completed");
    saveTasks();
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";

  deleteButton.addEventListener("click", () => {
    li.style.animation = "slideOut 0.4s forwards";
    li.addEventListener("animationend", () => {
      li.remove();
      saveTasks();
    });
  });

  li.appendChild(deleteButton);
  taskList.appendChild(li);
  inputElement.value = "";
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    JSON.parse(savedTasks).forEach((task) => {
      addTask(task);
    });
  }
}
