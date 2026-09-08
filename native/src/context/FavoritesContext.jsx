import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "pokedex-favorites";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos al iniciar
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Error al leer favoritos:", err);
      }
    };
    loadFavorites();
  }, []);

  // Persistir favoritos cada vez que cambian
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (err) {
        console.error("Error al guardar favoritos:", err);
      }
    };
    saveFavorites();
  }, [favorites]);

  // Toggle: agrega si no está, quita si ya está. Sin duplicados.
  const toggleFavorite = (pokemon) => {
    setFavorites((prev) => {
      const yaExiste = prev.some(({ id }) => id === pokemon.id);
      if (yaExiste) {
        // Quitar con filter
        return prev.filter(({ id }) => id !== pokemon.id);
      }
      // Agregar con spread operator
      return [...prev, pokemon];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return ctx;
};
