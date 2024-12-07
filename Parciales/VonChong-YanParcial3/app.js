import { getPokemon, renderPokemon, sanitizeName } from './pokemon.js';

const htmlElements = {
    form: document.querySelector('#pokemon-form'),
    details: document.querySelector('#pokemon-details'),
    clearButton: document.querySelector('#clear-button'),
    input: document.querySelector('#pokemon-input')
};

const handlers = {
    submit: async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const pokemonName = formData.get('pokemon-name');
        const sanitizedName = sanitizeName(pokemonName);

        // Si el nombre está vacío, no mostramos el botón "Limpiar"
        if (!sanitizedName) {
            alert('Por favor, ingrese un nombre válido');
            htmlElements.clearButton.style.display = 'none';
            return;
        }

        // Realiza la búsqueda del Pokémon
        const pokemon = await getPokemon(sanitizedName);
        renderPokemon(htmlElements.details, pokemon);
        
        // Muestra el botón "Limpiar" después de la búsqueda
        htmlElements.clearButton.style.display = 'block';
    },
    clear: () => {
        // Limpia el campo de entrada y los detalles del Pokémon
        htmlElements.input.value = '';
        htmlElements.details.innerHTML = '';

        // Oculta el botón "Limpiar" cuando el input está vacío
        htmlElements.clearButton.style.display = 'none';
    }
};

const bindEvents = () => {
    htmlElements.form.addEventListener('submit', handlers.submit);
    htmlElements.clearButton.addEventListener('click', handlers.clear);
};

const init = () => {
    bindEvents();
};

init();