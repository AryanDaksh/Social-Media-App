import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 10000, // Optional timeout setting
});

export default class CommentService {
    async getAllByPost(postId, token) {
        try {
            const response = await apiClient.get(`comments/getallbypost/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching comments:", error);
            throw error;
        }
    }

    async add(values, token) {
        try {
            const response = await apiClient.post('comments/add', values, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error adding comment:", error);
            throw error;
        }
    }
}
