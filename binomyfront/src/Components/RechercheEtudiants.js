import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFilteredUsers } from './redux/usersSlice'; // adapte selon ton chemin

function RechercheEtudiants() {
  const [filters, setFilters] = useState({
    age: '',
    institut: '',
    about: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getFilteredUsers(filters)); // 🔥 dispatch Redux ici
  };

  const instituts = [
    '',
    'Institut supérieur de gestion',
    'Institut supérieur des langues',
    'Institut supérieur des sciences et technologies',
    'Institut supérieur des etudes juridiques',
    'Faculté des sciences',
    'Ecole nationale d\'ingenieurs',
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 mb-4 w-full max-w-2xl mx-auto">
      <h2 className="text-base font-semibold mb-3 text-gray-700">🔍 Rechercher</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="number"
          name="age"
          placeholder="Âge"
          value={filters.age}
          onChange={handleChange}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md"
        />
           <select
          name="institut"
          value={filters.institut}
          onChange={handleChange}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md"
        >
          {instituts.map((inst, idx) => (
            <option key={idx} value={inst}>
              {inst === '' ? 'Choisir un institut' : inst}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="about"
          placeholder="Mot-clé (ex: sport)"
          value={filters.about}
          onChange={handleChange}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Rechercher
      </button>
    </form>
  );
}

export default RechercheEtudiants;
