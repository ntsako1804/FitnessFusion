//ExercisesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

export default function ExercisesScreen({ route, navigation }) {
  const { bodyPart } = route.params;
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'fced76fc98msh714ee8e3d9dc629p135665jsnfe18451cce99',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      setExercises(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
  }, [bodyPart]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ExerciseDetails', { exercise: item })}
    >
      <Image source={{ uri: item.gifUrl }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subTitle}>Target: {item.target}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{bodyPart} Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#101629',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#1E2742',
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
  },
});
