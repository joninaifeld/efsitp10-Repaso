import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PokemonList from "../components/PokemonList";
import { getPokemonsFull } from "../services/api";
import "./Home.css";

const ITEMS_PER_PAGE = 20;

const Home = ({ favorites, onToggleFavorite }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("todos");
  const [page, setPage] = useState(1);

  // Carga inicial de los primeros 100 pokémon
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonsFull({ limit: 100, offset: 0 });
        setAllPokemons(data);
      } catch (err) {
        console.error("Error al obtener pokémon:", err);
        setError("No fue posible obtener la información. Verificá tu conexión e intentá de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // Resetear página al cambiar filtros
  useEffect(() => {
    setPage(1);
  }, [query, selectedType]);

  // Filtros
  const filtered = allPokemons.filter((pokemon) => {
    const matchesQuery = pokemon.name.toLowerCase().includes(query.toLowerCase().trim());
    const matchesType =
      selectedType === "todos" ||
      pokemon.types.some(({ type }) => type.name === selectedType);
    return matchesQuery && matchesType;
  });

  // Paginación con slice
  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <main className="home">
      <section className="home__hero">
        <h2 className="home__hero-title">Explorador de Pokemon</h2>
        <p className="home__hero-subtitle">
          Buscá, filtrá y guardá tus Pokemon favoritos.
        </p>
      </section>

      <div className="home__content">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />

        {loading && (
          <div className="home__status">
            <div className="home__spinner" role="status" aria-label="Cargando" />
            <p>Cargando información...</p>
          </div>
        )}

        {!loading && error && (
          <div className="home__error">
            <p>{error}</p>
            <button
              className="home__retry-btn"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="home__results-count">
              {filtered.length === 0
                ? "No encontramos resultados."
                : `Mostrando ${paginated.length} de ${filtered.length} Pokemon`}
            </p>

            <PokemonList
              pokemons={paginated}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />

            {hasMore && (
              <div className="home__load-more">
                <button className="home__load-more-btn" onClick={handleLoadMore}>
                  Cargar mas Pokemon
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
