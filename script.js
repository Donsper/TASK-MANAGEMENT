document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("dueDateInput").addEventListener("click", function () {
  this.showPicker && this.showPicker(); // modern browsers
});
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
    li.classList.add("fade-in"); 
    li.setAttribute("data-index", index);
    li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <small>Created: ${task.dateCreated}</small><br>
        <small>Due: ${task.dueDate}</small>
        <button onclick="enableEdit(${index})"><i class="fas fa-edit"></i>Edit</button>
        <button onclick="completeTask(${index})"><i class="fas fa-check"></i>Complete</button>
        <button onclick="deleteTask(${index})"><i class="fas fa-trash"></i>Delete</button>`;
    taskList.appendChild(li);

    document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", function () {
        let index = this.parentElement.getAttribute("data-index");
        deleteTask(index);
    });
});

});


    completedTasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.classList.add("fade-in"); 
    li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <small>Created: ${task.dateCreated}</small><br>
        <small>Due: ${task.dueDate}</small><br>
        <small>Completed: ${task.completedDate || "Not recorded"}</small>
        <button onclick="deleteCompletedTask(${index})">Remove</button>`;
    completedTaskList.appendChild(li);
});


    updateTaskCounts();
}



function completeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    let completedTask = tasks.splice(index, 1)[0];
    completedTask.completedDate = new Date().toLocaleString();  
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
    let dueDateInput = document.getElementById("dueDateInput");
    let taskText = taskInput.value.trim();
    let dueDate = dueDateInput.value;

    if (taskText === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newTask = {
        text: taskText,
        dateCreated: new Date().toLocaleString(),
        dueDate: dueDate ? new Date(dueDate).toLocaleDateString() : "No due date"
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    dueDateInput.value = "";
    loadTasks();
    
}

function deleteTask(index) {
    let taskList = document.getElementById("taskList");
    let li = taskList.children[index];
    li.classList.add("fade-out");

    li.addEventListener("animationend", () => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
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
// Function to clear all tasks
function clearAllTasks() {
    localStorage.removeItem("tasks");
    loadTasks();
}

// Function to remove completed tasks
function removeCompletedTasks() {
    localStorage.removeItem("completedTasks"); 
    loadTasks();
}

// Remove all
function removeCompletedTasks() {
    localStorage.removeItem("completedTasks");
    loadTasks();
}
