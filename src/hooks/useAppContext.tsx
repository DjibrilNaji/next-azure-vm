"use client";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<AppContextType>(null);

type AppContextType = {
  isDialogOpen: boolean;
  contentDialog: string;
  setDialog: (content: string, time: number) => void;
} | null;

export default function AppAuth({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<string>("");

  const setDialog = (content: string, time: number) => {
    setContentDialog(content);
    setIsDialogOpen(true);

    setTimeout(() => {
      setContentDialog("");
      setIsDialogOpen(false);
    }, time);
  };

  const AppContextValue: AppContextType = {
    isDialogOpen,
    contentDialog,
    setDialog,
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
