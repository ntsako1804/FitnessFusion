// WorkoutStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutScreen from './WorkoutScreen';
import ExercisesScreen from './ExercisesScreen';
import ExerciseDetails from './ExerciseDetails';

const Stack = createStackNavigator();

export default function WorkoutStack() {
  return (
    <Stack.Navigator initialRouteName="Workout">
      <Stack.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exercises"
        component={ExercisesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
