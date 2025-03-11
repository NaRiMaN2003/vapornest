import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Brands from '../Pages/Brands/Brands';
import LoginSignUp from '../Pages/Register/LoginSignUp';
import Products from '../Pages/Store/Products';
import About from '../Pages/About/About';
import ProtectedRoute from './ProtectedRoute';

let routes = [
    { path: '/', element: <Navigate to="/home" /> },
    { path: '/home', element: <Home /> },
    { path: '/brands', element: <Brands /> },
    { path: '/loginsignup', element: <LoginSignUp /> },
    { path: "/products", element: <ProtectedRoute><Products /></ProtectedRoute> },
    { path: '/about', element: <About /> },
    
];

export default routes;
