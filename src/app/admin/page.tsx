"use client";

import { useAppContext } from "@/hooks/useAppContext";
import { redirect } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { roles } from "../utils/roles";

export default function Admin() {
  const { userLogged, setUserConnected } = useAppContext();

  if (!userLogged) {
    redirect("/login");
  }

  return (
    <div className="p-8 rounded-md">
      {roles.ADMIN === userLogged?.role && (
        <p className="text-white">
          Bienvenue {userLogged?.username}, tu es {userLogged?.role} !
        </p>
      )}
      {roles.EDITOR === userLogged?.role && (
        <p className="text-white">
          Bienvenue {userLogged?.username}, tu es {userLogged?.role} !
        </p>
      )}
      {roles.VIEWER === userLogged?.role && (
        <p className="text-white">
          Bienvenue {userLogged?.username}, tu es {userLogged?.role} !
        </p>
      )}

      <button
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 transition duration-300"
        onClick={() => setUserConnected(null)}
      >
        <CiLogout />
      </button>
    </div>
  );
}
