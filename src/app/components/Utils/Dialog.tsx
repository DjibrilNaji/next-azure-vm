"use client";
import { useAppContext } from "@/hooks/useAppContext";

const Dialog = () => {
  const { isDialogOpen, contentDialog, colorDialog } = useAppContext();

  return (
    <div
      className={`fixed top-24 right-2 w-fit bg-${colorDialog}-500 text-white p-2 rounded z-50 transition-all duration-300 ease-in-out transform ${
        isDialogOpen
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <p className="flex text-white">{contentDialog}</p>
    </div>
  );
};

export default Dialog;
