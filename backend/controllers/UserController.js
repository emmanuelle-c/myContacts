import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class UserController {

    async register(req, res) {
        try {
            const { email, password } = req.body;
    
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "Utilisateur déjà existant" });
            }
    
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
}

export default UserController;
