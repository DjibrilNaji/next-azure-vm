"use client";
import { useAppContext } from "@/hooks/useAppContext";
import { logout } from "@/services/connection";
import { CiLogout } from "react-icons/ci";

export default function Logout() {
  const { setDialog } = useAppContext();

  const handleLogout = async () => {
    await logout();
    setDialog("Vous êtes bien déconnecté !", 3000);
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
