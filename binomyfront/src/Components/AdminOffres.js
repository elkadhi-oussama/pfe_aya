import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffres, deleteoffre } from "./redux/offreSlice";
import { useNavigate } from "react-router-dom";

function AdminOffres() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const offres = useSelector((state) => state.offre?.offrelist || []);
  const users = useSelector((state) => state.users?.users || []);

  useEffect(() => {
    dispatch(fetchOffres());
  }, [dispatch]);

  const getUserById = (id) => users.find((u) => u._id === id);

  const bailleurOffers = offres.filter((offre) => {
    const user = getUserById(offre.createdBy);
    return user?.role === "bailleur";
  });

  const handleDelete = (id) => {
    dispatch(deleteoffre(id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          📢 Offres publiées par les bailleurs
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bailleurOffers.map((offre) => {
            const bailleur = getUserById(offre.createdBy);
            return (
              <div
                key={offre._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.01]"
              >
                <img
                  src={`https://pfe2025-api.vercel.app/offres/${offre.images?.[0]}`}
                  alt={offre.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg text-gray-800 truncate">
                    {offre.title}
                  </h2>
                  <p className="text-indigo-600 font-bold mt-1">
                    {offre.price} DT
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Par : {bailleur?.nom || "—"}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/offredetails/${offre._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm transition-all duration-200 shadow"
                    >
                      🔍 Consulter
                    </button>
                    <button
                      onClick={() => handleDelete(offre._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm transition-all duration-200 shadow"
                    >
                      🗑 Supprimer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {bailleurOffers.length === 0 && (
            <p className="col-span-full text-gray-500 text-center text-sm">
              Aucune offre trouvée.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOffres;
