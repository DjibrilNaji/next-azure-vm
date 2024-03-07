"use client";
import { useAppContext } from "@/hooks/useAppContext";
import { connection } from "@/services/connection";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { getUser } from "../utils/getUser";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const { setUserConnected, userLogged } = useAppContext();

  const handleSubmit = async () => {
    try {
      await connection(username, password);
      const user = await getUser(username, password);
      setUserConnected(user);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen max-w-md mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4 text-white">
        Connexion
      </h1>
      <form className="space-y-4" action={handleSubmit}>
        <div>
          <label className="block mb-1 text-white">
            Nom d&apos;utilisateur
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="relative">
          <label className="block mb-1 text-white">Mot de passe</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
          <button
            className="absolute top-2/3 right-3 transform -translate-y-1/2 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FaEye />
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
