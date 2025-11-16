"use client";
import { createContext, useState, ReactNode } from "react";

type authContextProps = {};

export const AuthContext = createContext<authContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  

  const contextValue = {
    
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
