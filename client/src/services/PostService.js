import axios from 'axios';

// Create an Axios instance with default configuration
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API, // Base URL from environment variables
    timeout: 10000, // Optional timeout setting
});

export default class PostService {
    // Method to add a new post
    async add(values, token) {
        try {
            const response = await apiClient.post('posts/add', values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data; // Return only the data part of the response
        } catch (error) {
            console.error("Error adding post:", error); // Log error
            throw error; // Re-throw error for further handling
        }
    }

    // Method to get all posts by a specific user ID
    async getAllByUserId(userId, token) {
        try {
            const response = await apiClient.get(`posts/getallbyuser/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching posts by user:", error);
            throw error;
        }
    }

    // Method to get all posts by users followed by the given user ID
    async getAllByUserFollowing(userId, token) {
        try {
            const response = await apiClient.get(`posts/getbyuserfollowing/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching posts by following users:", error);
            throw error;
        }
    }

    // Method to get a post by its ID
    async getById(id, token) {
        try {
            const response = await apiClient.get(`posts/getbyid/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching post by ID:", error);
            throw error;
        }
    }
}
