export function init() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const languageSelect = document.getElementById("language-select");
    const notificationsToggle = document.getElementById("notifications-toggle");
    const saveSettingsButton = document.getElementById("save-settings");
    const resetSettingsButton = document.getElementById("reset-settings");

    // Cargar configuraciones desde localStorage
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const savedLanguage = localStorage.getItem("language") || "es";
    const savedNotifications = localStorage.getItem("notifications") === "true";

    // Aplicar configuraciones guardadas
    darkModeToggle.checked = savedDarkMode;
    languageSelect.value = savedLanguage;
    notificationsToggle.checked = savedNotifications;

    applyDarkMode(savedDarkMode);

    // Event listeners
    saveSettingsButton.addEventListener("click", () => {
        const isDarkMode = darkModeToggle.checked;
        const language = languageSelect.value;
        const notifications = notificationsToggle.checked;

        localStorage.setItem("darkMode", isDarkMode);
        localStorage.setItem("language", language);
        localStorage.setItem("notifications", notifications);

        applyDarkMode(isDarkMode);
        applyLanguage(language);
        alert("Configuraciones guardadas.");
    });

    resetSettingsButton.addEventListener("click", () => {
        if (confirm("¿Deseas restablecer las configuraciones?")) {
            const userSession = localStorage.getItem("userSession"); // Guarda sesión
            localStorage.clear();
            if (userSession) localStorage.setItem("userSession", userSession); // Restaura sesión
            location.reload();
        }
    });
    

    function applyDarkMode(isDarkMode) {
        const container = document.getElementById("settings-container");
        container.classList.toggle("settings-dark", isDarkMode);
        container.classList.toggle("settings-light", !isDarkMode);
    }

    function applyLanguage(language) {
        const title = document.querySelector("h1");
        title.textContent = language === "es" ? "Configuración" : "Settings";

        const modeLabel = document.querySelector("label[for='dark-mode-toggle']");
        modeLabel.textContent = language === "es" ? "Modo Noche:" : "Dark Mode:";

        const languageLabel = document.querySelector("label[for='language-select']");
        languageLabel.textContent = language === "es" ? "Idioma:" : "Language:";

        const notificationsLabel = document.querySelector("label[for='notifications-toggle']");
        notificationsLabel.textContent = language === "es" ? "Notificaciones:" : "Notifications:";

        const saveButton = document.getElementById("save-settings");
        saveButton.textContent = language === "es" ? "Guardar Cambios" : "Save Changes";

        const resetButton = document.getElementById("reset-settings");
        resetButton.textContent = language === "es" ? "Restablecer Configuración" : "Reset Settings";
    }
}