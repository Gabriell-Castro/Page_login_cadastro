const cargo = localStorage.getItem("userRole");
const btnAddNewTask = document.querySelector(".btnAddTask");
const todoList = document.querySelector("#todoList");
const todoInput = document.querySelector("#todoInput");

if (cargo === "admin") {
  todoList.innerHTML = "";
} else {
  todoList.innerHTML =
    "<li class='todoList-admin'>Você não tem permissão para adicionar, editar ou apagar tarefas. Entre como administrador!</li>";
}
window.addEventListener("DOMContentLoaded", loadTasksFromStorage);

function saveTasksToStorage(tasks) {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("todoTasks")) || [];
}

function createTaskElement(task) {
  const taskText = document.createElement("span");
  taskText.textContent = task.text;
  taskText.classList.add("task-text");

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Apagar";
  deleteBtn.className = "delete-btn";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Editar";
  editBtn.className = "edit-btn";

  const newTask = document.createElement("li");
  newTask.setAttribute("data-id", task.id);
  newTask.appendChild(taskText);
  newTask.appendChild(actions);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  // Eventos
  deleteBtn.addEventListener("click", () => {
    if (cargo === "user") {
      alert("Você não tem permissão para apagar tarefas.");
      return;
    } else {
      newTask.remove();
      removeTaskFromStorage(task.id);
    }
  });

  editBtn.addEventListener("click", () => {
    if (cargo === "user") {
      alert("Você não tem permissão para editar tarefas.");
      return;
    } else {
      const novoTexto = prompt("Editar tarefa:", task.text);
      if (novoTexto && novoTexto.trim() !== "") {
        taskText.textContent = novoTexto;

        const tasks = getTasksFromStorage();
        const index = tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          tasks[index].text = novoTexto;
          saveTasksToStorage(tasks);
        }
      }
    }
  });

  return newTask;
}

function addNewTask() {
  if (cargo === "user") {
    alert("Você não tem permissão para adicionar tarefas.");
    return;
  }

  const taskValue = todoInput.value.trim();
  if (taskValue === "") {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  const task = {
    id: Date.now().toString(),
    text: taskValue,
  };

  const newTaskElement = createTaskElement(task);
  todoList.appendChild(newTaskElement);

  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);

  todoInput.value = "";
}

function loadTasksFromStorage() {
  const tasks = getTasksFromStorage();
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    todoList.appendChild(taskElement);
  });
}

function removeTaskFromStorage(id) {
  const tasks = getTasksFromStorage();
  const filteredTasks = tasks.filter((task) => task.id !== id);
  saveTasksToStorage(filteredTasks);
}

btnAddNewTask.addEventListener("click", addNewTask);
