"use client";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<AppContextType>(null);

type AppContextType = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contentDialog: string;
  setContentDialog: React.Dispatch<React.SetStateAction<string>>;
} | null;

export default function AppAuth({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<string>("");

  const AppContextValue: AppContextType = {
    isDialogOpen,
    setIsDialogOpen,
    contentDialog,
    setContentDialog,
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
