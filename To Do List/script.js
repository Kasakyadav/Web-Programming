const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = taskText;

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("task-buttons");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnDiv);

    taskList.appendChild(li);

    taskInput.value = "";

    updateCounter();

    checkbox.addEventListener("change", function() {
        span.classList.toggle("completed");
        updateCounter();
    });

    deleteBtn.addEventListener("click", function() {
        taskList.removeChild(li);
        updateCounter();
    });

    editBtn.addEventListener("click", function() {
        const newTask = prompt("Edit your task:", span.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            span.textContent = newTask.trim();
        }
    });
}

function updateCounter() {
    const allTasks = taskList.querySelectorAll("li");
    const completed = taskList.querySelectorAll(".completed");

    totalTasks.textContent = "Total: " + allTasks.length;
    completedTasks.textContent = "Completed: " + completed.length;
    pendingTasks.textContent = "Pending: " + (allTasks.length - completed.length);
}
