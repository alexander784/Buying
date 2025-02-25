import Router from "next/router";
const { createContext, useState, useEffect } = require("react");


const AuthContext = createContext();

export const AuthProvider = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    const router = useRouter();



    useEffect (() => {
        const fetchUser = async () => {
            const token = getToken();
            if (token) {
                const fetchedUser = await getUser();
                if (fetchedUser) {
                    setUser(fetchedUser);
                    setRole(fetchedUser.is_admin ? 'admin' : 'user');
                }
            }
        };
        fetchUser();
    }, []);

    const handleLogin = async (email, password) => {
        const data = await loginUser(email, password);
        if(data.access) {
            saveToken(data.access, data.refresh);
            setUser(data.user);
            setRole(data.user.is_admin ? 'admin': 'user');
            Router.push('/');
        }else {
            console.error('Login failed');
        }
    };
    const handleLogout = () => {
        removeToken();
        setUser(null);
        setRole(null);
        router.push("/");
    };


    
}