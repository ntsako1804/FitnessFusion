// apiService.js
const API_KEY = 'fced76fc98msh714ee8e3d9dc629p135665jsnfe18451cce99';
const API_HOST = 'news-api14.p.rapidapi.com';

// Fetch articles with optional search query
export const fetchArticles = async (query = '') => {
    const url = new URL('https://news-api14.p.rapidapi.com/v2/search/articles');
    const params = {
        language: 'en',
        query: query // Include the query parameter here
    };
    
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data || []; // Return the articles data or an empty array if no data
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
};
