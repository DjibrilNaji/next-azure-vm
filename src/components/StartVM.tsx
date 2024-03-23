"use client";
import { vms } from "@/datas/vms";
import { useAppContext } from "@/hooks/useAppContext";
import { createCookie, createVM, deleteCookie } from "@/services/connection";
import { startDelete } from "@/services/manage-vm";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { roles } from "../datas/roles";
import { tokenStatus } from "../datas/tokenStatus";
import { User, VmAddressToken } from "../models/User";
import { Vm } from "../models/Vm";
import VmCard from "./VM/VmCard";
import VmField from "./VM/VmField";

export default function StartVM({
  user,
  vmAddressToken,
}: {
  user: User;
  vmAddressToken?: any;
}) {
  const [vmAddress, setVmAddress] = useState<VmAddressToken>(vmAddressToken);
  const { setDialog } = useAppContext();

  const createCookieAndSetAddress = async (
    value: VmAddressToken,
    deleteVm: boolean = false
  ) => {
    await createCookie("vmAddressToken", value);
    setVmAddress(value);

    if (deleteVm) {
      await startDelete();
      await deleteCookie("vmAddressToken");

      setVmAddress({} as VmAddressToken);
      setDialog("La Vm a bien été supprimée", "red", 4000);
    }
  };

  const lauchVmCreation = async (vm: Vm, wds: boolean = false) => {
    await createCookieAndSetAddress({ status: tokenStatus.WAITING });

    const getVmAddress = await createVM(vm.publisher, vm.offer, vm.sku);

    if (!getVmAddress) {
      await createCookieAndSetAddress({ status: tokenStatus.ERROR }, true);
      return;
    }

    createCookieAndSetAddress({
      address: getVmAddress,
      status: tokenStatus.FINISH,
      wds,
    });

    const timeout = setTimeout(async () => {
      await createCookieAndSetAddress({ status: tokenStatus.DELETING }, true);
    }, 600000);

    return () => clearTimeout(timeout);
  };

  return (
    <div className="flex flex-col justify-center gap-4 m-auto">
      {vmAddress?.status === tokenStatus.WAITING ? (
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex gap-2 bg-green-500 text-white p-2 rounded w-fit">
            <ImSpinner9 className="animate-spin h-6 w-6 mx-auto text-white" />
            <p className="flex text-white">Votre VM est en cours de création</p>
          </div>
          <p className="flex text-white text-center max-w-96">
            Ne vous déconnecté pas pour ne pas perdre les informations de
            connexion pour votre VM.
          </p>
        </div>
      ) : vmAddress &&
        "address" in vmAddress &&
        vmAddress.status === tokenStatus.FINISH ? (
        <div className="flex flex-col bg-white px-10 py-8 rounded-xl gap-8">
          <h1 className="text-center font-bold text-xl">
            Pour accéder à la VM
          </h1>

          {vmAddress.wds && (
            <VmField
              value={vmAddress.address || ""}
              id="windowsName"
              title="Valeur a mettre dans PC Name"
            />
          )}

          <VmField
            value={vmAddress.wds ? "notadmin" : "ssh " + vmAddress.address}
            id="address"
            title={
              vmAddress.wds
                ? "Valeur a mettre dans 'Nom d'utilisateur'"
                : "Commande pour se connecter en SSH"
            }
          />
          <VmField
            value="Pa$$w0rd92"
            id="password"
            title={
              vmAddress.wds
                ? "Valeur a mettre dans 'Mot de passe'"
                : "Mot de passe"
            }
          />

          <h2 className="text-center text-red-500 font-semibold">
            La VM s&apos;autodétruira 10min après sa création.
          </h2>
        </div>
      ) : vmAddress?.status === tokenStatus.DELETING ? (
        <div className="flex flex-col bg-white px-10 py-8 rounded-xl gap-2">
          <h1 className="text-center font-bold text-xl">
            Cela fait maintenant 10min que vous avez créé votre VM.
          </h1>
          <h2 className="text-center">
            La VM est donc en cours de suppression...
          </h2>
          <ImSpinner9 className="animate-spin h-6 w-6 mx-auto text-black" />
        </div>
      ) : vmAddress?.status === tokenStatus.ERROR ? (
        <div className="flex flex-col bg-white px-10 py-8 rounded-xl gap-2">
          <h1 className="text-center font-bold text-xl text-red-500">
            Une erreur est survenue lors de la création de la VM.
          </h1>
          <h2 className="text-center pb-2">
            Veuillez patienter... et réessayer
          </h2>
          <ImSpinner9 className="animate-spin h-6 w-6 mx-auto text-black" />
        </div>
      ) : user?.role === roles.VIEWER ? (
        <p className="text-white">
          Vous n&apos;avez aucun crédit pour démarrer une VM
        </p>
      ) : user?.role === roles.EDITOR ? (
        <VmCard vm={vms[0]} lauchVmCreation={lauchVmCreation} />
      ) : (
        <div className="flex flex-col md:flex-row gap-10">
          {vms.map((vm, index) => (
            <VmCard key={index} vm={vm} lauchVmCreation={lauchVmCreation} />
          ))}
        </div>
      )}
    </div>
  );
}
