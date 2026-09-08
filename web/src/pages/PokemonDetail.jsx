import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { getPokemonById } from "../services/api";
import "./PokemonDetail.css";

const TYPE_COLORS = {
  fire: "#F08030", water: "#6890F0", grass: "#78C850", electric: "#F8D030",
  ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0", ground: "#E0C068",
  flying: "#A890F0", psychic: "#F85888", bug: "#A8B820", rock: "#B8A038",
  ghost: "#705898", dragon: "#7038F8", dark: "#705848", steel: "#B8B8D0",
  fairy: "#EE99AC", normal: "#A8A878",
};

const TYPE_ES = {
  fire: "Fuego", water: "Agua", grass: "Planta", electric: "Electrico",
  ice: "Hielo", fighting: "Lucha", poison: "Veneno", ground: "Tierra",
  flying: "Volador", psychic: "Psiquico", bug: "Bicho", rock: "Roca",
  ghost: "Fantasma", dragon: "Dragon", dark: "Siniestro", steel: "Acero",
  fairy: "Hada", normal: "Normal",
};

const STAT_LABELS = {
  hp: "HP", attack: "Ataque", defense: "Defensa",
  "special-attack": "At. Especial", "special-defense": "Def. Especial", speed: "Velocidad",
};

const PokemonDetail = ({ favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState(state?.pokemon ?? null);
  const [loading, setLoading] = useState(!state?.pokemon);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si ya tenemos el pokemon desde la navegación, no hace falta fetch
    if (state?.pokemon) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getPokemonById(id);
        setPokemon(res.data);
      } catch (err) {
        console.error("Error al obtener detalle:", err);
        setError("No fue posible obtener la información del Pokemon.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, state?.pokemon]);

  if (loading) {
    return (
      <div className="detail__status">
        <div className="detail__spinner" />
        <p>Cargando información...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail__status detail__status--error">
        <p>{error}</p>
        <Link to="/" className="detail__back">← Volver al inicio</Link>
      </div>
    );
  }

  if (!pokemon) return null;

  const { name, sprites, types, weight, height, base_experience, abilities, stats } = pokemon;

  const imageUrl =
    sprites?.other?.["official-artwork"]?.front_default ||
    sprites?.front_default;

  const typeNames = types.map(({ type }) => type.name);
  const isFavorite = favorites.some((f) => f.id === pokemon.id);

  // Spread operator para crear objeto con datos del pokémon al togglear
  const handleToggle = () => onToggleFavorite({ ...pokemon });

  return (
    <main className="detail">
      <Link to="/" className="detail__back">← Volver al inicio</Link>

      <article className="detail__card">
        <div className="detail__image-section">
          <img
            src={imageUrl}
            alt={`Imagen oficial de ${name}`}
            className="detail__image"
          />
          <span className="detail__id">#{String(pokemon.id).padStart(3, "0")}</span>
        </div>

        <div className="detail__info">
          <h2 className="detail__name">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>

          <div className="detail__types">
            {typeNames.map((type) => (
              <span
                key={type}
                className="detail__type-badge"
                style={{ backgroundColor: TYPE_COLORS[type] || "#999" }}
              >
                {TYPE_ES[type] || type}
              </span>
            ))}
          </div>

          <div className="detail__data-grid">
            <div className="detail__data-item">
              <span className="detail__data-label">Peso</span>
              <span className="detail__data-value">{weight / 10} kg</span>
            </div>
            <div className="detail__data-item">
              <span className="detail__data-label">Altura</span>
              <span className="detail__data-value">{height / 10} m</span>
            </div>
            <div className="detail__data-item">
              <span className="detail__data-label">Experiencia base</span>
              <span className="detail__data-value">{base_experience ?? "—"} XP</span>
            </div>
          </div>

          <div className="detail__abilities">
            <h3 className="detail__section-title">Habilidades</h3>
            <ul className="detail__abilities-list">
              {abilities.map(({ ability, is_hidden }) => (
                <li key={ability.name} className="detail__ability">
                  {ability.name.replace("-", " ")}
                  {is_hidden && <span className="detail__hidden-badge">oculta</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail__stats">
            <h3 className="detail__section-title">Estadísticas</h3>
            {stats.map(({ stat, base_stat }) => (
              <div key={stat.name} className="detail__stat-row">
                <span className="detail__stat-label">
                  {STAT_LABELS[stat.name] || stat.name}
                </span>
                <span className="detail__stat-value">{base_stat}</span>
                <div className="detail__stat-bar-bg">
                  <div
                    className="detail__stat-bar"
                    style={{ width: `${Math.min((base_stat / 255) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            className={`detail__fav-btn ${isFavorite ? "detail__fav-btn--active" : ""}`}
            onClick={handleToggle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          </button>
        </div>
      </article>
    </main>
  );
};

export default PokemonDetail;
