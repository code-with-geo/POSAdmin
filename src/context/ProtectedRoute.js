import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }) => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const token = cookies.access_token;
  console.log(token);
  const isTokenValid = () => {
    if (!token) return false;

    try {
      const { exp } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return exp > currentTime;
    } catch {
      return false;
    }
  };

  return isTokenValid() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
