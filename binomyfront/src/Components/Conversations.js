import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // Importe toast pour les notifications de disc

const Conversations = () => {
  const currentUser = useSelector((state) => state.user?.user);
  const users = useSelector((state) => state.users?.users);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour recharger les conversations (utile après une suppression)
  const fetchConversations = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!currentUser?._id) {
        setConversations([]);
        setLoading(false);
        return;
      }
      const res = await axios.get(
        `https://pfe2025-api.vercel.app/conversation/${currentUser._id}`
      );

      const uniqueConversationsMap = new Map();
      res.data.forEach((conv) => {
        const otherMemberId = conv.members.find((id) => id !== currentUser._id);
        if (!uniqueConversationsMap.has(otherMemberId)) {
          uniqueConversationsMap.set(otherMemberId, conv);
        }
      });

      setConversations(Array.from(uniqueConversationsMap.values()));
    } catch (err) {
      console.error("Erreur récupération des conversations :", err);
      setError("Impossible de charger les conversations. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      fetchConversations();
    }
  }, [currentUser?._id]);

  // NOUVELLE FONCTION : Gérer la suppression d'une conversation avec confirmation par toast
  const handleDeleteConversation = async (conversationId) => {
    // Utilise un toast pour la confirmation
    toast(
      (t) => (
        <div className="flex items-center space-x-4 p-2 bg-white rounded-lg shadow-lg">
          <p className="text-gray-800">
            Êtes-vous sûr de vouloir supprimer cette conversation ?
          </p>
          <div className="flex space-x-2">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
              onClick={async () => {
                toast.dismiss(t.id); // Ferme le toast de confirmation
                try {
                  await axios.delete(
                    `https://pfe2025-api.vercel.app/conversation/${conversationId}`,
                    {
                      data: { userId: currentUser._id },
                    }
                  );
                  toast.success("Conversation supprimée avec succès !"); // Affiche un toast de succès
                  fetchConversations(); // Recharger la liste des conversations
                } catch (err) {
                  console.error(
                    "Erreur lors de la suppression de la conversation :",
                    err
                  );
                  toast.error(
                    "Erreur lors de la suppression de la conversation."
                  ); // Affiche un toast d'erreur
                }
              }}
            >
              Oui
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-md text-sm"
              onClick={() => toast.dismiss(t.id)} // Ferme le toast sans action
            >
              Non
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Le toast reste jusqu'à ce qu'un bouton soit cliqué
        id: "delete-confirm", // ID unique pour ne pas en avoir plusieurs simultanément
        style: {
          // Style pour s'assurer que le toast est bien visible
          padding: "0", // Important pour que le div interne gère le padding
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }
    );
  };

  const getReceiver = (members) => {
    const receiverId = members.find((id) => id !== currentUser._id);
    return users?.find((u) => u._id === receiverId);
  };

  const generateRoomId = (id1, id2) => {
    return id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
  };

  const getAvatarFallback = (user) => {
    if (!user) return "❓";
    return user.nom
      ? user.nom.charAt(0).toUpperCase()
      : user.email
      ? user.email.charAt(0).toUpperCase()
      : "👤";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-blue-200">
        <h2
          className="text-4xl mb-8 text-center font-extrabold"
          style={{
            color: "#00AEEF",
            fontStyle: "italic",
            fontFamily: "'Comic Sans MS', cursive",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          📨 Mes conversations
        </h2>

        {loading ? (
          <div className="text-center text-gray-600 text-lg">
            Chargement des conversations...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 text-lg">{error}</div>
        ) : conversations.length === 0 ? (
          <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-600 text-lg font-medium mb-2">
              Aucune conversation pour le moment.
            </p>
            <p className="text-gray-500 text-md">
              Commencez une discussion en contactant un autre utilisateur !
            </p>
          </div>
        ) : (
          <ul className="space-y-5">
            {conversations.map((conv) => {
              const receiver = getReceiver(conv.members);
              if (!receiver) return null;
              const roomId = generateRoomId(currentUser._id, receiver._id);

              return (
                <li key={conv._id} className="group relative">
                  <Link
                    to={`/chat/${roomId}`}
                    className="flex items-center p-5 rounded-xl bg-white border border-gray-200 hover:border-indigo-400
                                                    transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1
                                                    relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100
                                                    transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"
                    ></div>

                    <div
                      className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white
                                                            font-bold text-xl shadow-lg flex-shrink-0 mr-4"
                    >
                      {receiver.profilePicture ? (
                        <img
                          src={receiver.profilePicture}
                          alt={receiver.nom}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getAvatarFallback(receiver)
                      )}
                    </div>

                    <div className="relative z-10 flex-grow">
                      <p
                        className="text-lg font-semibold text-gray-900 group-hover:text-indigo-800 transition-colors duration-300"
                        style={{ fontFamily: "'Comic Sans MS', cursive" }}
                      >
                        {receiver.nom} {receiver.prenom}
                      </p>
                      <p className="text-sm text-gray-500 group-hover:text-gray-700 italic transition-colors duration-300">
                        Cliquez pour discuter{" "}
                        <span className="font-sans">💬</span>
                      </p>
                      {conv.updatedAt && (
                        <p className="text-xs text-gray-400 mt-1">
                          Dernière activité :{" "}
                          {new Date(conv.updatedAt).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="relative z-10 ml-4 flex-shrink-0">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          conv.hasUnreadMessages ? "bg-red-500" : "bg-green-500"
                        }`}
                        title={conv.hasUnreadMessages ? "Non lu" : "Déjà vu"}
                      ></div>
                    </div>

                    <span className="relative z-10 text-2xl text-blue-400 group-hover:text-indigo-600 transition-all duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  {/* Bouton de suppression*/}
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Empêche la navigation vers la chatroom
                      e.stopPropagation(); // Empêche l'événement de cliquer sur le Link
                      handleDeleteConversation(conv._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white
                                                   rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold
                                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    title="Supprimer la conversation"
                  >
                    &times; {/* Symbole "X" pour supprimer */}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Conversations;
