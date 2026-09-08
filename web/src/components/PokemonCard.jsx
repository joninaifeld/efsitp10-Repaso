import { Link } from "react-router-dom";
import "./PokemonCard.css";

const TYPE_COLORS = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878",
};

const TYPE_ES = {
  fire: "Fuego", water: "Agua", grass: "Planta", electric: "Electrico",
  ice: "Hielo", fighting: "Lucha", poison: "Veneno", ground: "Tierra",
  flying: "Volador", psychic: "Psiquico", bug: "Bicho", rock: "Roca",
  ghost: "Fantasma", dragon: "Dragon", dark: "Siniestro", steel: "Acero",
  fairy: "Hada", normal: "Normal",
};

const PokemonCard = ({ pokemon, isFavorite, onToggleFavorite }) => {
  const { id, name, sprites, types, weight, base_experience } = pokemon;

  const imageUrl =
    sprites?.other?.["official-artwork"]?.front_default ||
    sprites?.front_default ||
    "https://via.placeholder.com/120?text=No+imagen";

  // Destructuring de tipos con map
  const typeNames = types.map(({ type }) => type.name);

  return (
    <article className="pokemon-card">
      <Link to={`/pokemon/${id}`} state={{ pokemon }} className="pokemon-card__link">
        <div className="pokemon-card__image-wrapper">
          <img
            src={imageUrl}
            alt={`Imagen de ${name}`}
            className="pokemon-card__image"
            loading="lazy"
          />
          <span className="pokemon-card__id">#{String(id).padStart(3, "0")}</span>
        </div>

        <div className="pokemon-card__body">
          <h3 className="pokemon-card__name">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h3>

          <div className="pokemon-card__types">
            {typeNames.map((type) => (
              <span
                key={type}
                className="pokemon-card__type-badge"
                style={{ backgroundColor: TYPE_COLORS[type] || "#999" }}
              >
                {TYPE_ES[type] || type}
              </span>
            ))}
          </div>

          <div className="pokemon-card__stats">
            <span className="pokemon-card__stat">
              <strong>{weight / 10} kg</strong>
            </span>
            <span className="pokemon-card__stat">
              <strong>{base_experience ?? "—"} XP</strong>
            </span>
          </div>
        </div>
      </Link>

      <button
        className={`pokemon-card__fav-btn ${isFavorite ? "pokemon-card__fav-btn--active" : ""}`}
        onClick={() => onToggleFavorite(pokemon)}
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      </button>
    </article>
  );
};

export default PokemonCard;
