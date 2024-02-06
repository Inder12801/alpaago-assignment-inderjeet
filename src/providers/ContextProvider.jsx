import React, { createContext, useState, useContext } from "react";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Initial user data

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // Update user data on login
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null); // Reset user data on logout
  };

  // Add more context values and functions as needed

  const contextValue = {
    isLoggedIn,
    user,
    setUser,
    login,
    logout,
    // Add more context properties with their corresponding functions
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useMyContext must be used within a ContextProvider");
  }

  return context;
};
