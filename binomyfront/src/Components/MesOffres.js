import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffresByOwner } from "./redux/offreSlice"; // adapte le chemin
import { useNavigate } from "react-router-dom";

function MesOffres() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = JSON.parse(localStorage.getItem("user_connected"));
  const offres = useSelector((state) => state.offre?.offrelist);
  console.log(offres);

  useEffect(() => {
    if (current?._id) {
      dispatch(fetchOffresByOwner(current._id));
    }
  }, [dispatch, current]);

  return (
    <div className="p-6">
      <h1
        className="text-4xl font-bold text-center italic text-pink-600 mb-10 animate-bounce"
        style={{
          fontFamily: "cursive",
        }}
      >
        Mes Offres 🏠
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offres?.length > 0 ? (
          offres.map((offer, index) => {
            const shadowColors = [
              "0 8px 20px rgba(255, 105, 180, 0.5)", // rose
              "0 8px 20px rgba(255, 204, 0, 0.5)", // jaune
              "0 8px 20px rgba(128, 0, 255, 0.4)", // violet
            ];
            const shadow = shadowColors[index % shadowColors.length];
            const emojiList = ["🎓", "📚", "🏠", "✏️", "🎒"];

            return (
              <div
                key={offer._id}
                className="transition-all duration-300 hover:scale-105"
                style={{
                  borderRadius: "16px",
                  padding: "16px",
                  backgroundColor: "#fff0fb",
                  boxShadow: shadow,
                  fontStyle: "italic",
                  fontFamily: "cursive",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Emoji flottant */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    fontSize: "22px",
                    animation: "float 3s ease-in-out infinite",
                  }}
                >
                  {emojiList[index % emojiList.length]}
                </div>

                <img
                  src={`https://pfe-aya.onrender.com/offres/${offer.images?.[0]}`}
                  alt={offer.title}
                  className="w-full h-40 object-cover rounded mb-2"
                  style={{ borderRadius: "12px" }}
                />

                <h2 className="text-lg font-bold text-fuchsia-700 mb-1">
                  {offer?.title}
                </h2>
                <p className="text-gray-700 text-sm mb-1">
                  {offer?.description}
                </p>
                <p className="font-bold text-purple-800">{offer?.price} DT</p>

                <button
                  onClick={() => navigate(`/offredetails/${offer?._id}`)}
                  className="mt-2 text-pink-500 underline text-sm"
                >
                  📌 Voir détails
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 italic">
            😢 Vous n'avez publié aucune offre pour le moment.
          </p>
        )}
      </div>

      {/* Animation flottante (tu peux placer ce style globalement aussi dans tailwind.config.css si besoin) */}
      <style>{`
    @keyframes float {
      0% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0); }
    }
  `}</style>
    </div>
  );
}

export default MesOffres;
