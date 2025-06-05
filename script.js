document.addEventListener("DOMContentLoaded", loadTasks);

function updateTaskCount() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("taskCount").innerText = `Total Tasks: ${tasks.length}`;
}

// Modify loadTasks() to call updateTaskCount()
function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text" contenteditable="false">${task.text}</span>
            <small>${task.date}</small>
            <button onclick="enableEdit(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
    });

    updateTaskCount();
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