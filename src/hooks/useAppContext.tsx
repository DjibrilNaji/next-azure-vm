"use client";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<AppContextType>(null);

type AppContextType = {
  isDialogOpen: boolean;
  contentDialog: string;
  colorDialog: string;
  setDialog: (content: string, color: string, time: number) => void;
} | null;

export default function AppAuth({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<string>("");
  const [colorDialog, setColorDialog] = useState<string>("");

  const setDialog = (content: string, color: string, time: number) => {
    setContentDialog(content);
    setColorDialog(color);
    setIsDialogOpen(true);

    setTimeout(() => {
      setContentDialog("");
      setColorDialog("");
      setIsDialogOpen(false);
    }, time);
  };

  const AppContextValue: AppContextType = {
    isDialogOpen,
    contentDialog,
    colorDialog,
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
