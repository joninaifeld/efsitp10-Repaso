import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";
import { getPokemonsFull } from "../services/api";

const HomeScreen = ({ favorites, onToggleFavorite }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("todos");

  // Carga inicial
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonsFull({ limit: 100, offset: 0 });
        setAllPokemons(data);
      } catch (err) {
        console.error("Error al obtener pokemon:", err);
        setError("No fue posible obtener la informacion. Revisa tu conexion.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // Filtrado con filter()
  const filtered = allPokemons.filter((pokemon) => {
    const matchesQuery = pokemon.name
      .toLowerCase()
      .includes(query.toLowerCase().trim());
    const matchesType =
      selectedType === "todos" ||
      pokemon.types.some(({ type }) => type.name === selectedType);
    return matchesQuery && matchesType;
  });

  // Set de ids favoritos para lookup rápido
  const favoriteIds = new Set(favorites.map(({ id }) => id));

  const renderItem = ({ item }) => (
    <PokemonCard
      pokemon={item}
      isFavorite={favoriteIds.has(item.id)}
      onToggleFavorite={onToggleFavorite}
    />
  );

  // Renderizado condicional
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#cc0000" />
        <Text style={styles.statusText}>Cargando informacion...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable
          style={styles.retryBtn}
          onPress={() => {
            setError(null);
            setLoading(true);
            getPokemonsFull({ limit: 100, offset: 0 })
              .then((data) => { setAllPokemons(data); setLoading(false); })
              .catch(() => { setError("No fue posible obtener la informacion."); setLoading(false); });
          }}
        >
          <Text style={styles.retryBtnText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      {filtered.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No encontramos resultados.</Text>
          <Text style={styles.emptyHint}>
            Proba con otro nombre o cambia el tipo.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.resultsCount}>
              {`${filtered.length} Pokemon encontrados`}
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  statusText: {
    fontSize: 15,
    color: "#666",
    marginTop: 8,
  },
  errorText: {
    fontSize: 15,
    color: "#cc0000",
    textAlign: "center",
    marginBottom: 8,
  },
  retryBtn: {
    backgroundColor: "#cc0000",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  list: {
    padding: 16,
  },
  resultsCount: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  emptyHint: {
    fontSize: 13,
    color: "#aaa",
    textAlign: "center",
  },
});

export default HomeScreen;
