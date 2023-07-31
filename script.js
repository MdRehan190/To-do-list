const taskList = document.getElementById("list");
const addButton = document.getElementById("btn");
const taskInput = document.getElementById("input");
const AllTasks = document.getElementById("all");
const CompleteTasks = document.getElementById("completed");
const IncompleteTasks = document.getElementById("incomplete");

let allTask = 0;
let completedTask = 0;
updateCount();

addButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);
AllTasks.addEventListener("click", filterAllTasks);

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("You must write something!");
  } else {
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo");

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("check");
    newTodo.appendChild(completedButton);

    const taskText = document.createElement("span");
    taskText.innerText = taskInput.value;
    newTodo.appendChild(taskText);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash");
    newTodo.appendChild(trashButton);
    taskList.appendChild(newTodo);
    taskInput.value = "";
    allTask++;
    updateCount();
    saveData();
  }
}

function deleteTask(e) {
  const item = e.target;
  if (item.classList[0] === "trash") {
    const task = item.parentElement;
    if (task.classList.contains("completed")) {
      completedTask--;
    }
    allTask--;
    task.classList.add("fade");
    task.remove();
    updateCount();
    saveData();
  }

  if (item.classList[0] === "check") {
    const task = item.parentElement;
    if (task.classList.contains("completed")) {
      return;
    }
    task.classList.add("completed");
    completedTask++;
    updateCount();
    saveData();
  }
}

function updateCount() {
  document.getElementById("allCount").innerText = allTask;
  document.getElementById("completeCount").innerText = completedTask;
  document.getElementById("incompleteCount").innerText =
    allTask - completedTask;
}