import {
  PhotoIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  LockClosedIcon,
  UserIcon,
  MapPinIcon,
  AcademicCapIcon,
  CakeIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Register() {
  const isAuth = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const [newuser, setnewuser] = useState({
    nom: "",
    prenom: "",
    cin: "",
    tel: "",
    email: "",
    password: "",
    gouvernorat: "",
    institut: "",
    age: "",
    niveau: "",
    adresse: "",
    code_postal: "",
    about: "",
    photo: null,
    role: "etudiant",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nom", newuser.nom);
    formData.append("prenom", newuser.prenom);
    formData.append("cin", newuser.cin);
    formData.append("tel", newuser.tel);
    formData.append("email", newuser.email);
    formData.append("password", newuser.password);
    formData.append("role", newuser.role);

    if (newuser.role === "etudiant") {
      formData.append("gouvernorat", newuser.gouvernorat || "");
      formData.append("institut", newuser.institut || "");
      formData.append("age", newuser.age || "");
      formData.append("niveau", newuser.niveau || "");
      formData.append("adresse", newuser.adresse || "");
      formData.append("code_postal", newuser.code_postal || "");
      formData.append("about", newuser.about || "");
      if (newuser.photo) {
        formData.append("photo", newuser.photo);
      }
    }

    try {
      const result = await axios.post(
        "https://pfe2025-api.vercel.app/user/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      Swal.fire({
        title: "Bien fait!",
        text: "Votre demande d'inscription a été envoyée à l'administrateur!",
        icon: "success",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      Swal.fire({
        title: "Erreur!",
        text:
          error?.response?.data?.msg ||
          "Une erreur s'est produite lors de l'inscription.",
        icon: "error",
      });
    }
  };

  return (
    <div className="isolate bg-gradient-to-tr from-blue-100 to-transparent px-6 py-16 sm:py-20 lg:px-8">
      <form
        className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-8 md:p-12 bg-white shadow-xl rounded-2xl border border-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8">
          {/* Section d'introduction */}
          <div className="border-b border-gray-900/10 pb-8">
            <h2 className="text-3xl font-bold text-indigo-700">
              Devenir membre
            </h2>
            <p className="mt-2 text-base text-gray-700">
              Pour l'inscription sur Binomy, veuillez remplir ce formulaire.
            </p>
          </div>

          {/* Section des informations personnelles */}
          <div className="border-b border-gray-900/10 pb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Informations personnelles
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              {/* Prénom */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Prénom
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <UserIcon
                      className="size-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="first-name"
                    name="prenom"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm pl-10"
                    onChange={(e) =>
                      setnewuser({ ...newuser, prenom: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Nom */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Nom
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <UserIcon
                      className="size-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="last-name"
                    name="nom"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm pl-10"
                    onChange={(e) =>
                      setnewuser({ ...newuser, nom: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* CIN */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="cin"
                  className="block text-sm font-medium text-gray-900"
                >
                  CIN
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IdentificationIcon
                      className="size-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="cin"
                    name="cin"
                    type="number"
                    autoComplete="off"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm pl-10"
                    onChange={(e) =>
                      setnewuser({ ...newuser, cin: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="tel"
                  className="block text-sm font-medium text-gray-900"
                >
                  Téléphone
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <PhoneIcon
                      className="size-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm pl-10"
                    onChange={(e) =>
                      setnewuser({ ...newuser, tel: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <EnvelopeIcon
                      className="size-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm pl-10"
                    onChange={(e) =>
                      setnewuser({ ...newuser, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Rôle */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-900"
                >
                  Rôle
                </label>
                <div className="mt-1 relative">
                  <select
                    id="role"
                    name="role"
                    autoComplete="role"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm"
                    onChange={(e) =>
                      setnewuser({ ...newuser, role: e.target.value })
                    }
                    required
                    value={newuser.role}
                  >
                    <option value="" disabled>
                      -- Choisissez un rôle --
                    </option>
                    <option value="etudiant">Étudiant</option>
                    <option value="bailleur">Bailleur</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 mr-2 size-5 self-center text-gray-500 sm:size-4"
                  />
                </div>
              </div>

              {/* Champs spécifiques à l'étudiant et la photo */}
              {newuser.role === "etudiant" && (
                <>
                  <div className="sm:col-span-4 grid grid-cols-1 gap-y-6">
                    {/* Gouvernorat */}
                    <div className="col-span-full">
                      <label
                        htmlFor="gouvernorat"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Gouvernorat
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MapPinIcon
                            className="size-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <select
                          id="gouvernorat"
                          name="gouvernorat"
                          autoComplete="country-name"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-10 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm"
                          onChange={(e) =>
                            setnewuser({
                              ...newuser,
                              gouvernorat: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="" disabled selected>
                            -- Choisissez votre gouvernorat --
                          </option>
                          <option value="Tunis">Tunis</option>
                          <option value="Ben Arous">Ben Arous</option>
                          <option value="Ariana">Ariana</option>
                          <option value="Mannouba">Mannouba</option>
                          <option value="Nabeul">Nabeul</option>
                          <option value="Monastir">Monastir</option>
                          <option value="Mednine">Mednine</option>
                          <option value="Bizerte">Bizerte</option>
                          <option value="Gabes">Gabes</option>
                          <option value="Beja">Beja</option>
                          <option value="Tataouine">Tataouine</option>
                          <option value="Zaghouan">Zaghouan</option>
                          <option value="Kasserine">Kasserine</option>
                          <option value="Jendouba">Jendouba</option>
                          <option value="Siliana">Siliana</option>
                          <option value="Sidi Bouzid">Sidi Bouzid</option>
                          <option value="Kef">Kef</option>
                          <option value="Kairouan">Kairouan</option>
                          <option value="Mahdia">Mahdia</option>
                          <option value="Gafsa">Gafsa</option>
                          <option value="Tozeur">Tozeur</option>
                          <option value="Gbelli">Gbelli</option>
                          <option value="Sfax">Sfax</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 right-0 mr-2 size-5 self-center text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>

                    {/* Institut */}
                    <div className="col-span-full">
                      <label
                        htmlFor="institut"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Institut
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <BuildingOffice2Icon
                            className="size-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <select
                          id="institut"
                          name="institut"
                          autoComplete="organization"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-10 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm"
                          onChange={(e) =>
                            setnewuser({ ...newuser, institut: e.target.value })
                          }
                          required
                        >
                          <option value="" disabled selected>
                            -- Choisissez votre institut --
                          </option>
                          <option value="Institut supérieur de gestion">
                            Institut supérieur de gestion
                          </option>
                          <option value="Institut supérieur des langues">
                            Institut supérieur des langues
                          </option>
                          <option value="Institut supérieur des sciences et technologies">
                            Institut supérieur des sciences et technologies
                          </option>
                          <option value="Institut supérieur des etudes juridiques">
                            Institut supérieur des études juridiques
                          </option>
                          <option value="Faculté des sciences">
                            Faculté des sciences
                          </option>
                          <option value="Ecole nationale d'ingenieurs">
                            École nationale d'ingénieurs
                          </option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 right-0 mr-2 size-5 self-center text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>

                    {/* Niveau d'études */}
                    <div className="col-span-full">
                      <label
                        htmlFor="niveau"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Niveau d'études
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <AcademicCapIcon
                            className="size-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <select
                          id="niveau"
                          name="niveau"
                          autoComplete="off"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-10 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm"
                          onChange={(e) =>
                            setnewuser({ ...newuser, niveau: e.target.value })
                          }
                          required
                        >
                          <option value="" disabled selected>
                            -- Sélectionnez votre niveau d'études --
                          </option>
                          <option value="Licence">Licence</option>
                          <option value="Master">Master</option>
                          <option value="Doctorat">Doctorat</option>
                          <option value="Ingeniorat">Ingénierie</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 right-0 mr-2 size-5 self-center text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>

                    {/* Age */}
                    <div className="col-span-full">
                      <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Age
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <CakeIcon
                            className="size-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="age"
                          name="age"
                          type="number"
                          autoComplete="off"
                          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm pl-10"
                          onChange={(e) =>
                            setnewuser({ ...newuser, age: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* Adresse */}
                    <div className="col-span-full">
                      <label
                        htmlFor="adresse"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Adresse
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MapPinIcon
                            className="size-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="adresse"
                          name="adresse"
                          type="text"
                          autoComplete="street-address"
                          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm pl-10"
                          onChange={(e) =>
                            setnewuser({ ...newuser, adresse: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* Code Postal */}
                    <div className="col-span-full">
                      <label
                        htmlFor="code_postal"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Code Postal
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MapPinIcon
                            className="size-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="code_postal"
                          name="code_postal"
                          type="number"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm pl-10"
                          onChange={(e) =>
                            setnewuser({
                              ...newuser,
                              code_postal: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Zone de téléchargement de photo */}
                  <div className="sm:col-span-2 flex flex-col items-center justify-center pt-6">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium text-gray-900 mb-1"
                    >
                      Photo de profil
                    </label>
                    <div className="flex justify-center rounded-lg border-2 border-dashed border-indigo-300 bg-indigo-50 px-4 py-8 hover:border-indigo-500 hover:bg-indigo-100 transition-colors duration-200 w-full text-center">
                      <div className="text-center">
                        <PhotoIcon
                          aria-hidden="true"
                          className="mx-auto size-14 text-indigo-400"
                        />
                        <div className="mt-3 flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-700 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-900"
                          >
                            <span>Télécharger</span>
                            <input
                              id="file-upload"
                              name="photo"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) =>
                                setnewuser({
                                  ...newuser,
                                  photo: e.target.files[0],
                                })
                              }
                            />
                          </label>
                          <p className="pl-1">ou glissez-déposez</p>
                        </div>
                        <p className="text-xs text-gray-600">
                          PNG, JPG, JPEG jusqu'à 10MB
                        </p>
                        {newuser.photo && (
                          <p className="mt-2 text-sm text-indigo-600">
                            Fichier sélectionné : {newuser.photo.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Mot de passe */}
              <div className="col-span-full">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Mot de passe
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LockClosedIcon
                      className="size-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm pl-10"
                    onChange={(e) =>
                      setnewuser({ ...newuser, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section "À propos" (pour étudiant ) */}
        {newuser.role === "etudiant" && (
          <div className="col-span-full mt-6">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-900"
            >
              À propos
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserCircleIcon
                  className="size-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 sm:text-sm pl-10"
                defaultValue={""}
                onChange={(e) =>
                  setnewuser({ ...newuser, about: e.target.value })
                }
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Écrivez quelques phrases sur vous.
            </p>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="mt-6 flex items-center justify-end gap-x-4">
          <button
            type="reset"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600 transition-colors duration-200"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
