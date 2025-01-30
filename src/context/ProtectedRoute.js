import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const isTokenValid = () => {
    if (!token) return false;

    try {
      const { exp } = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Get the current time in seconds
      console.log("Token exp:", exp);
      console.log("Current UTC time:", currentTime);

      // Check if token is expired
      if (exp <= currentTime) {
        console.log("Token is expired");
        return false;
      } else {
        console.log("Token is valid");
        return true;
      }
    } catch (error) {
      console.error("Token decoding error:", error);
      return false;
    }
  };

  return isTokenValid() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
