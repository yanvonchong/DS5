let numbers = [];

// Genera un número único
function generateUniqueNumber() {
    let num;
    do {
        num = Math.floor(Math.random() * 99) + 1;
    } while (numbers.includes(num));
    numbers.push(num);
    return num;
}

// Muestra los números en el contenedor
function displayNumbers() {
    const container = document.getElementById('numberContainer');
    container.innerHTML = '';
    numbers.forEach(num => {
        const div = document.createElement('div');
        div.className = 'numberBox';
        div.textContent = num;
        container.appendChild(div);
    });
}

// Ordenar números en orden ascendente
function sortNumbersAsc() {
    numbers.sort((a, b) => a - b);
    displayNumbers();
}

// Ordenar números en orden descendente
function sortNumbersDesc() {
    numbers.sort((a, b) => b - a);
    displayNumbers();
}

document.getElementById('generate').addEventListener('click', () => {
    generateUniqueNumber();
    displayNumbers();
});

document.getElementById('sortAsc').addEventListener('click', sortNumbersAsc);
document.getElementById('sortDesc').addEventListener('click', sortNumbersDesc);
