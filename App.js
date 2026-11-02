import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ai2 from './src/screens/Chat';
import moodtracknavigate from './src/moodTrack/moodnavigate';
import meditate from './src/screens/Meditate';
import HomePage from './src/screens/Home';
import CapabilitiesPage from './src/screens/Toxic';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

    <Tab.Navigator
      initialRouteName="HomePage"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Ai2"
        component={Ai2}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Mood Tracker"
        component={moodtracknavigate}
        options={{
          tabBarLabel: 'Tracker',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-range" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Meditate"
        component={meditate}
        options={{
          tabBarLabel: 'Meditate',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="candle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Toxic"
        component={CapabilitiesPage}
        options={{
          tabBarLabel: 'Toxic',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="radioactive" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
    </NavigationContainer>
  );
}
