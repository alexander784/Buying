import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData, accessToken, refreshToken) => {
        Cookies.set("user", JSON.stringify(userData));
        Cookies.set("access_token", accessToken);
        Cookies.set("refresh_token", refreshToken);
        setUser(userData);  
        router.push("/");
    };

    const handleLogout = () => {
        Cookies.remove("user");
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
