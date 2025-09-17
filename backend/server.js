import { configDotenv } from "dotenv";
import { connect } from "mongoose";
import express from "express";
import userRouter from "./routes/UserRoutes.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

configDotenv();

const app = express();
const port = process.env.APP_PORT || 8000;
const db_url = `${process.env.MONGO_URL}`;

app.use(express.json());

async function startServer() {
  try {
    await connect(db_url);
    console.log("Connexion à MongoDB réussie !");
    app.listen(port, () => {
      console.log(`🚀 Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error);
    process.exit(1);
  }
}

// Route de test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// documentation Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


// Routes API
app.use("/api/auth", userRouter);

// Gestion des erreurs globales Express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

startServer();
