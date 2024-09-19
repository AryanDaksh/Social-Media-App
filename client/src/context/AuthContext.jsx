import { createContext, useState, useEffect, useCallback } from "react";
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || {}
    );

    const login = useCallback((token) => {
        try {
            const decodedToken = jwtDecode(token);
            const { sub: email, fullName, userId, exp } = decodedToken;
            const userData = { email, fullName, userId };

            // Optionally check for expiration
            if (exp && Date.now() / 1000 > exp) {
                throw new Error("Token has expired");
            }

            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", JSON.stringify(userData));

            navigate("/home");
        } catch (error) {
            console.error("Error decoding token:", error);
            // Handle login error (e.g., show error message)
        }
    }, [navigate]);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        setUser({});
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    }, [navigate]);

    useEffect(() => {
        const checkTokenExpired = () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000;
                    if (decodedToken.exp < currentTime) {
                        logout();
                        console.log("Token expired");
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                    logout();
                }
            }
        };

        if (isAuthenticated) {
            checkTokenExpired();
            const intervalId = setInterval(checkTokenExpired, 5 * 60 * 1000); 

            return () => clearInterval(intervalId);
        }
    }, [isAuthenticated, logout]);

    const value = { isAuthenticated, login, logout, user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
