import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MealPlan from './MealPlan';
import RecipeDetail from './RecipeDetails';
import RecipeSearch from './RecipeSearch';
import RecipeSearchDetails from './RecipeSearchDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Meal Plan Stack Navigator
const MealPlanStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MealPlan" component={MealPlan} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
);

// Search Meal Stack Navigator
const SearchMealStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecipeSearch" component={RecipeSearch} />
        <Stack.Screen name="RecipeSearchDetails" component={RecipeSearchDetails} />
    </Stack.Navigator>
);

// Bottom Tab Navigator for Meal Plan and Recipe Search
const NutritionTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Meal Plan') {
                    iconName = 'fast-food-outline'; // Icon for Meal Plan
                } else if (route.name === 'Search Recipes') {
                    iconName = 'search-outline'; // Icon for Search Recipes
                }

                return <Icon name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }}
    >
        <Tab.Screen name="Meal Plan" component={MealPlanStack} />
        <Tab.Screen name="Search Recipes" component={SearchMealStack} />
    </Tab.Navigator>
);

export default NutritionTabs;




// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
// import MealPlan from './MealPlan';
// import RecipeDetail from './RecipeDetails';
// import RecipeSearch from './RecipeSearch';
// import RecipeSearchDetails from './RecipeSearchDetails';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Meal Plan Stack Navigator
// const MealPlanStack = () => (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="MealPlan" component={MealPlan} />
//         <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
//     </Stack.Navigator>
// );

// // Search Meal Stack Navigator
// const SearchMealStack = () => (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="RecipeSearch" component={RecipeSearch} />
//         <Stack.Screen name="RecipeSearchDetails" component={RecipeSearchDetails} />
//     </Stack.Navigator>
// );

// // Bottom Tab Navigator for Meal Plan and Recipe Search
// const NutritionTabs = () => (
//     <Tab.Navigator
//         screenOptions={({ route }) => ({
//             tabBarIcon: ({ color, size }) => {
//                 let iconName;

//                 if (route.name === 'Meal Plan') {
//                     iconName = 'fast-food-outline'; // Icon for Meal Plan
//                 } else if (route.name === 'Search Recipes') {
//                     iconName = 'search-outline'; // Icon for Search Recipes
//                 }

//                 // Return the appropriate icon
//                 return <Icon name={iconName} size={size} color={color} />;
//             },
//         })}
//         tabBarOptions={{
//             activeTintColor: 'tomato',
//             inactiveTintColor: 'gray',
//         }}
//     >
//         <Tab.Screen name="Meal Plan" component={MealPlanStack} />
//         <Tab.Screen name="Search Recipes" component={SearchMealStack} />
//     </Tab.Navigator>
// );

// export default NutritionTabs; // Export the Tab navigator for use in the main app
