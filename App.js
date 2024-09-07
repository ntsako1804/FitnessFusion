import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { auth, signOut } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { View, ActivityIndicator, Button } from 'react-native';

// Screens
import LoginScreen from './login/Login';
import RegisterScreen from './login/Register';
import HomeScreen from './screens/HomeScreen';
import WorkoutStack from './WorkoutScreens/WorkoutStack'; // Import the WorkoutStack
import TaskApp from './ScheduleScreens/TaskApp';
import ChatNavigator from './ChatScreens/ChatNavigator'; // Chat stack navigator
import ProfileScreen from './screens/ProfileScreen';

// Nutrition Screens
import NutritionTabs from './NutritionScreens/MealPlanStack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainAppTabs({ user }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#FF6B76',
        tabBarStyle: {
          backgroundColor: '#373838',
          padding: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Workout"
        component={WorkoutStack}
        options={{
          tabBarLabel: 'Workout',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fitness-center" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Nutrition"
        component={NutritionTabs}
        options={{
          tabBarLabel: 'Nutrition',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="restaurant-menu" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={TaskApp}
        initialParams={{ user_id: user.uid }} // Pass user_id to TaskApp
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
        initialParams={{ user_id: user.uid }} // Pass user_id to ChatNavigator
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#FF6B76" />
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false); // Loading is done
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  if (loading) {
    return <LoadingScreen />; // Show loading screen while checking auth state
  }

  return (
    <NavigationContainer>
      {user ? (
        <MainAppTabs user={user} /> // Pass the user object to MainAppTabs
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}







// //App.js
// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
// import { auth, signOut } from './firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
// import { View, ActivityIndicator, Button } from 'react-native';

// // Screens
// import LoginScreen from './login/Login';
// import RegisterScreen from './login/Register';
// import HomeScreen from './screens/HomeScreen';
// import WorkoutScreen from './WorkoutScreens/WorkoutScreen';
// import NutritionScreen from './screens/NutritionScreen';
// import ScheduleScreen from './screens/ScheduleScreen';
// import ChatNavigator from './ChatScreens/ChatNavigator'; // Chat stack navigator
// import ProfileScreen from './screens/ProfileScreen';
// import WorkoutStack from './WorkoutScreens/WorkoutStack'; // Import the WorkoutStack
// import TaskApp from './ScheduleScreens/TaskApp';

// //nutritionScreens
// import NutritionTabs from './NutritionScreens/MealPlanStack';



// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// function MainAppTabs({ user }) {
//   return (
//     <>
//       <Tab.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           tabBarActiveTintColor: '#FF6B76',
//           tabBarStyle: {
//             backgroundColor: '#373838',
//             padding: 10,
//           },
//         }}
//       >
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialIcons name="home" color={color} size={size} />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Workout"
//           component={WorkoutStack}
//           options={{
//             tabBarLabel: 'Workout',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialIcons name="fitness-center" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Nutrition"
//           component={NutritionTabs}
//           options={{
//             tabBarLabel: 'Nutrition',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialIcons name="restaurant-menu" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Schedule"
//           component={TaskApp}
//           initialParams={{ user_id: user.uid }} // Pass user_id to TaskApp
//           options={{
//             tabBarLabel: 'Schedule',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="calendar" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Chat"
//           component={ChatNavigator}
//           initialParams={{ user_id: user.uid }} // Pass user_id to ChatNavigator
//           options={{
//             tabBarLabel: 'Chat',
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="chatbubbles-sharp" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             tabBarLabel: 'Profile',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialIcons name="person" color={color} size={size} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//       {/* <Button title="Logout" onPress={() => signOut(auth)} /> */}
//     </>
//   );
// }

// function LoadingScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator size="large" color="#FF6B76" />
//     </View>
//   );
// }

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//       setLoading(false); // Loading is done
//     });

//     return unsubscribe; // Cleanup subscription on unmount
//   }, []);

//   if (loading) {
//     return <LoadingScreen />; // Show loading screen while checking auth state
//   }

//   return (
//     <NavigationContainer>
//       {user ? (
//         <MainAppTabs user={user} /> // Pass the user object to MainAppTabs
//       ) : (
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Register"
//             component={RegisterScreen}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       )}
//     </NavigationContainer>
//   );
// }
