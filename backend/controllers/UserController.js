import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { registerUserSchema, loginUserSchema } from "../middlewares/validationSchema.js";

dotenv.config();

class UserController {

    async register(req, res) {
        try {
            const { email, password } = req.body;
    
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "Utilisateur déjà existant" });
            }
    
            await registerUserSchema.validateAsync(req.body);

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: "Inscription réussie !" });
            
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de l'inscription" });
            console.error("Registration error:", error);

        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Utilisateur non trouvé" });
            }
    
            await loginUserSchema.validateAsync(req.body);
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ error: "Mot de passe incorrect" });
            }
    
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, userId: user.id, email: user.email });
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la connexion"});
            console.error("Login error:", error);
        }
    }

    async checkToken(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Token manquant" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Token manquant" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé" });
            }
            res.json({ userId: user.id, email: user.email, token });
        } catch (error) {
            res.status(401).json({ error: "Token invalide" });
        }
    }
}

export default UserController;
