export function init() {
    console.log("Vista de Ayuda cargada.");

    const buttons = document.querySelectorAll(".help-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                const isVisible = targetContent.style.display === "block";
                targetContent.style.display = isVisible ? "none" : "block";
            }
        });
    });
}