import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

const PokemonCard = ({ pokemon, isFavorite, onToggleFavorite }) => {
  const navigation = useNavigation();
  const { id, name, sprites, types, weight, base_experience } = pokemon;

  const imageUrl =
    sprites?.other?.["official-artwork"]?.front_default ||
    sprites?.front_default ||
    null;

  // Destructuring de tipos con map
  const typeNames = types.map(({ type }) => type.name);

  const handlePress = () => {
    navigation.navigate("Detail", { pokemonId: id });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      {/* Imagen */}
      <View style={styles.imageWrapper}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>?</Text>
          </View>
        )}
        <Text style={styles.idText}>#{String(id).padStart(3, "0")}</Text>
      </View>

      {/* Info */}
      <View style={styles.body}>
        <Text style={styles.name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>

        {/* Tipos */}
        <View style={styles.typesRow}>
          {typeNames.map((type) => (
            <View
              key={type}
              style={[
                styles.typeBadge,
                { backgroundColor: TYPE_COLORS[type] || "#999" },
              ]}
            >
              <Text style={styles.typeBadgeText}>
                {TYPE_ES[type] || type}
              </Text>
            </View>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <Text style={styles.stat}>{weight / 10} kg</Text>
          <Text style={styles.statSep}>·</Text>
          <Text style={styles.stat}>{base_experience ?? "—"} XP</Text>
        </View>
      </View>

      {/* Boton favorito */}
      <Pressable
        style={[styles.favBtn, isFavorite && styles.favBtnActive]}
        onPress={() => onToggleFavorite(pokemon)}
      >
        <Text style={[styles.favBtnText, isFavorite && styles.favBtnTextActive]}>
          {isFavorite ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
        </Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 14,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  imageWrapper: {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    fontSize: 36,
    color: "#ccc",
  },
  idText: {
    position: "absolute",
    top: 8,
    right: 10,
    fontSize: 11,
    fontWeight: "700",
    color: "#bbb",
  },
  body: {
    padding: 12,
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    textTransform: "capitalize",
  },
  typesRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  typeBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  stat: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  statSep: {
    color: "#ccc",
    fontSize: 12,
  },
  favBtn: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  favBtnActive: {
    backgroundColor: "#fff8e1",
  },
  favBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
  },
  favBtnTextActive: {
    color: "#e6a817",
  },
});

export default PokemonCard;
