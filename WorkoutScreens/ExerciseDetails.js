import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function ExerciseDetailScreen({ route }) {
  const { exercise } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Image source={{ uri: exercise.gifUrl }} style={styles.image} />
      <Text style={styles.header}>Target Muscle: {exercise.target}</Text>
      <Text style={styles.header}>Equipment: {exercise.equipment}</Text>
      <Text style={styles.description}>Instructions: {exercise.instructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#101629',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 16,
  },
});
