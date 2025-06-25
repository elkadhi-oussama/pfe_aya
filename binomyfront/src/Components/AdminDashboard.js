import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  const sections = [
    { title: "Utilisateurs Étudiants", path: "/admin/etudiants" },
    { title: "Utilisateurs Bailleurs", path: "/admin/bailleurs" },
    { title: "Publications Partagées ", path: "/admin/publications" },
    { title: "Offres de location", path: "/admin/offres" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 p-10">
  <h1
    className="text-4xl text-center mb-10"
    style={{
      fontFamily: "'Comic Sans MS', cursive",
      color: '#00AEEF',
      textShadow: '1px 1px 2px rgba(0,0,0,0.15)',
      fontWeight: 'bold',
    }}
  >
    🎓 Tableau de Bord Administrateur
  </h1>

  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
    {sections.map((section) => (
      <Link to={section.path} key={section.title}>
        <div
          className="relative bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-blue-200"
          style={{
            fontFamily: "'Comic Sans MS', cursive",
          }}
        >
          <div className="flex flex-col items-center text-center">
            <img
              src='assets/b2.png' // Remplace par ton vrai logo
              alt="Logo étudiant"
              className="w-20 h-20 mb-4 drop-shadow-sm"
              style={{borderRadius:'20px'}}
            />
            <h2 className="text-xl text-[#F50057] font-bold">{section.title}</h2>
            <p className="text-gray-600 mt-2">Accéder à la gestion</p>
          </div>

          {/* Autocollant effet */}
          <div className="absolute top-2 right-2 bg-yellow-300 text-white text-xs px-2 py-1 rounded-full rotate-6 shadow">
            📌 Gérer
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>

  );
}

export default AdminDashboard;
