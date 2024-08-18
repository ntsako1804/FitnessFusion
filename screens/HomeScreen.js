import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ArticleHome from '../HomeScreens/ArticleHome';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ArticleHome navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
});
