import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RechercheEtudiants from "./RechercheEtudiants";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserCard = ({ id, name, title, image }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user?.user);

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
    <div
      className="relative max-w-xs bg-white rounded-2xl p-4 shadow-md text-center border border-blue-200 hover:shadow-xl transition"
      style={{
        boxShadow: "0 8px 20px rgba(0, 174, 239, 0.3)", // turquoise
      }}
    >
      {/* Autocollant flottant */}
      <span className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 text-xs font-bold rounded-full shadow-md animate-bounce">
        🎓 Étudiant
      </span>

      <img
        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-yellow-300"
        src={image}
        alt={name}
        style={{ boxShadow: "0 0 10px #00ffff88" }} // turquoise néon
      />
      <h3
        className="mt-4 text-lg font-bold"
        style={{
          fontFamily: '"Comic Sans MS", cursive',
          color: "#00AEEF",
        }}
      >
        {name}
      </h3>
      <p
        className="text-sm font-semibold"
        style={{
          fontFamily: '"Comic Sans MS", cursive',
          color: "#F5A623", // orange fluo
        }}
      >
        {title}
      </p>

      <div className="mt-4 flex justify-around text-sm">
        <button
          onClick={handleChat}
          className="text-[#2ECC71] font-semibold hover:underline"
        >
          Contacter
        </button>
        <Link
          to={`/memberProfile/${id}`}
          className="text-[#34495E] font-semibold hover:underline"
        >
          À propos
        </Link>
      </div>
    </div>
  );
};

function Community({ user }) {
  const users = useSelector((state) => state.users?.users);

  const filteredUsers = users?.filter(
    (el) =>
      el?.email !== "admin@gmail.com" &&
      el?.email !== user?.email &&
      el?.role === "etudiant" &&
      el?.etat === "accepté"
  );

  return (
    <>
      <h2
        className="text-xl font-semibold text-center my-6"
        style={{
          color: "#00AEEF",
          fontStyle: "italic",
          fontFamily: "cursive",
          fontWeight: "bold",
        }}
      >
        🎓 Communauté des étudiants
      </h2>
      <RechercheEtudiants />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((el) => (
            <UserCard
              key={el._id}
              id={el._id}
              name={`${el.nom} ${el.prenom}`}
              title={`Étudiant(e) à ${el.institut}`}
              image={`https://pfe-aya.onrender.com/files/${el.photo}`}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Aucun utilisateur trouvé.
          </p>
        )}
      </div>
    </>
  );
}

export default Community;
