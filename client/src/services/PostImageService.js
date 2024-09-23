import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 10000, // Optional timeout setting
});

export default class PostImageService {
    async upload(file, postId, token) {
        const formData = new FormData();
        formData.append('image', file);  // Use 'image' instead of 'file'
        formData.append('postId', postId);  // Append postId as well

        try {
            const response = await apiClient.post("postimages/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    }
}
