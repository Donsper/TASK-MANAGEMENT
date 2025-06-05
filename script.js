document.addEventListener("DOMContentLoaded", loadTasks);

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

function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text" contenteditable="false">${task.text}</span>
            <small>${task.date}</small>
            <button onclick="enableEdit(${index})">✏️ Edit</button>
            <button onclick="deleteTask(${index})">❌ Delete</button>`;
        taskList.appendChild(li);
    });
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

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}