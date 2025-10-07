import { Link } from "react-router-dom";
import ReactSvg from "./ReactSvg";

export default function Header() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
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
                    {isLoggedIn === "true" ?
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