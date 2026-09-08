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

export default api;
