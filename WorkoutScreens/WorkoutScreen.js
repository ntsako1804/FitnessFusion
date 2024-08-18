//WorkoutScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';

const bodyParts = [
  { id: '1', name: 'back', imageUrl: 'https://images.unsplash.com/photo-1611841315886-a8ad8d02f179?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhY2slMjB3b3Jrb3V0fGVufDB8fDB8fHww' },
  { id: '2', name: 'cardio', imageUrl: 'https://images.unsplash.com/photo-1583969430660-b303545eb313?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fENhcmRpb3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: '3', name: 'chest', imageUrl: 'https://images.unsplash.com/photo-1532384555668-bc0c32a17ffd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoZXN0JTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: '4', name: 'lower arms', imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGxvd2VyJTIwYXJtcyUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D' },
  { id: '5', name: 'lower legs', imageUrl: 'https://plus.unsplash.com/premium_photo-1664478159939-5242198cdcb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bG93ZXIlMjBsZWdzJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: '6', name: 'neck', imageUrl: 'https://plus.unsplash.com/premium_photo-1661582070345-3ac961232733?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG5lY2slMjB3b3Jrb3V0fGVufDB8fDB8fHww' },
  { id: '7', name: 'shoulders', imageUrl: 'https://images.unsplash.com/photo-1659350776313-2223577feeda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '8', name: 'upper arms', imageUrl: 'https://images.unsplash.com/photo-1585820114364-e6d77b1a3ca4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJtcyUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D' },
  { id: '9', name: 'upper legs', imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHVwcGVyJTIwbGVncyUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D' },
  { id: '10', name: 'waist', imageUrl: 'https://plus.unsplash.com/premium_photo-1661589455782-b9ba18ede928?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdhaXN0JTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D' },
];

const apiKey = 'fced76fc98msh714ee8e3d9dc629p135665jsnfe18451cce99';

export default function WorkoutScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBodyParts, setFilteredBodyParts] = useState(bodyParts);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = bodyParts.filter(part =>
      part.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredBodyParts(filtered);
  }, [searchTerm]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Exercises', { bodyPart: item.name })}>
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      )}
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Workouts</Text>
       <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="white"
          value={searchTerm}
          onChangeText={setSearchTerm}
       />
      <FlatList
        data={filteredBodyParts}
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
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
    color: 'white',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    color: 'white',

  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E2742',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  error: {
    color: 'red',
  },
});
