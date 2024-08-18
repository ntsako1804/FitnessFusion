import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { fetchArticles } from './apiService'; // Adjust the import path if necessary

const ArticleHome = ({ navigation }) => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const getArticles = async () => {
            setLoading(true);
            try {
                const articlesData = await fetchArticles(searchQuery);
                setArticles(articlesData);
                setFilteredArticles(articlesData);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            }
            setLoading(false);
        };

        getArticles();
    }, [searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ArticleScreen', { article: item })}
        >
            {item.thumbnail && <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.excerpt}>{item.excerpt}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search articles..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            {filteredArticles.length > 0 ? (
                <FlatList
                    data={filteredArticles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.url}
                />
            ) : (
                <Text style={styles.noResultsText}>No articles found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    thumbnail: {
        width: 100,
        height: 100,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    excerpt: {
        color: '#555'
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#555',
    }
});

export default ArticleHome;
