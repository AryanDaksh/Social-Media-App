import axios from "axios";

export default class AuthService {

    async register(values) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}auth/register`, values);
            return response.data;
        } catch (error) {
            // Handle error
            console.error("Registration error:", error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : error.message; // Standardize the error thrown
        }
    }

    async login(values) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}auth/login`, values);
            return response.data;
        } catch (error) {
            // Handle error
            console.error("Login error:", error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : error.message; // Standardize the error thrown
        }
    }
}
