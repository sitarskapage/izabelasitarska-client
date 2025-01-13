import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useIsHome() {
  const location = useLocation();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => setIsHome(location.pathname == "/"), [location.pathname]);

  return isHome;
}
