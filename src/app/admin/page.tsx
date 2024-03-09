import Logout from "@/app/components/Auth/Logout";
import StartVM from "@/app/components/StartVM";
import { getToken } from "@/app/utils/jwt";
import { routes } from "@/app/utils/routes";
import { getUserByToken } from "@/services/connection";
import { redirect } from "next/navigation";

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
