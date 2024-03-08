"use client";
import { useAppContext } from "@/hooks/useAppContext";
import { logout } from "@/services/connection";
import { CiLogout } from "react-icons/ci";

export default function Logout() {
  const { setIsDialogOpen, setContentDialog } = useAppContext();

  const handleLogout = async () => {
    await logout();

    setIsDialogOpen(true);
    setContentDialog("Vous êtes bien déconnecté !");

    setTimeout(() => {
      setIsDialogOpen(false);
      setContentDialog("");
    }, 5000);
  };
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
      onClick={handleLogout}
    >
      <CiLogout />
    </button>
  );
}
