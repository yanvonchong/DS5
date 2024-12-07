const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

const sanitizeName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, '');
};

const getPokemon = async (name) => {
  const response = await fetch(`${POKEAPI_URL}/${name}`);
  if (!response.ok) throw new Error("Pokemon not found");
  return response.json();
};

const renderPokemon = (template, pokemon) => {
  const { name, sprites, weight, height } = pokemon;
  const html = `
    <div class="pokemon-card">
      <div class="pokemon-card__header">
        <h2>${name}</h2>
        <img src="${sprites.front_default}" alt="${name}" />
      </div>
      <div class="pokemon-card__body">
        <p><strong>Peso:</strong> ${weight} hectogramos</p>
        <p><strong>Altura:</strong> ${height} decímetros</p>
      </div>
    </div>
  `;
  template.innerHTML = html;
};

export {
  getPokemon,
  renderPokemon,
  sanitizeName,
};