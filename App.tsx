import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import LocationsScreen from './src/screens/LocationsScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import { SelectedLocationContext, Location } from './src/types';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);

  return (
    <SelectedLocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Locais') {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === 'Alertas') {
                iconName = focused ? 'alert-circle' : 'alert-circle-outline';
              } else if (route.name === 'Comunidade') {
                iconName = focused ? 'people' : 'people-outline';
              }
              return <Ionicons name={iconName as any} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#1e88e5',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
          <Tab.Screen name="Locais" component={LocationsScreen} options={{ title: 'Locais' }} />
          <Tab.Screen name="Alertas" component={AlertsScreen} options={{ title: 'Alertas' }} />
          <Tab.Screen name="Comunidade" component={CommunityScreen} options={{ title: 'Comunidade' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SelectedLocationContext.Provider>
  );
};

export default App; 