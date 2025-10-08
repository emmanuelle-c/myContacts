import type { JSX } from "react";
import { useAuth } from "./context/useAuth";


export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { auth } = useAuth();
  if (!auth.isLogged || !auth.token) {
    return (
      <>
        <h1>Accès refusé</h1>
        <p>Vous devez être connecté pour accéder à cette page.</p>
      </>
    );
  }
  return children;
};