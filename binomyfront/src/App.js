import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbarr from './Components/Navbarr';
import About from './Components/About';
import Home from './Components/Home';
import Contact from './Components/Contact';
import Pubs from './Components/Pubs';
import Register from './Components/Register';
import Footer from './Components/Footer';
import UserProfile from './Components/UserProfile';
import PrivateRoute from './Components/route/PrivateRoute';
import Signin from './Components/Signin';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getusers } from './Components/redux/usersSlice';
import { userCurrent } from './Components/redux/userSlice';
import Community from './Components/Community';
import MemberProfile from './Components/MemberProfile';
import Chatroom from './Components/Chatroom';
import Conversations from './Components/Conversations';
import LocationDetails from './Components/LocationDetails';
import MyOffers from './Components/MyOffers';
import MesOffres from './Components/MesOffres';
import AdminDashboard from './Components/AdminDashboard';
import AdminEtudiants from './Components/AdminEtudiants';
import AdminBailleurs from './Components/AdminBailleurs';
import AdminOffres from './Components/AdminOffres';
import AdminPublications from './Components/AdminPublications';
import Aide from './Components/aide';
import { Toaster } from 'react-hot-toast'; // alert de supp disc


function App() {
  const dispatch = useDispatch();
  const [ping, setping] = useState(false);
  useEffect(() => {
    dispatch(getusers());
    dispatch(userCurrent());
  }, [ping])

  const user_connected = JSON.parse(localStorage.getItem("user_connected"));

  return (
    <div className="flex flex-col min-h-screen">
    {/* AJOUTÉ : Le composant Toaster pour afficher les notifications */}
    <Toaster position="bottom-center" reverseOrder={false} />

    <Navbarr user={user_connected}/>

    {/* Le contenu qui grandit */}
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home user={user_connected} />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="actualites" element={<Pubs user={user_connected}/>} />
        <Route path="register" element={<Register />} />
        <Route path="signin" element={<Signin />} />
        <Route path="profile" element={<PrivateRoute><UserProfile user={user_connected}/></PrivateRoute>} />
        <Route path="memberProfile/:id" element={<PrivateRoute><MemberProfile user={user_connected}/></PrivateRoute>} />
        <Route path="communaute" element={<PrivateRoute><Community user={user_connected}/></PrivateRoute>} />
        <Route path="/chat/:roomId" element={<PrivateRoute><Chatroom user={user_connected}/></PrivateRoute>} />
        <Route path="/conversations" element={<PrivateRoute><Conversations user={user_connected}/></PrivateRoute>} />
        <Route path="offredetails/:id" element={<PrivateRoute><LocationDetails user={user_connected}/></PrivateRoute>} />
        <Route path="offres" element={<PrivateRoute><MyOffers user={user_connected}/></PrivateRoute>} />
        <Route path="mesoffres" element={<PrivateRoute><MesOffres user={user_connected}/></PrivateRoute>} />
        <Route path="dashboard" element={<PrivateRoute><AdminDashboard user={user_connected}/></PrivateRoute>} />
        <Route path="/admin/etudiants" element={<AdminEtudiants />} />
        <Route path="/admin/bailleurs" element={<PrivateRoute><AdminBailleurs /></PrivateRoute>} />
        <Route path="/admin/publications" element={<PrivateRoute><AdminPublications /></PrivateRoute>} />
        <Route path="/admin/offres" element={<PrivateRoute><AdminOffres /></PrivateRoute>} />
        <Route path="aide-sociale" element={<Aide />} />

      </Routes>
    </main>

    <Footer />
    </div>
  );
}

export default App;