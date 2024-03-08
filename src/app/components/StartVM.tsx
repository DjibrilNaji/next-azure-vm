"use client";

import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function StartVM() {
  const [creatingVm, setCreatingVm] = useState(false);

  return (
    <div className="flex flex-col justify-center gap-4 m-auto">
      {!creatingVm ? (
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 p-6 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCreatingVm(true)}
        >
          Démarrer une VM
        </button>
      ) : (
        <div className="flex gap-2 bg-blue-500 text-white p-2 rounded">
          <FaSpinner className="animate-spin h-6 w-6 mx-auto text-white" />
          <p className="flex text-white">Votre VM est en cours de création</p>
        </div>
      )}
    </div>
  );
}
