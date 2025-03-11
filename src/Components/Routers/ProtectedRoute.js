// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../Pages/Register/UserContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext(); 
  const [redirect, setRedirect] = useState(false); 

  useEffect(() => {
    if (!user) {
      setRedirect(true); 
    }
  }, [user]);

  if (redirect) {
    return <Navigate to="/loginsignup" state={{ alertMessage: 'Please log in first to access the Products section.' }} />;
  }
  return children; 
};

export default ProtectedRoute;
