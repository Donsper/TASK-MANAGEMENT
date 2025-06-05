document.addEventListener("DOMContentLoaded", loadTasks);

function updateTaskCounts() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    document.getElementById("taskCount").innerText = `Total Tasks: ${tasks.length}`;
    document.getElementById("completedTaskCount").innerText = `Completed Tasks: ${completedTasks.length}`;
}


// Update `loadTasks()` to call `updateTaskCounts()`
function loadTasks() {
    let taskList = document.getElementById("taskList");
    let completedTaskList = document.getElementById("completedTaskList");
    taskList.innerHTML = "";
    completedTaskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <small>${task.date}</small>
            <button onclick="enableEdit(${index})">Edit</button>
            <button onclick="completeTask(${index})">Complete</button>
            <button onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
    });

    completedTasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <small>${task.date}</small>
            <button onclick="deleteCompletedTask(${index})">Remove</button>`;
        completedTaskList.appendChild(li);
    });

    updateTaskCounts();
}

function completeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    let completedTask = tasks.splice(index, 1)[0];
    completedTasks.push(completedTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

    loadTasks();
}

function deleteCompletedTask(index) {
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks.splice(index, 1);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    loadTasks();
}


// Modify addTask() and deleteTask() to call updateTaskCount()
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newTask = { text: taskText, date: new Date().toLocaleString() };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
function enableEdit(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    let taskText = taskList.children[index].querySelector(".task-text");

    taskText.contentEditable = "true";
    taskText.focus();

    taskText.addEventListener("blur", function () {
        tasks[index].text = taskText.innerText.trim();
        tasks[index].date = new Date().toLocaleString();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskText.contentEditable = "false";
        loadTasks();
    });
}
// Function to clear all tasks
function clearAllTasks() {
    localStorage.removeItem("tasks");
    loadTasks();
}

// Function to remove completed tasks
function removeCompletedTasks() {
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    loadTasks();


}