import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/login",
        formData,
        { withCredentials: true }
      );
      console.log("Server response:", response.data);
      if (response.data.success) {
        const userData = response.data.user;
        if (userData) {
          setUser(userData);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userName", userData.username);
        } else {
          console.error("Login error: User data is missing in the response");
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
  };

  const register = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/register",
        formData,
        { withCredentials: true }
      );
      console.log("Server response:", response.data); 
      if (response.data.success) {
        const userData = response.data.user;
        if (userData) {
          setUser(userData);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userName", userData.username);
        } else {
          console.error(
            "Registration error: User data is missing in the response"
          );
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (userLoggedIn) {
      const storedUserName = localStorage.getItem("userName");
      setUser({ username: storedUserName });
    }
  }, []);
 

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
