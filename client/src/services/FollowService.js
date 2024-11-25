import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 10000, // Optional timeout setting
});

export default class FollowService {
    async follow(values, token) {
        try {
            const response = await apiClient.post("follows/add", values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error following user:", error);
            throw error;
        }
    }

    async unfollow(values, token) {
        try {
            const response = await apiClient.post("follows/delete", values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error unfollowing user:", error);
            throw error;
        }
    }
}
