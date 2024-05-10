import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../../services/auth.service';
import { object, string } from 'yup';
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const currentUser = await AuthService.getCurrentUser();
                if (currentUser && currentUser.roles && currentUser.roles.includes("ROLE_USER")) {
                    setUser(currentUser);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkAuthorization();
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        console.log("Login Called")
        try {
            const validationSchema = object({
                username: string().required(),
                password: string().required(),
            });

            await validationSchema.validate({ username, password }, { abortEarly: false });

            const response = await AuthService.login(username, password);
            if (response) {
                const currentUser = response;
                setUser(currentUser);
                setIsLoggedIn(true);
                toast.success("Đăng nhập thành công");
            } else {
                toast.error("Đăng nhập không thành công");
            }
        } catch (error) {
            setLoading(false);
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setErrors({ general: resMessage });
            toast.error("Đăng nhập không thành công");
        }
        setLoading(false);
    };

    const register = async (username, email, password, confirmPassword) => {
        setLoading(true);
        console.log("Register Called");

    
        try {
            const validationSchema = object({
                username: string().required(),
                email: string().required(),
                password: string().required(),
                confirmPassword: string().required(),
            });
            await validationSchema.validate({ username, password, email, confirmPassword }, { abortEarly: false });

            const userData = {
                username,
                email,
                role: ["user"],
                password,
                confirmPassword
            };

            const response = await AuthService.register(userData);
            if (response) {
                // Đăng ký thành công, tiến hành đăng nhập
                await login(username, password);
                toast.success("Đăng ký thành công");
            } else {
                toast.error("Đăng ký không thành công");
            }
        } catch (error) {
            setLoading(false);
            const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            setErrors({ general: resMessage });
            toast.error("Đăng ký không thành công");
        }
        setLoading(false);
    };

    const logout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout, loading, errors }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;