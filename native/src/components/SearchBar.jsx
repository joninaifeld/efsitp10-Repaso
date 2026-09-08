import { View, TextInput, Pressable, Text, StyleSheet, ScrollView } from "react-native";

const TYPE_OPTIONS = [
  { value: "todos",    label: "Todos" },
  { value: "fire",     label: "Fuego" },
  { value: "water",    label: "Agua" },
  { value: "grass",    label: "Planta" },
  { value: "electric", label: "Electrico" },
  { value: "ice",      label: "Hielo" },
  { value: "fighting", label: "Lucha" },
  { value: "poison",   label: "Veneno" },
  { value: "ground",   label: "Tierra" },
  { value: "flying",   label: "Volador" },
  { value: "psychic",  label: "Psiquico" },
  { value: "bug",      label: "Bicho" },
  { value: "rock",     label: "Roca" },
  { value: "ghost",    label: "Fantasma" },
  { value: "dragon",   label: "Dragon" },
  { value: "dark",     label: "Siniestro" },
  { value: "steel",    label: "Acero" },
  { value: "fairy",    label: "Hada" },
  { value: "normal",   label: "Normal" },
];

const SearchBar = ({ query, onQueryChange, selectedType, onTypeChange }) => {
  return (
    <View style={styles.container}>
      {/* Input de busqueda */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder="Buscar Pokemon por nombre..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={onQueryChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <Pressable onPress={() => onQueryChange("")} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* Filtro de tipos — scroll horizontal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typesScroll}
      >
        {TYPE_OPTIONS.map(({ value, label }) => (
          <Pressable
            key={value}
            style={[
              styles.typeChip,
              selectedType === value && styles.typeChipActive,
            ]}
            onPress={() => onTypeChange(value)}
          >
            <Text
              style={[
                styles.typeChipText,
                selectedType === value && styles.typeChipTextActive,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f8",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 42,
  },
  inputIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#222",
  },
  clearBtn: {
    padding: 4,
  },
  clearBtnText: {
    fontSize: 13,
    color: "#aaa",
  },
  typesScroll: {
    paddingVertical: 2,
    gap: 6,
    flexDirection: "row",
  },
  typeChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    marginRight: 6,
  },
  typeChipActive: {
    backgroundColor: "#cc0000",
    borderColor: "#cc0000",
  },
  typeChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  typeChipTextActive: {
    color: "#fff",
  },
});

export default SearchBar;
