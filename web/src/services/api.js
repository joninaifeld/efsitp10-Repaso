import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Obtener lista de pokémon con opciones opcionales
export const getPokemons = (opts = {}) => {
  const {
    limit = null,
    offset = null,
  } = opts;

  const params = {};
  if (limit !== null) params.limit = limit;
  if (offset !== null) params.offset = offset;

  return api.get("/", { params });
};

// Obtener un pokémon por nombre o id
export const getPokemonById = (nameOrId) => api.get(`/${nameOrId}`);

// Obtener lista de pokémon con su info completa (fetch individual por cada url)
export const getPokemonsFull = async (opts = {}) => {
  const listRes = await getPokemons(opts);
  const results = listRes.data.results; // [{ name, url }, ...]

  const detailed = await Promise.all(
    results.map((pokemon) => axios.get(pokemon.url))
  );

  return detailed.map((res) => res.data);
};

// Buscar pokémon cuyo nombre contenga la query (case-insensitive) y traer su info completa
export const searchPokemonsFull = async (query = "", filters = {}) => {
  const {
    type = null,           // ej: "fire", "water", "psychic"
    minBaseExperience = null, // ej: 100 → solo pokémon con base_experience >= 100
    generation = null,     // ej: 1 → id entre 1-151, 2 → 152-251, etc.
  } = filters;

  const GENERATION_RANGES = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 905],
    9: [906, 1025],
  };

  const q = query.toLowerCase();

  const listRes = await getPokemons({ limit: 100000, offset: 0 });
  const results = listRes.data.results; // [{ name, url }, ...]

  const filtered = results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(q)
  );

  const detailed = await Promise.all(
    filtered.map((pokemon) => axios.get(pokemon.url))
  );

  let pokemons = detailed.map((res) => res.data);

  if (type !== null) {
    const t = type.toLowerCase();
    pokemons = pokemons.filter((p) =>
      p.types.some((slot) => slot.type.name === t)
    );
  }

  if (minBaseExperience !== null) {
    pokemons = pokemons.filter(
      (p) => p.base_experience >= minBaseExperience
    );
  }

  if (generation !== null && GENERATION_RANGES[generation]) {
    const [min, max] = GENERATION_RANGES[generation];
    pokemons = pokemons.filter((p) => p.id >= min && p.id <= max);
  }

  return pokemons;
};

export default api;
