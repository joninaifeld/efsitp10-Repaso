import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PokemonCard from "../components/PokemonCard";

const FavoritesScreen = ({ favorites, onToggleFavorite }) => {
  const navigation = useNavigation();

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>😔</Text>
        <Text style={styles.emptyText}>
          Todavia no agregaste ningun favorito.
        </Text>
        <Pressable
          style={styles.goHomeBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.goHomeBtnText}>Ir a explorar Pokemon</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.count}>
            {`${favorites.length} ${favorites.length === 1 ? "Pokemon" : "Pokemon"} guardado${favorites.length === 1 ? "" : "s"}`}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  list: {
    padding: 16,
  },
  count: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 12,
    backgroundColor: "#f4f4f8",
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  goHomeBtn: {
    marginTop: 4,
    borderWidth: 2,
    borderColor: "#cc0000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  goHomeBtnText: {
    color: "#cc0000",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default FavoritesScreen;
