import { createContext, useContext, useState, type ReactNode } from "react";
//user interface defines the structure of the user object,
//  which includes id, name, email, and role.
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}
//AuthContextType defines the shape of the authentication context,
// which includes the user object, an isAuthenticated boolean, and login/logout functions.
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void; 
    logout: () => void;
}
//AuthContext is created using createContext and initialized with undefined.
const AuthContext = createContext<AuthContextType | undefined>(undefined);
//AuthProvider is a context provider component that manages the authentication state
//  of the application.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    // isAuthenticated is a boolean that indicates whether the user is authenticated,
    //  determined by the presence of a user object.
    const isAuthenticated = !!user;
    // login function takes userData and a token, saves them to localStorage, 
    // and updates the user state.
    const login = (userData: User, token: string) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token); // حفظ التوكين
        setUser(userData);
    };
    // logout function removes the user and token from localStorage and resets the user
    //  state to null.
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
// useAuth is a custom hook that provides access to the authentication context. 
// It checks if the context is defined and throws an error if it is not used within an
//  AuthProvider.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};