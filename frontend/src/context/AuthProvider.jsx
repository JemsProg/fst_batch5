import { createContext, use, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsAuthenticated(!!token);
    setIsLoading(false);
    console.log(isAuthenticated);
  }, [location]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
