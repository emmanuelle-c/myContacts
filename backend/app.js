import express from "express";
import { configDotenv } from "dotenv";
import userRouter from "./routes/UserRoutes.js";
import contactRouter from "./routes/ContactRoutes.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import cors from "cors";

configDotenv();
const url_frontend = `${process.env.URL_FRONTEND}`;

const app = express();

app.use(express.json());

app.use(cors({
  origin: url_frontend,
  credentials: true
}));

// Route de test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// documentation Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes API
app.use("/api/auth", userRouter);
app.use("/api/contacts", contactRouter);

// Gestion des erreurs globales Express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

export default app;
