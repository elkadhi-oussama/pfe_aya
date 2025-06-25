import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function UserPublicProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const users = useSelector((state) => state.users?.users);
  const [user, setUser] = useState(null);
  const currentUser = useSelector((state) => state.user?.user);
  useEffect(() => {
    const foundUser = users?.find((el) => el._id === id);
    setUser(foundUser);
  }, [id, users]);

  if (!user) {
    return (
      <div className="text-center py-10 text-gray-500">
        Chargement du profil...
      </div>
    );
  }
  const handleChat = () => {
    if (!currentUser || !currentUser._id) {
      Swal.fire({
        title: "Non connecté",
        text: "Veuillez vous connecter pour contacter cet étudiant.",
        icon: "info",
        confirmButtonText: "OK",
      });
      return; // 🔒 empêche navigation si pas connecté
    }

    const roomId =
      currentUser._id < id
        ? `${currentUser._id}_${id}`
        : `${id}_${currentUser._id}`;

    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div
        className="bg-white shadow-xl rounded-3xl p-6 sm:p-10 relative border border-blue-200"
        style={{ boxShadow: "0 8px 20px rgba(0, 174, 239, 0.3)" }} // effet turquoise
      >
        {/* Bouton contacter */}
        <div className="absolute top-4 right-4">
          <button
            onClick={handleChat}
            className="bg-[#00AEEF] text-white text-sm px-4 py-2 rounded-full hover:bg-[#008ecc] transition font-semibold"
          >
            ✉️ Contacter
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={`https://pfe-aya.onrender.com/files/${user?.photo}`}
            alt={user?.nom}
            className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-yellow-300"
            style={{ boxShadow: "0 0 10px #00ffff88" }}
          />
          <div className="text-center sm:text-left">
            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: '"Comic Sans MS", cursive',
                color: "#00AEEF",
              }}
            >
              {user?.prenom} {user?.nom}
            </h2>
            <p
              className="text-sm mt-1 font-semibold"
              style={{
                fontFamily: '"Comic Sans MS", cursive',
                color: "#F5A623",
              }}
            >
              {user?.niveau} à {user?.institut}
            </p>
            <span className="mt-2 inline-block text-xs bg-yellow-400 text-white px-3 py-1 rounded-full shadow animate-pulse">
              🎓 Étudiant(e)
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <span className="font-bold text-[#34495E]">📧 Email :</span>{" "}
            {user?.email}
          </div>
          <div>
            <span className="font-bold text-[#34495E]">📞 Téléphone :</span>{" "}
            {user?.tel}
          </div>
          <div>
            <span className="font-bold text-[#34495E]">🎂 Âge :</span>{" "}
            {user?.age}
          </div>
          <div>
            <span className="font-bold text-[#34495E]">📍 Origine :</span>{" "}
            {user?.gouvernorat}
          </div>
          <div>
            <span className="font-bold text-[#34495E]">
              🏠 Adresse actuelle :
            </span>{" "}
            {user?.adresse}
          </div>
        </div>

        {user?.about && (
          <div className="mt-6">
            <h3
              className="text-lg font-bold mb-2"
              style={{
                color: "#00AEEF",
                fontFamily: '"Comic Sans MS", cursive',
              }}
            >
              💬 À propos
            </h3>
            <p
              className="leading-relaxed"
              style={{
                color: "#555",
                fontFamily: '"Comic Sans MS", cursive',
              }}
            >
              {user.about}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPublicProfile;
