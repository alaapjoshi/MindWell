import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import MoodTrackerPage from './MoodTrackerPage';
import ViewMoodPage from './ViewMoodPage';
const Stack = createStackNavigator();

export default function Moodtracknavigate() {
  return (
  <Stack.Navigator independant={true}>
    <Stack.Screen name="Mood Tracker" component={MoodTrackerPage} />
    <Stack.Screen name="View Mood" component={ViewMoodPage} />

  </Stack.Navigator>
  );
}
