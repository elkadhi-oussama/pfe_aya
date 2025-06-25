import React from 'react';
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuth = localStorage.getItem("token");
    // return isAuth? <Outlet/> : <Navigate to="/login"/>;
    return isAuth? children : <Navigate to="/signin" />;
}

export default PrivateRoute ; 