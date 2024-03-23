"use client";
import { useAppContext } from "@/hooks/useAppContext";
import { connection } from "@/services/connection";
import { useState } from "react";

export default function LoginForm() {
  const { setDialog } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await connection(username, password);
      setError("");
      setDialog("Connexion réussie !", "green", 3000);
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <form className="space-y-4" action={handleSubmit}>
      <div>
        <label className="block mb-1 text-white">Email</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
          placeholder="Email"
        />
      </div>
      <div className="relative">
        <label className="block mb-1 text-white">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
          placeholder="Mot de passe"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Se connecter
      </button>
    </form>
  );
}
