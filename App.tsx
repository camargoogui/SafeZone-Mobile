import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import AlertsScreen from "./src/screens/AlertsScreen";
import CommunityScreen from "./src/screens/CommunityScreen";
import LocationDetailsScreen from "./src/screens/LocationDetailsScreen";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./src/theme/theme";
import LocationFormScreen from "./src/screens/LocationFormScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Home: "home",
            Alertas: "alert-circle",
            Comunidade: "people",
          } as const;
          return (
            <Ionicons
              name={iconMap[route.name as keyof typeof iconMap]}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alertas" component={AlertsScreen} />
      <Tab.Screen name="Comunidade" component={CommunityScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detalhes"
          component={LocationDetailsScreen}
          options={{ title: "Detalhes do Local" }}
        />
        <Stack.Screen
          name="LocationForm"
          component={LocationFormScreen}
          options={{ title: "Cadastro de Local" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
