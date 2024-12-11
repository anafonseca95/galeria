//Selección de elementos del DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

//Cargar las tareas del almacenamiento local
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

//Agregar tareas
addTaskButton.addEventListener("click", ()=> {
    const taskText = taskInput.value.trim();
    if(taskText){
        addTaskToList(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value =""; //Limpiar el input-entrada
    }
}
)
//Función para agregar tarea a la lista
function addTaskToList(taskText, isCompleted= false) {
    const li = document.createElement("li");
    li.className = "task-item";
    if(isCompleted)li.classList.add("completed");
    const span= document.createElement("span");
    span.textContent = taskText;
    const completeButton = document.createElement("button");
    completeButton.textContent = "✓";
    completeButton.style.backgroundColor="#3E6F3D";
    completeButton.addEventListener("click", ()=> {
        li.classList.toggle("completed");
        updateTaskStatusInLocalStorage(taskText);
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", ()=> {
        taskList.removeChild(li);
        deleteTaskFromLocalStorage(taskText);
    });
    li.appendChild(span);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}
// Almacenamiento local: Guardar Tarea
function saveTaskToLocalStorage(taskText){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({text: taskText, completed:false});
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Cargar tareas
function loadTasksFromLocalStorage(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) =>{
        addTaskToList(task.text, task.completed);
    });
}
//Actualizar estado de la tarea
function updateTaskStatusInLocalStorage(taskText){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex((task) => task.text ===taskText);
    if(taskIndex !== -1){
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
//Eliminar tarea
function deleteTaskFromLocalStorage(taskText){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatesTasks = tasks.filter((task) => task.text !==taskText);
    localStorage.setItem("tasks", JSON.stringify(updatesTasks));
}