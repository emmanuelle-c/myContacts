import { Link } from "react-router-dom";
import ReactSvg from "./ReactSvg";
import { useAuth } from "../context/useAuth";


export default function Header() {
    const { auth, setAuth } = useAuth();
    const isLogged = auth.isLogged;
    const handleLogout = () => {
        setAuth({ isLogged: false, userId: null, token: null, email: null });
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.setItem("isLogged", "false");
        window.location.href = "/";
    }
    return (
        <header className="header">
            <ReactSvg />
            <ul className="nav-links">
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    {isLogged === true ?
                    <>
                        <Link to="/contacts">Contacts</Link>
                        <button onClick={handleLogout}>Déconnexion</button>
                    </>
                        :
                        <Link to="/login">Connexion/Inscription</Link>
                     }
                </li>
            </ul>
        </header>
    )
}