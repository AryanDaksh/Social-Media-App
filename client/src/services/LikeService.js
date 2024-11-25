import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 10000, // Optional timeout setting
});

export default class LikeService {
    async add(userId, postId, token) {
        const values = { userId, postId };
        try {
            const response = await apiClient.post("likes/add", values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error adding like:", error);
            throw error;
        }
    }

    async delete(userId, postId, token) {
        const values = { userId, postId };
        try {
            const response = await apiClient.post("likes/delete", values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting like:", error);
            throw error;
        }
    }

    async isLiked(userId, postId, token) {
        try {
            const response = await apiClient.get("likes/isliked", {
                params: { userId, postId },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error checking if liked:", error);
            throw error;
        }
    }

    async getLikesByPost(postId, token) {
        try {
            const response = await apiClient.get(`likes/getallbypost/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching likes by post:", error);
            throw error;
        }
    }
}
