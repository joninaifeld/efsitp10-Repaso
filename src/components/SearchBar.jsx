import "./SearchBar.css";

const TYPE_OPTIONS = [
  { value: "todos",     label: "Todos" },
  { value: "fire",      label: "Fuego" },
  { value: "water",     label: "Agua" },
  { value: "grass",     label: "Planta" },
  { value: "electric",  label: "Electrico" },
  { value: "ice",       label: "Hielo" },
  { value: "fighting",  label: "Lucha" },
  { value: "poison",    label: "Veneno" },
  { value: "ground",    label: "Tierra" },
  { value: "flying",    label: "Volador" },
  { value: "psychic",   label: "Psiquico" },
  { value: "bug",       label: "Bicho" },
  { value: "rock",      label: "Roca" },
  { value: "ghost",     label: "Fantasma" },
  { value: "dragon",    label: "Dragon" },
  { value: "dark",      label: "Siniestro" },
  { value: "steel",     label: "Acero" },
  { value: "fairy",     label: "Hada" },
  { value: "normal",    label: "Normal" },
];

const SearchBar = ({ query, onQueryChange, selectedType, onTypeChange }) => {
  return (
    <div className="searchbar">
      <div className="searchbar__input-wrapper">
        <span className="searchbar__icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input
          type="text"
          className="searchbar__input"
          placeholder="Buscar Pokemon por nombre..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Buscar Pokemon"
        />
        {query && (
          <button
            className="searchbar__clear"
            onClick={() => onQueryChange("")}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      <div className="searchbar__filter-wrapper">
        <label htmlFor="type-filter" className="searchbar__label">
          Tipo:
        </label>
        <select
          id="type-filter"
          className="searchbar__select"
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          {TYPE_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
