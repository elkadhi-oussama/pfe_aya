import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditUserModal from "./EditUserModal";

function UserProfile({ user }) {
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  function InfoItem({ label, value }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border border-cyan-200">
        <p className="text-sm text-cyan-600 font-bold mb-1">{label}</p>
        <p
          className="text-lg text-gray-800"
          style={{
            fontFamily: "'Comic Sans MS', cursive",
            letterSpacing: "1px",
          }}
        >
          {value || "—"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-6 bg-gradient-to-br from-gray-100 via-white to-gray-200 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-5xl flex flex-col md:flex-row gap-8 border border-blue-300">
        {/* Photo + boutons */}
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src={
              user.photo
                ? `https://pfe-aya.onrender.com/files/${user.photo}`
                : "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67338d48953975001dd4b439.png"
            }
            alt="Profil"
            className="w-40 h-40 rounded-full object-cover border-4 border-[#00AEEF] shadow-lg"
          />
          <div className="flex flex-col space-y-3 mt-4 w-full px-4">
            {user.role === "etudiant" ? (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 rounded-lg text-white font-bold shadow-md transition duration-300 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-pink-500 hover:to-yellow-500"
                style={{
                  fontFamily: "'Comic Sans MS', cursive",
                  letterSpacing: "1px",
                }}
              >
                ✏️ Modifier le profil
              </button>
            ) : (
              <Link to="/mesoffres" className="w-full">
                <button
                  className="w-full px-4 py-2 rounded-lg text-white font-bold shadow-md transition duration-300 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-purple-500 hover:to-red-400"
                  style={{
                    fontFamily: "'Comic Sans MS', cursive",
                    letterSpacing: "1px",
                  }}
                >
                  📦 Mes offres
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Infos utilisateur */}
        <div className="flex-1 space-y-4">
          <div>
            <h2
              className="text-3xl font-bold mb-1"
              style={{
                fontFamily: "'Comic Sans MS', cursive",
                color: "#00AEEF",
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              Bonjour, {user.prenom || "—"} 👋
            </h2>
            <p className="text-gray-600 italic">
              {user.niveau} à {user.institut || "—"}
            </p>
            <p className="text-gray-500 mt-1">🎂 Âge : {user.age || "—"} ans</p>
          </div>

          <div>
            <h3
              className="text-xl font-semibold mb-1"
              style={{
                fontFamily: "'Comic Sans MS', cursive",
                color: "#F5A623",
              }}
            >
              À propos de moi
            </h3>
            <p className="text-gray-700 bg-blue-50 p-4 rounded-lg shadow-inner border border-blue-200">
              {user.about || "Pas de description."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem label="👤 Nom" value={user.nom} />
            <InfoItem label="🧒 Prénom" value={user.prenom} />
            <InfoItem label="📧 Email" value={user.email} />
            <InfoItem label="📞 Téléphone" value={user.tel} />
            <InfoItem label="🌍 Origine" value={user.gouvernorat} />
            <InfoItem label="🏫 Institut" value={user.institut} />
            <InfoItem label="📍 Adresse actuelle" value={user.adresse} />
          </div>
        </div>
      </div>

      {/* Modal externe d'édition */}
      {editing && (
        <EditUserModal user={user} onClose={() => setEditing(false)} />
      )}
    </div>
  );
}

export default UserProfile;
