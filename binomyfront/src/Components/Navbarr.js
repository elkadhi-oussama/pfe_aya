import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon, // Pour Accueil
  InformationCircleIcon, // Pour A propos
  EnvelopeIcon, // Pour Contact
  NewspaperIcon, // Pour Actualités
  UsersIcon, // For Communauté
  ChatBubbleLeftRightIcon, // Pour Messages
  HomeModernIcon, // Pour Offres de location
  UserIcon, // Pour Se connecter (déjà présent pour l'icône de profil)
  UserPlusIcon, // Pour S'inscrire
  LifebuoyIcon, // Icône pour Aide sociale (exemple, j'ai choisi celle-ci)
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./redux/userSlice"; // Assurez-vous que ce chemin est correct

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbarr({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const current = JSON.parse(localStorage.getItem("user_connected"));
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const baseNavigation = [
    { name: "Accueil", href: "/", current: false, icon: HomeIcon },
    {
      name: "A propos",
      href: "about",
      current: false,
      icon: InformationCircleIcon,
    },
    { name: "Contact", href: "contact", current: false, icon: EnvelopeIcon },
    {
      name: "Actualités",
      href: "actualites",
      current: false,
      icon: NewspaperIcon,
    },
  ];

  const privateNavigation =
    current?.role === "etudiant" || current?.role === "bailleur"
      ? [
          {
            name: "Communauté",
            href: "communaute",
            current: false,
            icon: UsersIcon,
          },
          {
            name: "Messages",
            href: "conversations",
            current: false,
            icon: ChatBubbleLeftRightIcon,
          },
          {
            name: "Offres de location",
            href: "offres",
            current: false,
            icon: HomeModernIcon,
          },
        ]
      : [];

  let navigation = [];

  // Determine navigation links based on authentication status and user role
  if (isAuthenticated && current?.role !== "admin") {
    // User is authenticated and not an admin
    navigation = [...baseNavigation, ...privateNavigation];
  } else if (current?.role === "admin") {
    // Admin user has no regular navigation links
    navigation = [];
  } else {
    // User is NOT authenticated
    navigation = [...baseNavigation];
    // Add "Aide sociale" only if the user is not authenticated
    navigation.push({
      name: "Aide sociale",
      href: "aide-sociale",
      current: false,
      icon: LifebuoyIcon,
    });
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className="block h-6 w-6 group-data-open:hidden"
                aria-hidden="true"
              />
              <XMarkIcon
                className="hidden h-6 w-6 group-data-open:block"
                aria-hidden="true"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/">
                <img
                  src="assets/b1.png"
                  alt="Binomy logo"
                  className="h-10 w-auto"
                  style={{ width: "150px", height: "60px" }}
                />
              </Link>
            </div>

            {/* Desktop navigation links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 h-16 items-center">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                      "rounded-md px-3 py-2 text-sm font-medium flex items-center",
                      "font-bold",
                      "transition-colors duration-300"
                    )}
                    style={{
                      fontFamily: "'Comic Sans MS', cursive",
                      fontSize: "0.8rem",
                      letterSpacing: "1px",
                    }}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.icon && (
                      <item.icon
                        className="mr-2 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                    {item.name}
                  </Link>
                ))}
                {current?.role === "admin" && (
                  <Link
                    to="/dashboard"
                    className={classNames(
                      "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                      "rounded-md px-3 py-2 text-sm font-medium flex items-center",
                      "font-bold",
                      "transition-colors duration-300"
                    )}
                    style={{
                      fontFamily: "'Comic Sans MS', cursive",
                      fontSize: "0.8rem",
                      letterSpacing: "1px",
                    }}
                  >
                    Paramètres
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right section of the navbar (login, register, profile, logout) */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-2">
            {!isAuthenticated && (
              <>
                {/* Sign In button */}
                <Link
                  to="/signin"
                  className={classNames(
                    "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                    "rounded-md px-3 py-2 text-sm font-medium flex items-center",
                    "font-bold",
                    "transition-colors duration-300"
                  )}
                  style={{
                    fontFamily: "'Comic Sans MS', cursive",
                    fontSize: "0.8rem",
                    letterSpacing: "1px",
                  }}
                >
                  <UserIcon
                    className="mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  Se connecter
                </Link>
                {/* Register button */}
                <Link
                  to="/register"
                  className={classNames(
                    "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                    "rounded-md px-3 py-2 text-sm font-medium flex items-center",
                    "font-bold",
                    "transition-colors duration-300"
                  )}
                  style={{
                    fontFamily: "'Comic Sans MS', cursive",
                    fontSize: "0.8rem",
                    letterSpacing: "1px",
                  }}
                >
                  <UserPlusIcon
                    className="mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  S'inscrire
                </Link>
              </>
            )}

            {/* Profile picture if authenticated and not admin */}
            {isAuthenticated && current?.role !== "admin" && (
              <Link to="profile">
                <img
                  src={
                    user?.photo
                      ? `https://pfe-aya.onrender.com/files/${user.photo}`
                      : "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67338d48953975001dd4b439.png"
                  }
                  alt="Profil"
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
              </Link>
            )}

            {/* Logout button if authenticated */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className={classNames(
                  "bg-red-100 hover:bg-red-200 text-red-700",
                  "rounded-md px-3 py-2 text-sm font-medium flex items-center",
                  "font-bold",
                  "transition-colors duration-300"
                )}
                style={{
                  fontFamily: "'Comic Sans MS', cursive",
                  fontSize: "0.8rem",
                  letterSpacing: "1px",
                }}
              >
                Déconnexion
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden bg-white">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className={classNames(
                item.current
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                "block rounded-md px-3 py-2 text-base font-medium flex items-center"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.icon && (
                <item.icon
                  className="mr-2 h-6 w-6 text-gray-500"
                  aria-hidden="true"
                />
              )}
              {item.name}
            </DisclosureButton>
          ))}
          {current?.role === "admin" && (
            <DisclosureButton
              as={Link}
              to="/dashboard"
              className={classNames(
                "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                "block rounded-md px-3 py-2 text-base font-medium flex items-center"
              )}
            >
              Paramètres
            </DisclosureButton>
          )}
          {!isAuthenticated && (
            <>
              <DisclosureButton
                as={Link}
                to="/signin"
                className={classNames(
                  "text-gray-700 hover:bg-gray-50 hover:hover:bg-gray-50 hover:text-gray-900",
                  "block rounded-md px-3 py-2 text-base font-medium flex items-center"
                )}
              >
                <UserIcon
                  className="mr-2 h-6 w-6 text-gray-500"
                  aria-hidden="true"
                />
                Se connecter
              </DisclosureButton>
              <DisclosureButton
                as={Link}
                to="/register"
                className={classNames(
                  "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                  "block rounded-md px-3 py-2 text-base font-medium flex items-center"
                )}
              >
                <UserPlusIcon
                  className="mr-2 h-6 w-6 text-gray-500"
                  aria-hidden="true"
                />
                S'inscrire
              </DisclosureButton>
            </>
          )}
          {isAuthenticated && (
            <DisclosureButton
              as="button"
              onClick={handleLogout}
              className={classNames(
                "block w-full text-left px-3 py-2 text-base font-bold rounded-md transition duration-300",
                "text-red-700 hover:text-red-900"
              )}
              style={{
                fontFamily: "'Comic Sans MS', cursive",
                letterSpacing: "1px",
              }}
            >
              Déconnexion
            </DisclosureButton>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Navbarr;
