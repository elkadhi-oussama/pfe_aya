import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn } from 'react-icons/fa';

function Footer({ className = "" }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-white text-gray-700 py-12 ${className}`}>
      <div className="w-full mx-auto max-w-screen-xl px-4 md:px-8 bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-12">
        {/* Section supérieure: Contact et Règles importantes */}
        <div className="flex flex-col md:flex-row justify-between pb-8 border-b border-gray-200 mb-8">
          {/* Colonne Contact */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact</h3>
            <p className="text-gray-600 mb-2">+216 23252304</p>
            <p className="text-gray-600 mb-2">
              <a href="mailto:admin@gmail.com" className="hover:underline text-blue-600">admin@gmail.com</a>
            </p>
            <p className="text-gray-600">Gabes, Tunis, Tunisia</p>
          </div>

          {/* Colonne Règles importantes */}
          <div className="md:w-1/3 text-center md:text-right">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Règles importantes</h3>
            <ul className="text-gray-600">
              <li>
                <a
                  href="/charte-colocataire-ideal.pdf" // <--- C'EST CE CHEMIN QU'IL FAUT UTILISER
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600 inline-block"
                  download
                  aria-label="Télécharger la Charte du Colocataire Idéal"
                >
                  Charte du Colocataire Idéal : Nos Engagements Mutuels
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Section inférieure: Binomy à Votre Disposition, Copyright et Réseaux Sociaux */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              Binomy à Votre Disposition
            </p>
            <span className="text-sm text-gray-500">© {currentYear} Binomy.</span>
          </div>

          {/* Icônes de Réseaux Sociaux */}
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/votrepage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
              aria-label="Visit our Facebook page"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://www.instagram.com/votrepage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-pink-500 p-2 rounded-full hover:bg-pink-600 transition-colors duration-300"
              aria-label="Visit our Instagram page"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@votrepage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-black p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
              aria-label="Visit our TikTok page"
            >
              <FaTiktok size={24} />
            </a>
            <a
              href="https://www.linkedin.com/company/votrepage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-blue-700 p-2 rounded-full hover:bg-blue-800 transition-colors duration-300"
              aria-label="Visit our LinkedIn page"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;