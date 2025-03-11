import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useLog = () => {
  const location = useLocation().pathname;

  useState(() => {
    console.log("====================================");
    console.log("Route", location);
    console.log("====================================");
  }, [location]);
};
