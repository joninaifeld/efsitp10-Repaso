import PokemonCard from "./PokemonCard";
import "./PokemonList.css";

const PokemonList = ({ pokemons, favorites, onToggleFavorite }) => {
  if (pokemons.length === 0) {
    return (
      <div className="pokemon-list__empty">
        <div className="pokemon-list__empty-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
        <p>No encontramos resultados.</p>
        <p className="pokemon-list__empty-hint">
          Intentá con otro nombre o cambiá el filtro de tipo.
        </p>
      </div>
    );
  }

  // Usamos un Set para lookup rápido de favoritos
  const favoriteIds = new Set(favorites.map(({ id }) => id));

  return (
    <section className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={favoriteIds.has(pokemon.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
};

export default PokemonList;
