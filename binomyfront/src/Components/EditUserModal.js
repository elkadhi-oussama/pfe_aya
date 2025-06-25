import React, { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { userEdit } from "./redux/userSlice";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function EditUserModal({ user, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    nom: user.nom || "",
    prenom: user.prenom || "",
    email: user.email || "",
    tel: user.tel || "",
    gouvernorat: user.gouvernorat || "",
    institut: user.institut || "",
    adresse: user.adresse || "",
    about: user.about || "",
    niveau: user.niveau || "",
    age: user.age || ""
  });
  const [photo, setPhoto] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (photo) data.append("photo", photo);

    try {
      await dispatch(userEdit({ id: user._id, edituser: data }));
      Swal.fire("Succès", "Profil mis à jour", "success");
      onClose();
    } catch {
      Swal.fire("Erreur", "Échec de la mise à jour", "error");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Modifier mon profil</h2>
        <form onSubmit={handleEdit} className="space-y-3">
          {['nom', 'prenom', 'email', 'tel', 'adresse', 'about', 'age'].map((field) => (
            <input
              key={field}
              name={field}
              type={field === "email" ? "email" : field === "age" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          ))}

          {/* Gouvernorat */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Gouvernorat</label>
            <div className="relative">
              <select
                name="gouvernorat"
                value={form.gouvernorat}
                onChange={handleChange}
                className="w-full rounded-md bg-white py-1.5 pr-8 pl-3 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                required
              >
                <option value="" disabled>-- Choisissez votre gouvernorat --</option>
                {["Tunis", "Ben Arous", "Ariana", "Mannouba", "Nabeul", "Monastir", "Mednine", "Bizerte", "Gabes", "Beja", "Tataouine", "Zaghouan", "Kasserine", "Jendouba", "Siliana", "Sidi Bouzid", "Kef", "Kairouan", "Mahdia", "Gafsa", "Tozeur", "Gbelli", "Sfax"].map((gov) => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute top-2.5 right-3 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Institut */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Institut</label>
            <div className="relative">
              <select
                name="institut"
                value={form.institut}
                onChange={handleChange}
                className="w-full rounded-md bg-white py-1.5 pr-8 pl-3 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                required
              >
                <option value="" disabled>-- Choisissez votre institut --</option>
                {["Institut supérieur de gestion", "Institut supérieur des langues", "Institut supérieur des sciences et technologies", "Institut supérieur des etudes juridiques", "Faculté des sciences", "Ecole nationale d'ingenieurs"].map((inst) => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute top-2.5 right-3 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Niveau */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Niveau d'études</label>
            <div className="relative">
              <select
                name="niveau"
                value={form.niveau}
                onChange={handleChange}
                className="w-full rounded-md bg-white py-1.5 pr-8 pl-3 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                required
              >
                <option value="" disabled>-- Sélectionnez votre niveau d'études --</option>
                {["Licence", "Master", "Doctorat", "Ingeniorat"].map((niv) => (
                  <option key={niv} value={niv}>{niv}</option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute top-2.5 right-3 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo de profil</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="block w-full"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
