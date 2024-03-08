"use server";
import { getUser } from "@/app/utils/getUser";
import { generateToken, verifyToken } from "@/app/utils/jwt";
import { routes } from "@/app/utils/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function connection(username: string, password: string) {
  const user = await getUser(username, password);

  if (user) {
    const token = await generateToken({
      username: user?.username,
      role: user?.role,
    });
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    cookies().set("token", token, { expires: expirationDate });
    redirect(routes.admin());
  } else {
    throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
  }
}

export async function logout() {
  cookies().delete("token");
  redirect(routes.home());
}

export async function checkAuth() {
  const token = cookies().get("token");

  if (!token) {
    redirect(routes.home());
  }
}

export async function getToken() {
  return JSON.stringify(cookies().get("token"));
}

export async function getUserByToken() {
  const token = cookies().get("token");

  if (token) {
    const user = await verifyToken(token?.value);
    return user;
  }
}
