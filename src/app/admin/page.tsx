import Logout from "@/app/components/Auth/Logout";
import StartVM from "@/app/components/StartVM";
import { getToken, getValueByToken } from "@/app/utils/jwt";
import { routes } from "@/app/utils/routes";
import { redirect } from "next/navigation";

export default async function Admin() {
  const token = await getToken("token");

  if (!token) {
    redirect(routes.home());
  }

  const user = await getValueByToken("token");

  const vmAddress = await getValueByToken("vmAddressToken");

  if (vmAddress) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex justify-between items-center p-8 rounded-md gap-4">
          <h1 className="text-white font-bold text-xl">
            Bienvenue {user?.username}, tu es {user?.role} !
          </h1>

          <Logout />
        </div>

        <StartVM user={user} vmAddressToken={vmAddress} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center p-8 rounded-md gap-4">
        <h1 className="text-white font-bold text-xl">
          Bienvenue {user?.username}, tu es {user?.role} !
        </h1>

        <Logout />
      </div>

      <StartVM user={user} />
    </div>
  );
}
