const express = require("express");
const cors = require("cors"); // Permettant frontend React à communiquer avec le backend
const axios = require("axios"); // Requêtes HTTP (pas directement utilisé ici, mais utile pour d'autres routes)
const http = require("http"); // Il est utilisé spécifiquement pour Socket.IO.
const { Server } = require("socket.io");
require("dotenv").config();

// Axios + Express = Gèrent les requêtes HTTP classiques
// http + Socket.IO = Gèrent la communication WebSocket en temps réel

// Initialisation d'Express et Socket.IO
const app = express();
const server = http.createServer(app); // Serveur HTTP pour socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // À adapter à l'URL de ton front si nécessaire (e.g., "http://localhost:3000")
    methods: ["GET", "POST", "PUT", "DELETE"], // Ajout des méthodes nécessaires
    transports: ["polling"], // Utilisation du transport polling pour compatibilité avec les navigateurs
  },
});

const db_connect = require("./connect_db");
app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"));
app.use("/offres", express.static("offres")); // pour servir les images

// Connexion à la base de données
db_connect();

// Routes
app.use("/user", require("./routes/user"));
app.use("/message", require("./routes/message"));
app.use("/conversation", require("./routes/conversation"));
app.use("/post", require("./routes/post"));
app.use("/offre", require("./routes/offre"));

io.on("connection", (socket) => {
  console.log("✅ Utilisateur connecté :", socket.id);

  // Rejoindre une salle pour discussion privée
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`🟢 Socket ${socket.id} a rejoint la salle ${roomId}`);
  });

  // Envoi d’un message
  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", data);
  });

  // Déconnexion d'un utilisateur
  socket.on("disconnect", () => {
    console.log("❌ Utilisateur déconnecté :", socket.id);
  });
});

//test vercel
app.get("/", (req, res) => {
  res.send("Hello from Vercel Node.js + Express server!");
});
// Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`🚀 Serveur en écoute sur le port ${PORT}`)
);
