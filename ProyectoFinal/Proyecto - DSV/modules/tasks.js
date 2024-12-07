export function init() {
    console.log("Vista de Tareas cargada.");

    const tasksList = document.getElementById("tasks-list");
    const addTaskInput = document.getElementById("add-task-input");
    const deadlineInput = document.getElementById("deadline-input");
    const addTaskBtn = document.getElementById("add-task-btn");

    // Cargar tareas existentes de localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Mostrar las tareas al iniciar
    tasks.forEach(task => {
        renderTask(task.text, task.deadline, task.completed);
    });

    // Manejar el evento de agregar tarea
    addTaskBtn.addEventListener("click", () => {
        const taskText = addTaskInput.value.trim();
        const deadline = deadlineInput.value;

        if (taskText === "") {
            alert("Por favor, escribe una tarea.");
            return;
        }

        if (deadline === "") {
            alert("Por favor, selecciona una fecha límite.");
            return;
        }

        const task = { text: taskText, deadline, completed: false };
        tasks.push(task);
        saveTasks(tasks);
        renderTask(task.text, task.deadline, task.completed);

        addTaskInput.value = ""; // Limpiar el campo de entrada
        deadlineInput.value = ""; // Limpiar el campo de fecha
    });

    // Guardar tareas en localStorage
    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Renderizar una tarea en la lista
    function renderTask(text, deadline, completed) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        if (completed) taskItem.classList.add("completed");

        // Contenido de la tarea
        taskItem.innerHTML = `
            <div class="task-details">
                <span>${text}</span>
                <div class="task-deadline">Fecha límite: ${deadline}</div>
            </div>
            <div class="task-actions">
                <button class="complete-btn">Completar</button>
                <button class="delete-btn">Eliminar</button>
            </div>
        `;

        // Botón de completar
        taskItem.querySelector(".complete-btn").addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            const index = tasks.findIndex(task => task.text === text && task.deadline === deadline);
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
        });

        // Botón de eliminar
        taskItem.querySelector(".delete-btn").addEventListener("click", () => {
            tasksList.removeChild(taskItem);
            tasks = tasks.filter(task => task.text !== text || task.deadline !== deadline);
            saveTasks(tasks);
        });

        tasksList.appendChild(taskItem);
    }
}