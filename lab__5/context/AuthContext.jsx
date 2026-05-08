import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState(null);

    const register = (email, password, name) => {

        if (!email || !password || !name) {
            alert('Заповніть всі поля');
            return false;
        }

        const newUser = {
            email,
            password,
            name,
        };

        setUser(newUser);

        setIsAuthenticated(true);

        return true;
    };

    const login = (email, password) => {

        if (!user) {
            alert('Акаунт не існує');
            return false;
        }

        if (user.email !== email || user.password !== password) {
            alert('Неправильний email або пароль');
            return false;
        }

        setIsAuthenticated(true);

        return true;
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);