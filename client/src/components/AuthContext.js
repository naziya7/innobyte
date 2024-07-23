import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Implement login logic, set user in state
    setUser(userData);
  };

  const logout = () => {
    // Implement logout logic, clear user from state
    setUser(null);
  };

  const register = (userData) => {
    // Implement registration logic
    setUser(userData); // Example: assuming registration sets user data and logs in automatically
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
