"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<AppContextType>(null);

type AppContextType = {
  test: string;
} | null;

export default function AppAuth({ children }: { children: React.ReactNode }) {
  const [test, setTest] = useState("Hello");

  const AppContextValue: AppContextType = {
    test,
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
