import {createContext, useContext, useState,useEffect} from "react";

import {authenticated_user, login, logout, register} from "../endpoints/api.js";
import {useNavigate} from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const nav = useNavigate();

    const get_authenticated_user = async () => {
        try {
            const user = await authenticated_user();
            setUser(user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (username, password) => {
        const user = await login(username, password);
        if (user) {
            setUser(user);
            return true;
        } else {
            alert('Incorrect username or password');
            return false;
        }
    };

    const logoutUser = async () => {
        await logout();
        setUser(null);
    };

    const registerUser = async (username, email, password) => {
        try {
            console.log('Registering with:', { username, email, password });
            await register(username, email, password);
            alert('succesfully registered!');
            nav("/login");
        } catch(error) {
            alert('Error registering user');
            console.log(error)
        }
    };

    useEffect(() => {
        get_authenticated_user();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    console.log("useAuth() context:", context);
    return context;
};