import { loadView } from './views.js';

export function init() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const registerLink = document.getElementById("register-link");
    const loginLink = document.getElementById("login-link");

    // Cambiar entre Login y Registro
    registerLink.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("register-container").classList.remove("hidden");
    });

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("register-container").classList.add("hidden");
        document.getElementById("login-container").classList.remove("hidden");
    });

    // Manejar el inicio de sesión
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            alert("Inicio de sesión exitoso");
            localStorage.setItem("loggedInUser", JSON.stringify(user)); // Cambiado a localStorage
            loadView("home");
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });

    // Manejar el registro
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("register-username").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value.trim();

        if (!username || !email || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, ingresa un email válido.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(u => u.username === username)) {
            alert("El usuario ya existe");
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        document.getElementById("register-container").classList.add("hidden");
        document.getElementById("login-container").classList.remove("hidden");
    });
}
