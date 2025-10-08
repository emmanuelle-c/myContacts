import { createContext, useContext } from "react";
import type { AuthContextType } from "./AuthContext";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
    return context;
}