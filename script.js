const addButton = document.getElementById("add-task");
const inputElement = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

addButton.addEventListener("click", () => {
  addTask();
});

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
    return;
  }
});

function addTask() {
  const taskText = inputElement.value.trim();

  if (taskText === "") {
    document.getElementById("errorMessage").innerHTML =
      "Please enter a new task!";
    return;
  }

  document.getElementById("errorMessage").innerHTML = ""; // Clear error message

  const li = document.createElement("li");
  li.innerHTML = taskText;

  // Mark as complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";

  deleteButton.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(deleteButton);
  taskList.appendChild(li);
  input.value = "";
}
