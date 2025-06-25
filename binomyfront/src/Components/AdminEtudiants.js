import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateUser, removeuser } from "./redux/userSlice";
import { getusers } from "./redux/usersSlice";
import { useNavigate } from "react-router-dom";

function AdminEtudiants() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users?.users || []);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);

  const handleValidation = (id, etat) => {
    dispatch(validateUser({ id, etat }));
  };

  const handleDelete = (id) => {
    dispatch(removeuser(id));
  };

  const etudiants = users?.filter((u) => u?.role === "etudiant");

  const renderEtatBadge = (etat) => {
    let style = "bg-gray-200 text-gray-800";
    let icon = "⏳";

    if (etat === "accepté") {
      style = "bg-green-100 text-green-700";
      icon = "✅";
    } else if (etat === "refusé") {
      style = "bg-red-100 text-red-700";
      icon = "❌";
    } else if (etat === "en cours") {
      style = "bg-yellow-100 text-yellow-700";
      icon = "⏳";
    }

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${style}`}>
        {icon} {etat}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          🎓 Gestion des Étudiants
        </h1>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-800">
              <thead className="bg-blue-100 text-blue-800 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-6 py-4">Nom</th>
                  <th className="text-left px-6 py-4">Email</th>
                  <th className="text-left px-6 py-4">État</th>
                  <th className="text-left px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {etudiants?.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {user.nom} {user.prenom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4">{renderEtatBadge(user.etat)}</td>
                    <td className="px-6 py-4 flex flex-wrap gap-2">
                      {user?.etat === "en cours" ? (
                        <>
                          <button
                            onClick={() => handleValidation(user?._id, "accepté")}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs transition-all duration-200 shadow-sm"
                          >
                            ✅ Accepter
                          </button>
                          <button
                            onClick={() => handleDelete(user?._id)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-xs transition-all duration-200 shadow-sm"
                          >
                            ⚠️ Refuser
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleDelete(user?._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs transition-all duration-200 shadow-sm"
                        >
                          🗑 Supprimer
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/memberProfile/${user?._id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs transition-all duration-200 shadow-sm"
                      >
                        🔍 Consulter
                      </button>
                    </td>
                  </tr>
                ))}
                {etudiants?.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500 text-sm">
                      Aucun étudiant trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminEtudiants;
