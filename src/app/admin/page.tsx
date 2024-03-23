import Logout from "@/components/Auth/Logout";
import StartVM from "@/components/StartVM";
import { checkAuth } from "@/services/connection";
import { getValueByToken } from "@/utils/jwt";

export default async function Admin() {
  await checkAuth("token");

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
