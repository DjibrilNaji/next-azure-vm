"use client";
import { User } from "@/app/models/User";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<AppContextType>(null);

type AppContextType = {
  userLogged: User | null;
  setUserConnected: React.Dispatch<React.SetStateAction<User>>;
} | null;

export default function AppAuth({ children }: { children: React.ReactNode }) {
  const [userLogged, setUserConnected] = useState<User>(null);

  const AppContextValue: AppContextType = {
    userLogged,
    setUserConnected,
  };

  return (
    <AppContext.Provider value={AppContextValue}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }

  return context;
};
