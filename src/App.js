import React from "react";
import { useRoutes } from "react-router-dom";
import { UserProvider } from "./Components/Pages/Register/UserContext";
import "./Components/Styles/Reset.css";
import NavBar from "./Components/Common/NavBar/NavBar";
import Routes from "./Components/Routers/Routes";
import Footer from "./Components/Common/Footer/Footer";

import { useLog } from "./Hooks/LogHook";

export default function App() {
  let router = useRoutes(Routes);
  useLog();

  return (
    <UserProvider>
      <NavBar />
      {router}
      <Footer />
    </UserProvider>
  );
}
