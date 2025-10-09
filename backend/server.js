import { configDotenv } from "dotenv";
import { connect } from "mongoose";
import app from "./app.js";

configDotenv();

const port = process.env.APP_PORT || 8000;
const db_url = `${process.env.MONGO_URL}`;

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

startServer();
