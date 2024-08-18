import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

export default function WorkoutDetailScreen({ route }) {
  const { workoutId } = route.params;
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    fetch(`fced76fc98msh714ee8e3d9dc629p135665jsnfe18451cce99${workoutId}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      setExercise(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
  }, [workoutId]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: exercise.gifUrl }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{exercise.name}</Text>
          <Text style={styles.subTitle}>Body Part: {exercise.bodyPart}</Text>
          <Text style={styles.subTitle}>Target: {exercise.target}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#1c1c1c',
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
  startText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
