import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffres, addOffre, deleteoffre } from "./redux/offreSlice"; // adapte le chemin selon ton arborescence
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function MyOffers() {
  const navigate = useNavigate();
  const current = JSON.parse(localStorage.getItem("user_connected"));
  const dispatch = useDispatch();
  const boxShadows = [
    "0 8px 20px rgba(255, 105, 180, 0.5)", // rose
    "0 8px 20px rgba(255, 204, 0, 0.5)", // jaune
    "0 8px 20px rgba(255, 0, 255, 0.4)", // fuchsia
    "0 8px 20px rgba(0, 174, 239, 0.4)", // bleu
  ];

  const emojis = ["🎓", "📚", "🧑‍🤝‍🧑", "🏠", "📝"];
  const offres = useSelector((state) => state.offre?.offrelist);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchOffres());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 4) {
      alert("Vous pouvez ajouter jusqu'à 4 images maximum.");
      return;
    }
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.price) {
      Swal.fire(
        "Champs manquants",
        "Merci de remplir tous les champs.",
        "warning"
      );
      return;
    }

    if (images.length === 0) {
      Swal.fire(
        "Aucune image",
        "Veuillez ajouter au moins une image.",
        "warning"
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("createdBy", current._id);

    images.forEach((img) => {
      formData.append("images", img);
    });

    dispatch(addOffre(formData)); //

    setForm({ title: "", description: "", price: "" });
    setImages([]);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteoffre(id));
      }
    });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {current?.role === "bailleur" && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 space-y-5 border-2 border-blue-300 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white via-blue-50 to-blue-100"
          >
            <h2
              className="text-2xl text-center"
              style={{
                fontFamily: "'Comic Sans MS', cursive",
                color: "#00AEEF",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              📝 Ajouter une offre
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Titre de l'offre"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-blue-200 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{ fontFamily: "'Comic Sans MS', cursive" }}
              required
            />

            <textarea
              name="description"
              placeholder="Description détaillée"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-blue-200 p-3 rounded-lg shadow-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{ fontFamily: "'Comic Sans MS', cursive" }}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Prix (TND)"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-blue-200 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{ fontFamily: "'Comic Sans MS', cursive" }}
              required
            />

            <label
              className="block font-semibold text-blue-700"
              style={{ fontFamily: "'Comic Sans MS', cursive" }}
            >
              📷 Images (max 4) :
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="w-full text-sm text-blue-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
            />

            {/* Preview des images */}
            <div className="flex flex-wrap gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 rounded overflow-hidden shadow-md border border-blue-200"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="bg-[#00AEEF] hover:bg-[#0099cc] text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
              style={{
                fontFamily: "'Comic Sans MS', cursive",
                letterSpacing: "1px",
              }}
            >
              🚀 Publier l’offre
            </button>
          </form>
        )}

        {/* Liste des offres */}
        <h1
          className="text-4xl font-bold text-center italic text-indigo-700 mb-10 animate-bounce"
          style={{ color: "#00AEEF" }}
        >
          🎉 Découvrez Les offres 🎓
        </h1>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {offres?.length > 0 ? (
            offres?.map((offer, index) => (
              <div
                key={offer?._id}
                className="group border rounded p-2 shadow"
                style={{
                  borderRadius: "16px",
                  padding: "16px",
                  backgroundColor: "#fff8fc",
                  boxShadow: boxShadows[index % boxShadows.length],
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
                    top: "10px",
                    right: "10px",
                    fontSize: "24px",
                    animation: "float 3s ease-in-out infinite",
                  }}
                >
                  {emojis[index % emojis.length]}
                </div>
                <img
                  alt={offer?.title}
                  src={`https://pfe2025-api.vercel.app/offres/${offer?.images?.[0]}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "10px",
                  }}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                />
                <h3
                  className="mt-4 text-sm text-gray-700"
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#d63384",
                  }}
                >
                  {offer?.title}
                </h3>
                <p
                  className="mt-1 text-lg font-medium text-gray-900"
                  style={{
                    fontWeight: "bold",
                    color: "#343a40",
                    marginTop: "8px",
                  }}
                >
                  {offer?.price} DT
                </p>
                <button
                  onClick={() => navigate(`/offredetails/${offer._id}`)}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                >
                  Découvrir
                </button>
              </div>
            ))
          ) : (
            <p>Aucune offre disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOffers;
