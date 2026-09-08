import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getPokemonById } from "../services/api";

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
  "special-attack": "At. Esp.", "special-defense": "Def. Esp.", speed: "Velocidad",
};

const DetailScreen = ({ favorites, onToggleFavorite }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pokemonId } = route.params;

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getPokemonById(pokemonId);
        setPokemon(res.data);
      } catch (err) {
        console.error("Error al obtener detalle:", err);
        setError("No fue posible obtener la informacion del Pokemon.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [pokemonId]);

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
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </Pressable>
      </View>
    );
  }

  if (!pokemon) return null;

  const { name, sprites, types, weight, height, base_experience, abilities, stats } = pokemon;

  const imageUrl =
    sprites?.other?.["official-artwork"]?.front_default ||
    sprites?.front_default;

  const typeNames = types.map(({ type }) => type.name);
  const isFavorite = favorites.some((f) => f.id === pokemon.id);

  // Spread operator al togglear
  const handleToggle = () => onToggleFavorite({ ...pokemon });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Imagen */}
      <View style={styles.imageSection}>
        <Text style={styles.idText}>#{String(pokemon.id).padStart(3, "0")}</Text>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <Text style={styles.name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
        <View style={styles.typesRow}>
          {typeNames.map((type) => (
            <View
              key={type}
              style={[styles.typeBadge, { backgroundColor: TYPE_COLORS[type] || "#999" }]}
            >
              <Text style={styles.typeBadgeText}>{TYPE_ES[type] || type}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Datos */}
      <View style={styles.section}>
        <View style={styles.dataGrid}>
          <View style={styles.dataItem}>
            <Text style={styles.dataLabel}>Peso</Text>
            <Text style={styles.dataValue}>{weight / 10} kg</Text>
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.dataLabel}>Altura</Text>
            <Text style={styles.dataValue}>{height / 10} m</Text>
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.dataLabel}>Exp. base</Text>
            <Text style={styles.dataValue}>{base_experience ?? "—"} XP</Text>
          </View>
        </View>
      </View>

      {/* Habilidades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <View style={styles.abilitiesRow}>
          {abilities.map(({ ability, is_hidden }) => (
            <View key={ability.name} style={styles.abilityChip}>
              <Text style={styles.abilityText}>
                {ability.name.replace("-", " ")}
                {is_hidden ? " (oculta)" : ""}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Estadisticas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadisticas</Text>
        {stats.map(({ stat, base_stat }) => (
          <View key={stat.name} style={styles.statRow}>
            <Text style={styles.statLabel}>
              {STAT_LABELS[stat.name] || stat.name}
            </Text>
            <Text style={styles.statValue}>{base_stat}</Text>
            <View style={styles.statBarBg}>
              <View
                style={[
                  styles.statBar,
                  { width: `${Math.min((base_stat / 255) * 100, 100)}%` },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Boton favorito */}
      <View style={styles.section}>
        <Pressable
          style={[styles.favBtn, isFavorite && styles.favBtnActive]}
          onPress={handleToggle}
        >
          <Text style={[styles.favBtnText, isFavorite && styles.favBtnTextActive]}>
            {isFavorite ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
          </Text>
        </Pressable>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
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
  },
  backBtn: {
    marginTop: 8,
    padding: 10,
  },
  backBtnText: {
    color: "#cc0000",
    fontWeight: "700",
    fontSize: 14,
  },
  imageSection: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  idText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#bbb",
    marginBottom: 8,
  },
  image: {
    width: 180,
    height: 180,
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#222",
    textTransform: "capitalize",
    marginTop: 12,
  },
  typesRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  typeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  typeBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  dataGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dataItem: {
    alignItems: "center",
    gap: 4,
  },
  dataLabel: {
    fontSize: 11,
    color: "#aaa",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  dataValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  abilitiesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  abilityChip: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  abilityText: {
    fontSize: 13,
    color: "#555",
    textTransform: "capitalize",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  statLabel: {
    width: 80,
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  statValue: {
    width: 32,
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
    textAlign: "right",
  },
  statBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
  },
  statBar: {
    height: "100%",
    backgroundColor: "#cc0000",
    borderRadius: 10,
  },
  favBtn: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#e6a817",
    alignItems: "center",
  },
  favBtnActive: {
    backgroundColor: "#fff8e1",
  },
  favBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e6a817",
  },
  favBtnTextActive: {
    color: "#e6a817",
  },
});

export default DetailScreen;
