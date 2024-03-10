"use client";

import { useAppContext } from "@/hooks/useAppContext";
import { createCookie, createVM } from "@/services/connection";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { tokenStatus } from "../data/tokenStatus";
import { VmAddressToken } from "../models/User";
import VmField from "./VM/VmField";

export default function StartVM({
  user,
  vmAddressToken,
}: {
  user: any;
  vmAddressToken?: any;
}) {
  const [vmAddress, setVmAddress] = useState<VmAddressToken>(vmAddressToken);
  const { setDialog } = useAppContext();

  const lauchVmCreation = async () => {
    await createCookie("vmAddressToken", { status: tokenStatus.WAITING });
    setVmAddress({ status: tokenStatus.WAITING });

    const getVmAddress = await createVM();

    await createCookie("vmAddressToken", {
      address: getVmAddress,
      status: tokenStatus.FINISH,
    });
    setVmAddress({
      address: getVmAddress,
      status: tokenStatus.FINISH,
    });

    // setTimeout(() => {
    //   logout();
    //   setDialog(
    //     "Votre VM a été supprimé, vous êtes maintenant déconnecté.",
    //     6000
    //   );
    // }, 1000);
  };

  return (
    <div className="flex flex-col justify-center gap-4 m-auto">
      {vmAddress?.status === tokenStatus.WAITING ? (
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex gap-2 bg-blue-500 text-white p-2 rounded w-fit">
            <FaSpinner className="animate-spin h-6 w-6 mx-auto text-white" />
            <p className="flex text-white">Votre VM est en cours de création</p>
          </div>
          <p className="flex text-white max-w-80 text-center">
            Ne vous déconnecté pas sinon vous ne pourrez pas récupérer les
            informations de connexion pour votre VM.
          </p>
        </div>
      ) : vmAddress &&
        "address" in vmAddress &&
        vmAddress.status === tokenStatus.FINISH ? (
        <div className="flex flex-col bg-white px-10 py-8 rounded-xl gap-8">
          <h1 className="text-center font-bold text-xl">
            Pour accéder à la VM
          </h1>

          <VmField
            value={"ssh notadmin@" + vmAddress.address}
            id="address"
            title="Commande"
          />
          <VmField value="Pa$$w0rd92" id="password" title="Mot de passe" />

          <h2 className="text-red-500 font-semibold">
            La VM s&apos;autodétruira 10min après sa création et vous serez
            deconnecté automatiquement
          </h2>
        </div>
      ) : (
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 p-6 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={lauchVmCreation}
        >
          Démarrer une VM
        </button>
      )}
    </div>
  );
}
