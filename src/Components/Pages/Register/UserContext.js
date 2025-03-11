import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error'); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser); 
    }
  }, []);

  const loginUser = (userName) => {
    setUser(userName);
    localStorage.setItem('user', userName); 
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const showAlert = (message, severity = 'error') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setTimeout(() => {
      setAlertMessage(''); 
    }, 3000);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, showAlert, alertMessage, alertSeverity }}>
      {children}
    </UserContext.Provider>
  );
};
