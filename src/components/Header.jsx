import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="header__brand">
        <h1 className="header__title">Pokedex Explorer</h1>
      </div>
      <nav className="header__nav">
        <Link
          to="/"
          className={`header__link ${pathname === "/" ? "header__link--active" : ""}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          Inicio
        </Link>
        <Link
          to="/favoritos"
          className={`header__link ${pathname === "/favoritos" ? "header__link--active" : ""}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          Favoritos
        </Link>
      </nav>
    </header>
  );
};

export default Header;
