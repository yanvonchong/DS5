export function loadView(view) {
    const mainContent = document.getElementById("main-content");
    const sideMenu = document.getElementById("side-menu");
    const navbar = document.getElementById("navbar");

    // Determinar la vista predeterminada
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const defaultView = loggedInUser ? "home" : "login";
    view = view || defaultView; // Usar la vista proporcionada o la predeterminada

    // Cargar dinámicamente el HTML de la vista
    fetch(`views/${view}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Vista "${view}" no encontrada (HTTP ${response.status})`);
            }
            return response.text();
        })
        .then(html => {
            // Insertar el contenido HTML de la vista en el contenedor principal
            mainContent.innerHTML = html;

            // Mostrar/ocultar el menú lateral y el navbar dependiendo de la vista
            if (view === "login") {
                sideMenu.classList.add("hidden"); // Ocultar menú lateral
                navbar.classList.add("hidden"); // Ocultar navbar
            } else {
                sideMenu.classList.remove("hidden"); // Mostrar menú lateral
                navbar.classList.remove("hidden"); // Mostrar navbar
            }

            // Cargar el estilo asociado a la vista
            const existingStyle = document.querySelector("#view-style");
            if (existingStyle) {
                existingStyle.remove(); // Eliminar estilos previos
            }
            const styleLink = document.createElement("link");
            styleLink.rel = "stylesheet";
            styleLink.id = "view-style";
            styleLink.href = `css/${view}.css`; // Suponiendo que cada vista tiene su CSS
            document.head.appendChild(styleLink);

            // Importar el módulo JS correspondiente y ejecutar la función init, si existe
            return import(`./${view}.js`);
        })
        .then(module => {
            if (module.init) {
                module.init(); // Llamar la función de inicialización de la vista
            }
        })
        .catch(err => {
            console.error(`Error al cargar la vista "${view}":`, err);
            mainContent.innerHTML = `
                <p>Error al cargar la vista: <strong>${view}</strong></p>
                <p>Detalles: ${err.message}</p>
            `;
        });
}