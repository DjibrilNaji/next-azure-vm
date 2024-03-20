"use client";
import { useAppContext } from "@/hooks/useAppContext";
import { createCookie, createVM, deleteCookie } from "@/services/connection";
import { startDelete } from "@/services/manage-vm";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import vms from "../../../public/datas/vms.json";
import { roles } from "../data/roles";
import { tokenStatus } from "../data/tokenStatus";
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

  const lauchVmCreation = async (vm: Vm, wds: boolean = false) => {
    await createCookie("vmAddressToken", { status: tokenStatus.WAITING });
    setVmAddress({ status: tokenStatus.WAITING });

    const getVmAddress = await createVM(vm.publisher, vm.offer, vm.sku);

    if (!getVmAddress) {
      await startDelete();
      await deleteCookie("vmAddressToken");
      location.reload();
      return;
    }

    await createCookie("vmAddressToken", {
      address: getVmAddress,
      status: tokenStatus.FINISH,
    });

    setVmAddress({
      address: getVmAddress,
      status: tokenStatus.FINISH,
      wds,
    });

    setTimeout(async () => {
      await createCookie("vmAddressToken", {
        status: tokenStatus.DELETING,
      });
      setVmAddress({
        status: tokenStatus.DELETING,
      });
      await startDelete();
      await deleteCookie("vmAddressToken");
      location.reload();
    }, 10000);
  };

  return (
    <div className="flex flex-col justify-center gap-4 m-auto">
      {vmAddress?.status === tokenStatus.WAITING ? (
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex gap-2 bg-green-500 text-white p-2 rounded w-fit">
            <FaSpinner className="animate-spin h-6 w-6 mx-auto text-white" />
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

          <VmField
            value={
              (vmAddress.wds ? "rdp " : "ssh ") +
              "notadmin@" +
              vmAddress.address
            }
            id="address"
            title="Commande"
          />
          <VmField value="Pa$$w0rd92" id="password" title="Mot de passe" />

          <h2 className="text-center text-red-500 font-semibold">
            La VM s&apos;autodétruira 10min après sa création et vous serez
            deconnecté automatiquement
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
          <p className="text-center text-sm text-red-500 font-semibold pt-10">
            Vous pouvez vous déconnecter et vous reconnecter pour démarrer une
            nouvelle VM ou attendre la fin de la suppression.
          </p>
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
