export function init() {
    console.log("Vista de Inicio cargada.");

    const popups = $(".popup");
    const tasksPopup = $("#tasks-popup");

    // Botones para abrir pop-ups
    $("#show-tasks-popup").on("click", () => {
        centerPopup(tasksPopup);
        tasksPopup.fadeIn();
        renderTasksPopup();
    });

    // Botón para cerrar pop-ups
    $(".close-btn").on("click", function () {
        $(this).closest(".popup").fadeOut();
    });

    // Función para centrar pop-ups
    function centerPopup(popup) {
        const windowWidth = $(window).width();
        const windowHeight = $(window).height();
        const popupWidth = popup.outerWidth();
        const popupHeight = popup.outerHeight();

        popup.css({
            left: `${(windowWidth - popupWidth) / 2}px`,
            top: `${(windowHeight - popupHeight) / 2}px`
        });
    }

    // Renderizar tareas en el pop-up
    function renderTasksPopup() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const tasksPopupContent = $("#tasks-popup-content").empty();

        if (tasks.length === 0) {
            tasksPopupContent.html("<p>No hay tareas agregadas.</p>");
        } else {
            const ul = $("<ul>").css({ listStyle: "none", padding: "0" });

            tasks.forEach(task => {
                const li = $(`
                    <li>
                        <div>
                            <strong>${task.text}</strong>
                            <p>Fecha límite: ${task.deadline || 'Sin fecha'}</p>
                        </div>
                    </li>
                `);
                if (task.completed) {
                    li.css({ textDecoration: "line-through", color: "gray" });
                }
                ul.append(li);
            });

            tasksPopupContent.append(ul);
        }
    }

    // Hacer los pop-ups movibles
    let isDragging = false, offset = { x: 0, y: 0 };

    $(".popup .popup-header").on("mousedown", function (e) {
        isDragging = true;
        const popup = $(this).closest(".popup");
        const pos = popup.offset();
        offset.x = e.pageX - pos.left;
        offset.y = e.pageY - pos.top;

        popup.addClass("dragging");
    });

    $(document).on("mousemove", function (e) {
        if (isDragging) {
            $(".popup.dragging").css({
                left: `${e.pageX - offset.x}px`,
                top: `${e.pageY - offset.y}px`
            });
        }
    });

    $(document).on("mouseup", function () {
        isDragging = false;
        $(".popup").removeClass("dragging");
    });
}
