import { Vm } from "@/app/models/Vm";
import Image from "next/image";

export default function VmCard({
  vm,
  lauchVmCreation,
}: {
  vm: Vm;
  lauchVmCreation: (vm: Vm, wds: boolean) => void;
}) {
  const handleLauchVmCreation = () => {
    const isWindows = vm?.image === "windows";
    lauchVmCreation && lauchVmCreation(vm, isWindows);
  };
  return (
    <div className="flex flex-col items-center gap-5">
      <Image
        src={`/img/${vm?.image}.png`}
        alt="os"
        width={vm?.width}
        height={100}
      />
      <h2 className="text-white">{vm?.name}</h2>

      <button
        className="w-fit bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 p-6 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleLauchVmCreation}
      >
        Démarrer
      </button>
    </div>
  );
}
