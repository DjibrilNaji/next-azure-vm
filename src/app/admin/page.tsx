import { getToken, getUserByToken } from "@/services/connection";
import { redirect } from "next/navigation";
import Logout from "../components/Logout";
import StartVM from "../components/StartVM";
import { routes } from "../utils/routes";

export default async function Admin() {
  const token = await getToken();

  if (!token) {
    redirect(routes.home());
  }

  const user = await getUserByToken();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center p-8 rounded-md gap-4">
        <h1 className="text-white font-bold text-xl">
          Bienvenue {user?.username}, tu es {user?.role} !
        </h1>

        <Logout />
      </div>

      <StartVM />
    </div>
  );
}
