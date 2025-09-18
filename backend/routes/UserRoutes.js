import UserController from "../controllers/UserController.js";
import express from "express";

const userController = new UserController();
const userRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegisterInput:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: jane.doe@example.com
 *         password:
 *           type: string
 *           minLength: 8
 *           example: "MyStr0ngP@ss!"
 *     UserLoginInput:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: jane.doe@example.com
 *         password:
 *           type: string
 *           example: "MyStr0ngP@ss!"
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     description: Inscription d'un nouvel utilisateur avec un email et un mot de passe.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterInput'
 *     responses:
 *       201:
 *         description: Utilisateur inscrit avec succès.
 *       400:
 *         description: L'utilisateur existe déjà.
 *       500:
 *         description: Erreur serveur.
 */
userRouter.post("/register", (req, res) => userController.register(req, res));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Connexion d'un utilisateur avec son email et son mot de passe.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginInput'
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *       400:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
userRouter.post("/login", (req, res) => userController.login(req, res));


export default userRouter;