import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Lista básica de pokemon con limit/offset
export const getPokemons = (opts = {}) => {
  const { limit = null, offset = null } = opts;
  const params = {};
  if (limit !== null) params.limit = limit;
  if (offset !== null) params.offset = offset;
  return api.get("/", { params });
};

// Pokemon por id o nombre
export const getPokemonById = (nameOrId) => api.get(`/${nameOrId}`);

// Lista con info completa (nombre, imagen, tipos, etc.)
export const getPokemonsFull = async (opts = {}) => {
  const listRes = await getPokemons(opts);
  const results = listRes.data.results;

  const detailed = await Promise.all(
    results.map((pokemon) => axios.get(pokemon.url))
  );

  return detailed.map((res) => res.data);
};

export default api;
