import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData, accessToken, refreshToken) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        setUser(userData);

        if (userData.isAdmin) {
            router.push("/admin/dashboard");
        } else {
            router.push("/");
        }

        // router.push("/");
    };

    const handleLogout = () => {
       localStorage.removeItem("user");
       localStorage.removeItem("access_token");
       localStorage.removeItem("refresh_token");
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
