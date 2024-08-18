import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preference, setPreference] = useState('body builder');

  const fetchMealPlan = async () => {
    const url = 'https://all-in-one-recipe-api.p.rapidapi.com/generate/meal_plan';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'fced76fc98msh714ee8e3d9dc629p135665jsnfe18451cce99',
        'x-rapidapi-host': 'all-in-one-recipe-api.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ preference })
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      console.log('API Response:', result); // Debugging line
      setMealPlan(result.recipe.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const normalizeData = (data) => {
    if (Array.isArray(data)) {
      return data;
    } else if (typeof data === 'object') {
      return Object.keys(data).map(key => data[key]);
    } else {
      return [data];
    }
  };

  const renderMealItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item}</Text>
    </View>
  );

  const renderMealSection = (title, data) => (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={normalizeData(data)}
        renderItem={renderMealItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={preference}
        onValueChange={(itemValue) => setPreference(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Body Builder" value="body builder" />
        <Picker.Item label="Vegetarian" value="vegetarian" />
        <Picker.Item label="Vegan" value="vegan" />
        <Picker.Item label="Keto" value="keto" />
        <Picker.Item label="Paleo" value="paleo" />
        <Picker.Item label="Primal" value="primal" />
        <Picker.Item label="Whole30" value="whole30" />
        <Picker.Item label="Gluten Free" value="gluten free" />
        {/* Add more preferences as needed */}
      </Picker>
      <Button title="Generate Meal Plan" onPress={fetchMealPlan} disabled={loading} />
      {loading && <Text>Loading...</Text>}
      {mealPlan && (
        <View>
          {renderMealSection('Breakfast', mealPlan.breakfast)}
          {renderMealSection('Lunch', mealPlan.lunch)}
          {renderMealSection('Dinner', mealPlan.dinner)}
          {renderMealSection('Snacks', mealPlan.snacks)}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MealPlanner;
