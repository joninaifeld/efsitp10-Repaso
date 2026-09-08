import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import DetailScreen from "../screens/DetailScreen";
import { useFavorites } from "../context/FavoritesContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack que contiene Home y Detalle
const HomeStack = ({ favorites, onToggleFavorite }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#cc0000" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "800" },
      }}
    >
      <Stack.Screen
        name="Home"
        options={{ title: "Pokedex Explorer" }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Detail"
        options={{ title: "Detalle" }}
      >
        {(props) => (
          <DetailScreen
            {...props}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// Tab navigator principal
const AppNavigator = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#cc0000",
          tabBarInactiveTintColor: "#aaa",
          tabBarStyle: {
            borderTopColor: "#eee",
            elevation: 8,
            shadowColor: "#000",
            shadowOpacity: 0.08,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 18, color }}>🏠</Text>
            ),
          }}
        >
          {(props) => (
            <HomeStack
              {...props}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Favoritos"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#cc0000" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "800" },
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 18, color }}>⭐</Text>
            ),
            tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
          }}
        >
          {(props) => (
            <FavoritesScreen
              {...props}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
