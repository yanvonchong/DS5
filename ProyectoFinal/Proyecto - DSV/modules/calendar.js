let events = JSON.parse(localStorage.getItem("events")) || {}; // Cargar eventos de localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];  // Cargar tareas de localStorage

export function init() {
    console.log("Inicializando vista de calendario...");

    const calendarBody = document.getElementById("calendar-body");
    const monthYear = document.getElementById("month-year");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    const popup = document.getElementById("event-popup");
    const closePopup = document.getElementById("close-popup");
    const saveEvent = document.getElementById("save-event");
    const eventTitle = document.getElementById("event-title");
    const setAlarm = document.getElementById("set-alarm");
    const selectedDateElement = document.getElementById("selected-date");
    const eventsPopupContent = document.getElementById("events-popup-content");

    if (
        !calendarBody ||
        !monthYear ||
        !prevMonthBtn ||
        !nextMonthBtn ||
        !popup ||
        !closePopup ||
        !saveEvent ||
        !eventTitle ||
        !selectedDateElement
    ) {
        console.error("Elementos necesarios no encontrados en el DOM.");
        return;
    }

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function renderCalendar(month, year) {
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarBody.innerHTML = ""; // Limpiar calendario
        monthYear.textContent = `${getMonthName(month)} ${year}`;

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");

                if (i === 0 && j < firstDay) {
                    cell.textContent = ""; // Celdas vacías
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const cellDate = new Date(year, month, date);
                    const cellDateKey = cellDate.toISOString().split("T")[0];
                    cell.textContent = date;
                    cell.dataset.date = cellDateKey;

                    // Mostrar marcador para eventos
                    if (events[cellDateKey]) {
                        const markerEvent = document.createElement("span");
                        markerEvent.textContent = "📌";
                        markerEvent.style.color = "#d4881f";
                        markerEvent.style.marginLeft = "5px";
                        cell.appendChild(markerEvent);
                    }

                    // Mostrar marcador para tareas
                    const taskExists = tasks.some(task => task.deadline === cellDateKey);
                    if (taskExists) {
                        const markerTask = document.createElement("span");
                        markerTask.textContent = "✔️";
                        markerTask.style.color = "#28a745";
                        markerTask.style.marginLeft = "5px";
                        cell.appendChild(markerTask);
                    }

                    // Día actual
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add("today");
                    }

                    // Abrir popup al hacer clic en un día
                    cell.addEventListener("click", () => {
                        selectedDateElement.textContent = `Fecha seleccionada: ${cell.dataset.date}`;
                        popup.classList.add("visible");
                        eventTitle.value = events[cellDateKey] || ""; // Mostrar evento guardado
                        setAlarm.checked = false;
                    });

                    date++;
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }
    }

    function getMonthName(monthIndex) {
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return months[monthIndex];
    }

    prevMonthBtn.addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    closePopup.addEventListener("click", () => {
        popup.classList.remove("visible");
    });

    saveEvent.addEventListener("click", () => {
        const selectedDate = selectedDateElement.textContent.split(": ")[1];
        const eventText = eventTitle.value.trim();

        if (eventText !== "") {
            events[selectedDate] = eventText;
        } else {
            delete events[selectedDate];
        }

        localStorage.setItem("events", JSON.stringify(events));
        popup.classList.remove("visible");
        renderCalendar(currentMonth, currentYear);

        if (setAlarm.checked) {
            alert(`Alarma configurada para ${selectedDate}`);
        }
    });

    renderCalendar(currentMonth, currentYear);
}
