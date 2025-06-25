import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Aide() {
  // États pour gérer les valeurs des champs du formulaire
  const [formData, setFormData] = useState({
    nomComplet: '',
    nomEtablissement: '', // Champ pour le nom de l'établissement
    email: '',
    telephone: '',
    typeAide: '',        // Champ de sélection pour le type d'aide
    detailsDemande: '',  // Champ texte pour les détails de la demande
  });

  // Référence pour l'élément HTML qui sera converti en PDF.
  const formRef = useRef();

  // Met à jour l'état du formulaire à chaque changement de champ.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction pour générer et télécharger le PDF.
  const handleGeneratePdf = async () => {
    // Validation simple : vérifie si les champs obligatoires sont remplis.
    if (!formData.nomComplet || !formData.nomEtablissement || !formData.email || !formData.typeAide || !formData.detailsDemande) {
      alert("Veuillez remplir tous les champs obligatoires du formulaire.");
      return;
    }

    // Crée un élément HTML temporaire pour structurer le contenu du PDF.
    const pdfContent = document.createElement('div');

    // Applique des styles CSS inline pour le conteneur principal du PDF.
    pdfContent.style.padding = '30px';
    pdfContent.style.backgroundColor = '#ffffff';
    pdfContent.style.width = '210mm';
    pdfContent.style.minHeight = '297mm';
    pdfContent.style.boxSizing = 'border-box';
    pdfContent.style.fontFamily = 'Arial, sans-serif';
    pdfContent.style.color = '#333333';

    // Construit le contenu HTML qui sera affiché dans le PDF, en utilisant les données du formulaire.
    pdfContent.innerHTML = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 28px; font-weight: bold; color: #4338ca; margin-bottom: 10px; text-transform: uppercase;">
          Demande d'Aide Sociale
        </h1>
        <p style="font-size: 14px; color: #666666;">Document officiel - Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
      </div>

      <div style="margin-bottom: 25px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #f9f9f9;">
        <p style="margin-bottom: 10px; font-size: 16px;"><strong style="font-weight: bold; color: #1a202c;">Nom Complet:</strong> ${formData.nomComplet}</p>
        <p style="margin-bottom: 10px; font-size: 16px;"><strong style="font-weight: bold; color: #1a202c;">Nom de l'établissement:</strong> ${formData.nomEtablissement}</p>
        <p style="margin-bottom: 10px; font-size: 16px;"><strong style="font-weight: bold; color: #1a202c;">Email:</strong> ${formData.email}</p>
        <p style="margin-bottom: 10px; font-size: 16px;"><strong style="font-weight: bold; color: #1a202c;">Téléphone:</strong> ${formData.telephone || 'Non spécifié'}</p>
        <p style="margin-bottom: 10px; font-size: 16px;"><strong style="font-weight: bold; color: #1a202c;">Type d'aide demandé:</strong> ${formData.typeAide}</p>
      </div>

      <div style="margin-bottom: 30px;">
        <p style="font-size: 18px; font-weight: bold; color: #4338ca; margin-bottom: 10px;">Détails de la demande:</p>
        <p style="white-space: pre-wrap; line-height: 1.6; font-size: 15px; color: #333333; padding: 15px; border: 1px dashed #cccccc; background-color: #fcfcfc; border-radius: 5px;">${formData.detailsDemande}</p>
      </div>

      <div style="text-align: center; margin-top: 40px; border-top: 1px solid #eeeeee; padding-top: 20px;">
        <p style="font-size: 12px; color: #888888;">
          Document généré automatiquement. Toutes les informations sont confidentielles et traitées avec la plus grande discrétion.
          <br/>© Université [Votre Nom d'Université ou Organisation] - ${new Date().getFullYear()}
        </p>
      </div>
    `;

    // Attache temporairement le div au corps du document de manière invisible.
    pdfContent.style.position = 'absolute';
    pdfContent.style.left = '-9999px';
    pdfContent.style.top = '-9999px';
    pdfContent.style.zIndex = '-1';
    document.body.appendChild(pdfContent);

    // Convertit le contenu HTML temporaire en une image (canvas) pour l'intégration dans le PDF.
    const canvas = await html2canvas(pdfContent, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });
    const imgData = canvas.toDataURL('image/png');

    // Supprime le div temporaire du DOM 
    document.body.removeChild(pdfContent);

    // Crée un nouveau document PDF A4 en mode portrait.
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Sauvegarde le fichier PDF, ce qui déclenche le téléchargement dans le navigateur.
    pdf.save(`Demande_Aide_Sociale_${formData.nomComplet.replace(/\s/g, '_')}.pdf`);

    
    
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-indigo-800 mb-6">
          🤝 Aide pour les étudiants en difficulté
        </h1>

        <p className="text-gray-700 leading-relaxed mb-4">
          Nous, les Familles MABROUK et SOUAI, mettons à disposition une aide spéciale destinée aux étudiants qui rencontrent des difficultés financières ou sociales réelles et qui ont besoin de soutien pour poursuivre leurs études dans de bonnes conditions.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          <span className="font-bold text-indigo-600">📌 Cette aide est ouverte à toute personne qui en a réellement besoin.</span>
        </p>

        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Pour en bénéficier :</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Remplissez le formulaire ci-dessous avec des informations précises et honnêtes.</li>
          <li>Le formulaire sera automatiquement transformé en PDF.</li>
          <li>Envoyez-le à l’adresse suivante : <a href="mailto:exemple@univ.tn" className="text-blue-600 hover:underline font-semibold">[exemple@univ.tn]</a> afin que notre équipe puisse examiner votre demande.</li>
        </ul>

        <p className="text-red-600 font-semibold mb-6 p-3 bg-red-50 rounded-md border border-red-200">
          ⚠️ Toutes les demandes seront vérifiées attentivement afin de s’assurer qu’elles proviennent de personnes réellement dans le besoin.
        </p>

        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Formulaire de Demande</h2>
        <div ref={formRef} className="space-y-4">
          <div>
            <label htmlFor="nomComplet" className="block text-sm font-medium text-gray-700">Nom Complet <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="nomComplet"
              id="nomComplet"
              value={formData.nomComplet}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="nomEtablissement" className="block text-sm font-medium text-gray-700">Nom de l'établissement <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="nomEtablissement"
              id="nomEtablissement"
              value={formData.nomEtablissement}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone (Optionnel)</label>
            <input
              type="tel"
              name="telephone"
              id="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="typeAide" className="block text-sm font-medium text-gray-700">Type d'aide demandé <span className="text-red-500">*</span></label>
            <select
              name="typeAide"
              id="typeAide"
              value={formData.typeAide}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Sélectionnez un type d'aide</option>
              <option value="financiere">Aide Financière</option>
              <option value="alimentaire">Aide Alimentaire</option>
              <option value="logement">Aide au Logement</option>
              <option value="psychologique">Soutien Psychologique</option>
              <option value="materiel">Aide Matériel (Fournitures, Ordinateur, etc.)</option>
              <option value="autre">Autre (préciser ci-dessous)</option>
            </select>
          </div>
          <div>
            <label htmlFor="detailsDemande" className="block text-sm font-medium text-gray-700">Détails de la demande <span className="text-red-500">*</span></label>
            <textarea
              name="detailsDemande"
              id="detailsDemande"
              rows="5"
              value={formData.detailsDemande}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Décrivez en détail votre situation et pourquoi vous avez besoin de cette aide..."
              required
            ></textarea>
          </div>

          <button
            onClick={handleGeneratePdf}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Télécharger ma demande en PDF
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500 text-center">
          <span className="font-bold text-indigo-600">🔒 Sécurité et confidentialité :</span><br />
          Toutes les informations que vous fournissez sont strictement confidentielles et seront utilisées uniquement pour l’étude de votre demande. Nous respectons votre vie privée.
        </p>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Merci pour votre confiance.
        </p>
      </div>
    </div>
  );
}

export default Aide;