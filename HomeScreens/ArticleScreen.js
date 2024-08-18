// screens/ArticleScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Button } from 'react-native';

const ArticleScreen = ({ route }) => {
    const { article } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {article.thumbnail && <Image source={{ uri: article.thumbnail }} style={styles.thumbnail} />}
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.excerpt}>{article.excerpt}</Text>
            <Text style={styles.date}>Published on: {new Date(article.date).toDateString()}</Text>
            {article.publisher && (
                <View style={styles.publisherContainer}>
                    <Text>Publisher: {article.publisher.name}</Text>
                    <Button
                        title="Visit Publisher"
                        onPress={() => Linking.openURL(article.publisher.url)}
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    thumbnail: {
        width: '100%',
        height: 200,
        marginBottom: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    excerpt: {
        fontSize: 16,
        marginBottom: 10
    },
    date: {
        fontSize: 14,
        color: '#777',
        marginBottom: 20
    },
    publisherContainer: {
        marginTop: 20
    }
});

export default ArticleScreen;
