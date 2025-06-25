
const router = require("express").Router();
const Message = require("../models/Message");
const Conversation = require("../models/Conversation"); // Importez le modèle Conversation

// Créer un message
router.post("/add", async (req, res) => {
  // Par défaut, un nouveau message est non lu (isRead: false)
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    sender: req.body.sender,
    text: req.body.text,
    isRead: false, // Explicitly set to false, although default in schema handles it
  });

  try {
    const savedMessage = await newMessage.save();

    // Mettre à jour le champ updatedAt de la conversation parente
    // Cela permettra de faire remonter la conversation dans la liste
    await Conversation.findByIdAndUpdate(
      req.body.conversationId,
      {
        $set: { updatedAt: new Date() }
      },
      { new: true }
    );

    res.status(200).json(savedMessage);
  } catch (err) {
    console.error("Erreur lors de l'ajout du message:", err);
    res.status(500).json(err);
  }
});

// Récupérer tous les messages d'une conversation
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Erreur lors de la récupération des messages:", err);
    res.status(500).json(err);
  }
});

// NOUVELLE ROUTE : Marquer les messages d'une conversation comme lus
router.put("/markAsRead/:conversationId", async (req, res) => {
  const { userId } = req.body; // L'ID de l'utilisateur qui marque comme lu

  if (!userId) {
    return res.status(400).json({ message: "userId est requis pour marquer comme lu." });
  }

  try {
    // Met à jour tous les messages dans la conversation spécifiée
    // qui NE SONT PAS envoyés par l'utilisateur courant (userId)
    // et qui NE SONT PAS déjà marqués comme lus.
    const result = await Message.updateMany(
      {
        conversationId: req.params.conversationId,
        sender: { $ne: userId }, // Ne pas marquer les messages envoyés par l'utilisateur lui-même
        isRead: false,           // Marquer seulement les messages non lus
      },
      {
        $set: { isRead: true }
      }
    );

    res.status(200).json({ message: "Messages marqués comme lus", modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error("Erreur lors du marquage des messages comme lus:", err);
    res.status(500).json(err);
  }
});

module.exports = router;