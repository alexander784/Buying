const { createContext, useState, useEffect } = require("react");


const AuthContext = createContext();

export const AuthProvider = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);



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


    
}