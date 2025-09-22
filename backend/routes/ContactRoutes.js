import ContactController from "../controllers/ContactController.js";

const contactController = new ContactController();
import express from "express";
import requireAuth from "../middlewares/requireAuth.js";

const contactRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - phone
 *       properties:
 *         firstname:
 *           type: string
 *           description: Prénom du contact
 *           example: John
 *         lastname:
 *           type: string
 *           description: Nom de famille du contact
 *           example: Doe
 *         phone:
 *           type: string
 *           description: Numéro de téléphone du contact
 *           example: +33 6 12 34 56 78
 *         userId:
 *           type: string
 *           description: ID de l'utilisateur propriétaire du contact
 *           example: 60d0fe4f5311236168a109cb
 *   securitySchemes:
 *      bearerAuth: 
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 */

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Récupérer un contact par ID
 *     description: Récupère les détails d'un contact spécifique en utilisant son ID.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du contact à récupérer
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Détails du contact récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */
contactRouter.get("/:id", requireAuth, (req, res) =>
  contactController.getContactById(req, res)
);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Créer un nouveau contact
 *     description: Crée un nouveau contact pour l'utilisateur authentifié.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       500:
 *         description: Erreur serveur
 */
contactRouter.post("/", requireAuth, (req, res) =>
  contactController.createContact(req, res)
);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Récupérer tous les contacts de l'utilisateur
 *     description: Récupère une liste de tous les contacts associés à l'utilisateur authentifié.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       404:
 *         description: Aucun contact trouvé
 *       500:
 *         description: Erreur serveur
 */
contactRouter.get("/", requireAuth, (req, res) =>
  contactController.getAllContacts(req, res)
);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Mettre à jour un contact existant
 *     description: Met à jour les informations d'un contact spécifique en utilisant son ID.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du contact à mettre à jour
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */
contactRouter.put("/:id", requireAuth, (req, res) =>
  contactController.updateContact(req, res)
);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     description: Supprime un contact spécifique en utilisant son ID.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du contact à supprimer
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */
contactRouter.delete("/:id", requireAuth, (req, res) =>
  contactController.deleteContact(req, res)
);

export default contactRouter;
