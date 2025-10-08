import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./useAuth";

export interface Auth {
    isLogged: boolean;
    userId: string | null;
    token: string | null;
    email?: string | null;
}

export interface AuthContextType {
    auth: Auth;
    setAuth: React.Dispatch<React.SetStateAction<Auth>>;
    isLoading: boolean;
}


export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<Auth>(() => ({
        isLogged: !!localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        token: localStorage.getItem('token'),
        email: localStorage.getItem('email'),
    }));
    const [isLoading, setIsLoading] = useState(true);

    // Synchronisation avec le localStorage
    useEffect(() => {
        const syncAuth = () => {
            setAuth({
                isLogged: !!localStorage.getItem('token'),
                userId: localStorage.getItem('userId'),
                token: localStorage.getItem('token'),
                email: localStorage.getItem('email'),
            });
        };
        window.addEventListener('storage', syncAuth);
        return () => window.removeEventListener('storage', syncAuth);
    }, []);

    // Vérification du token côté backend au chargement
    useEffect(() => {
        const checkToken = async () => {
            if (!auth.token) {
                setIsLoading(false);
                return;
            }
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/check`, {
                    headers: { Authorization: `Bearer ${auth.token}` },
                });
                const data = await res.json();
                if (res.ok) {
                    setAuth({ isLogged: true, userId: data.userId, token: data.token, email: data.email });
                } else {
                    setAuth({ isLogged: false, userId: null, token: null, email: null });
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('email');
                }
            } catch {
                setAuth({ isLogged: false, userId: null, token: null, email: null });
            } finally {
                setIsLoading(false);
            }
        };
        checkToken();

    }, [auth.token]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

