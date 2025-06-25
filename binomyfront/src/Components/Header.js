import { Fade, Zoom } from "react-awesome-reveal";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './redux/postSlice';
import { useEffect, useState } from 'react';

function Header({ user }) {
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.post?.postList || []);
  const currentUser = user;

  const handleClick = () => {
    navigate('/communaute');
  };

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter((post) =>
    post.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-cyan-50 min-h-screen">
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20">
        <div className="md:w-1/2 space-y-6 text-center md:text-left" style={{ marginLeft: "5%" }}>
          <Zoom triggerOnce>
            <h1 className="text-5xl font-bold text-sky-900 leading-tight">Trouvez un logement étudiant</h1>
          </Zoom>
          <p className="text-lg text-gray-600 max-w-xl">
            Un réseau social tunisien pour les étudiants universitaires à la recherche de foyers universitaires, studios ou appartements en colocation.
          </p>
          <button
            onClick={handleClick}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl shadow-md transition duration-300"
          >
            Rechercher
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img
            src="assets/b2.png"
            alt="Colocation illustration"
            className="w-full max-w-md h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      <div className="bg-cyan-100 py-4 text-center">
        <h2 className="text-4xl font-bold italic text-cyan-500 animate-pulse font-cursive">
          🎓 Bienvenue sur Binomy !
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 bg-cyan-50 p-8 rounded-xl shadow-xl max-w-5xl mx-auto mt-12">
        <img
          src="assets/student-avatar.png"
          alt="Étudiant"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-cyan-300"
        />
        <div className="bg-white border border-cyan-200 p-6 rounded-xl shadow-md text-gray-800 text-lg leading-relaxed">
          😊 Simplifiez votre recherche de logement étudiant en vous connectant avec d'autres étudiants à la recherche d’une colocation 🏠. 📌 Découvrez les foyers universitaires disponibles et publiez vos annonces de location pour trouver votre binôme 🤝 !
        </div>
      </div>

      <div className="bg-white mt-20">
        <div className="mx-auto max-w-7xl py-24 px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl rounded-3xl lg:flex lg:gap-x-20 lg:px-24">
            <Fade cascade damping={0.4} direction='up' triggerOnce={true}>
              <div className="max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  La colocation parfaite t'attend. Rejoins-nous !
                </h2>
                <p className="mt-6 text-lg text-gray-300">
                  Simplifie ta recherche de colocataire avec notre app intelligente. Plus de stress, juste des rencontres adaptées !
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  {isAuth ? (
                    <Link to="/profile">
                      <span className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow hover:bg-gray-100">
                        Devenir membre
                      </span>
                    </Link>
                  ) : (
                    <Link to="/register">
                      <span className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow hover:bg-gray-100">
                        Devenir membre
                      </span>
                    </Link>
                  )}
                  <Link to="/about">
                    <span className="text-sm font-semibold text-white">
                      A propos de nous →
                    </span>
                  </Link>
                </div>
              </div>
            </Fade>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                alt="Trouve ton binôme parfait"
                src="assets/st.webp"
                className="w-full max-w-lg mx-auto rounded-md object-contain"
              />
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default Header;