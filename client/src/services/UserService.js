import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 10000, // Optional timeout setting
});

export default class UserService {

    async getById(id, token) {
        try {
            const response = await apiClient.get(`users/getbyid/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    }

    async isFollowing(userId, followingId, token) {
        try {
            const response = await apiClient.get('users/isfollowing', {
                params: { userId, followingId },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error checking follow status:", error);
            throw error;
        }
    }
}
