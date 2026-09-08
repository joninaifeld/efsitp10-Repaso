import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import PokemonDetail from "./pages/PokemonDetail";
import "./App.css";

const FAVORITES_KEY = "pokedex-favorites";

const App = () => {
  // Estado de favoritos inicializado desde localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persistir favoritos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Toggle: agrega si no está, quita si ya está. No permite duplicados.
  const handleToggleFavorite = (pokemon) => {
    setFavorites((prev) => {
      const yaExiste = prev.some(({ id }) => id === pokemon.id);
      if (yaExiste) {
        // Quitar de favoritos con filter
        return prev.filter(({ id }) => id !== pokemon.id);
      }
      // Agregar con spread operator
      return [...prev, pokemon];
    });
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/favoritos"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/pokemon/:id"
            element={
              <PokemonDetail
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          {/* Ruta catch-all para páginas no encontradas */}
          <Route
            path="*"
            element={
              <div className="app__not-found">
                <h2>404 — Página no encontrada</h2>
                <a href="/">Volver al inicio</a>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
