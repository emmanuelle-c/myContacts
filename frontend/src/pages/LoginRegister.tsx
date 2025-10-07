import type { JSX } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
import React from "react";

export default function LoginRegister(): JSX.Element {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const email = React.useRef<HTMLInputElement>(null);
  const password = React.useRef<HTMLInputElement>(null);
  const confirmPassword = React.useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; message?: string }>({});

  const validateLogin = () => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const validationErrors: typeof errors = {};

    if (!email.current?.value) validationErrors.email = "Email requis";
    else if (!regexEmail.test(email.current?.value))
      validationErrors.email = "Saisissez une adresse mail valide";

    if (!password.current?.value) validationErrors.password = "Mot de passe requis";
    return validationErrors;
  };

  const validateRegister = () => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{12,}$/;
    const validationErrors: typeof errors = {};

    if (!email.current?.value) validationErrors.email = "Email requis";
    else if (!regexEmail.test(email.current?.value))
      validationErrors.email = "Saisissez une adresse mail valide";

    if (!password.current?.value) validationErrors.password = "Mot de passe requis";
    else if (!regexPassword.test(password.current?.value))
      validationErrors.password =
        "Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial";

    if (!confirmPassword.current?.value) validationErrors.confirmPassword = "Confirmation du mot de passe requise";
    else if (password.current?.value !== confirmPassword.current?.value)
      validationErrors.confirmPassword = "Les mots de passe ne correspondent pas";

    return validationErrors;
  }


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current?.value,
          password: password.current?.value,
        }),
        credentials: "include",
      });

      if (result?.ok) {
        navigate("/contacts");
        const data = await result.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email.current?.value || data.email);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.userId);
      } else {
        const data = await result.json();
        setErrors({ message: data.error || "Erreur lors de la connexion" });
        return;
      }

    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateRegister();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current?.value,
          password: password.current?.value,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors({ message: data.error || "Erreur lors de l'inscription" });
        return;
      }

      else {
        await handleLogin(e); // Automatically log in after sign-up
      }

    } catch (error) {
      console.error("Erreur lors de l'inscription: ", error);
    }
  };

  return (
    <main id="login-register-page">
      <div id="button-container">
        <button id="show-login" onClick={() => setIsLogin(true)}>Se connecter</button>
        <button id="show-register" onClick={() => setIsLogin(false)}>S'inscrire</button>
      </div>
      {isLogin ?
        (<form id="login-form" onSubmit={(e) => handleLogin(e)}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" ref={email} required />
          {errors.email && <p>{errors.email}</p>}

          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" name="password" ref={password} required />
          {errors.password && <p>{errors.password}</p>}

          <button type="submit">Se connecter</button>
          {errors.message && <p>{errors.message}</p>}
        </form>) : (
          <form id="register-form" onSubmit={handleRegister}>
            <label htmlFor="reg-email">Email:</label>
            <input type="email" id="reg-email" name="reg-email" ref={email} required />
            {errors.email && <p>{errors.email}</p>}

            <label htmlFor="reg-password">Mot de passe:</label>
            <input type="password" id="reg-password" name="reg-password" ref={password} required />
            {errors.password && <p>{errors.password}</p>}

            <label htmlFor="reg-confirm-password">Confirmer le mot de passe:</label>
            <input type="password" id="reg-confirm-password" name="reg-confirm-password" ref={confirmPassword} required />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

            <button type="submit">S'inscrire</button>
            {errors.message && <p>{errors.message}</p>}
          </form>)}
    </main>
  )
}