// backend/routes/conversation.js
const router = require("express").Router();
const Conversation = require("../models/Conversation");
const Message = require("../models/Message"); // Importez le modèle Message

// Créer une nouvelle conversation
router.post("/add", async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Vérifier si une conversation existe déjà entre les deux utilisateurs
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, receiverId],
      });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (err) {
    console.error("Erreur lors de la création/récupération de la conversation:", err);
    res.status(500).json(err);
  }
});

// Récupérer toutes les conversations d’un utilisateur avec statut de lecture
router.get("/:userId", async (req, res) => {
  try {
    let conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    })
    .sort({ updatedAt: -1 })
    .lean(); // Utilisez .lean() pour obtenir des objets JavaScript simples pour modification

    // Pour chaque conversation, vérifier s'il y a des messages non lus pour l'utilisateur actuel
    for (let i = 0; i < conversations.length; i++) {
      const conv = conversations[i];
      const unreadCount = await Message.countDocuments({
        conversationId: conv._id,
        sender: { $ne: req.params.userId },
        isRead: false,
      });
      conv.hasUnreadMessages = unreadCount > 0;
    }

    res.status(200).json(conversations);
  } catch (err) {
    console.error("Erreur lors de la récupération des conversations avec statut de lecture:", err);
    res.status(500).json(err);
  }
});

// NOUVELLE ROUTE : Supprimer une conversation et ses messages
router.delete("/:conversationId", async (req, res) => {
  const { conversationId } = req.params;
  const { userId } = req.body; // L'ID de l'utilisateur qui initie la suppression (pour la sécurité si nécessaire)

  try {
    // Optionnel: Vérifier que l'utilisateur est bien membre de cette conversation avant de la supprimer
    // const conversation = await Conversation.findById(conversationId);
    // if (!conversation || !conversation.members.includes(userId)) {
    //   return res.status(403).json("Vous n'êtes pas autorisé à supprimer cette conversation.");
    // }

    // 1. Supprimer tous les messages associés à cette conversation
    await Message.deleteMany({ conversationId: conversationId });

    // 2. Supprimer la conversation elle-même
    await Conversation.findByIdAndDelete(conversationId);

    res.status(200).json("La conversation et ses messages ont été supprimés avec succès.");
  } catch (err) {
    console.error("Erreur lors de la suppression de la conversation:", err);
    res.status(500).json(err);
  }
});

module.exports = router;