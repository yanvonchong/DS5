import { loadView } from './views.js';

document.addEventListener('DOMContentLoaded', () => {
    // Cargar la vista de inicio de sesión por defecto
    loadView('login');

    // Obtener referencias
    const sideMenu = document.getElementById("side-menu");
    const navbar = document.getElementById("navbar");
    const logoutBtn = document.getElementById("logout-btn");
    const userInfo = document.getElementById("user-info");
    const searchBar = document.getElementById("search-bar");
    const searchBtn = document.getElementById("search-btn");

    // Función para mostrar el nombre del usuario
    const updateUserInfo = () => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser && loggedInUser.username) {
            userInfo.textContent = `Bienvenido, ${loggedInUser.username}`;
        } else {
            userInfo.textContent = "Bienvenido, Usuario";
        }
    };

    // Controlar visibilidad del side menu y navbar dependiendo del estado del usuario
    const toggleMenus = () => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            sideMenu.classList.add("hidden");
            navbar.classList.add("hidden");
        } else {
            sideMenu.classList.remove("hidden");
            navbar.classList.remove("hidden");
        }
    };

    // Actualizar la información del usuario y visibilidad de menús
    updateUserInfo();
    toggleMenus();

    // Actualizar usuario cuando se cambia la vista o después de iniciar sesión
    document.addEventListener("viewChange", () => {
        updateUserInfo();
        toggleMenus();
    });

    // Manejar evento de búsqueda
    searchBtn.addEventListener("click", () => {
        const query = searchBar.value.trim().toLowerCase();
        if (query) {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const results = [];

            // Buscar en tareas
            for (const task of tasks) {
                if (task.text.toLowerCase().includes(query)) {
                    results.push(`Tarea: ${task.text} - Fecha límite: ${task.deadline || 'Sin fecha'}`);
                }
            }

            if (results.length > 0) {
                alert(`Resultados encontrados:\n${results.join("\n")}`);
            } else {
                alert("No se encontraron resultados.");
            }
        } else {
            alert("Por favor, ingresa un término de búsqueda.");
        }
    });

    // Manejar evento de cierre de sesión
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        loadView("login");
        toggleMenus(); // Asegurarse de ocultar el menú al cerrar sesión
    });

    // Manejar clicks en los enlaces del side menu dinámicamente
    document.addEventListener("click", (e) => {
        if (e.target.matches(".nav-link")) {
            e.preventDefault();
            const view = e.target.getAttribute("data-view");

            // Actualizar la vista seleccionada
            loadView(view);

            // Actualizar el estado activo del menú
            document.querySelectorAll(".nav-link").forEach(nav => nav.classList.remove("active"));
            e.target.classList.add("active");
        }
    });

    // Actualizar menús cuando se cambie el estado de la vista
    window.addEventListener("popstate", toggleMenus);
});
