import { Link } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import "./Favorites.css";

const Favorites = ({ favorites, onToggleFavorite }) => {
  return (
    <main className="favorites">
      <div className="favorites__header">
        <h2 className="favorites__title">Mis Favoritos</h2>
        <span className="favorites__count">
          {favorites.length} {favorites.length === 1 ? "Pokemon" : "Pokemon"}
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites__empty">
          <div className="favorites__empty-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </div>
          <p>Todavía no agregaste ningún favorito.</p>
          <Link to="/" className="favorites__back-link">
            Ir al inicio a explorar Pokemon
          </Link>
        </div>
      ) : (
        <section className="favorites__grid">
          {favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default Favorites;
