import { SafeAreaProvider } from "react-native-safe-area-context";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
};

export default App;
