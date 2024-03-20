"use server";
import { getUser } from "@/app/utils/getUser";
import { generateToken } from "@/app/utils/jwt";
import { routes } from "@/app/utils/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { main } from "./manage-vm";

export async function connection(username: string, password: string) {
  const user = await getUser(username, password);

  if (user) {
    const token = await generateToken({
      username: user?.username,
      role: user?.role,
    });

    cookies().set("token", token);
    redirect(routes.admin());
  } else {
    throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
  }
}

export async function logout() {
  deleteCookie("token");
  deleteCookie("vmAddressToken");
  redirect(routes.home());
}

export async function checkAuth() {
  const token = cookies().get("token");

  if (!token) {
    redirect(routes.home());
  }
}

export async function createCookie(cookieName: string, value: any) {
  const token = await generateToken(value);
  cookies().set(cookieName, token);
}

export async function deleteCookie(cookieName: string) {
  cookies().delete(cookieName);
}

export async function createVM(publisher: string, offer: string, sku: string) {
  const vmAddress = await main(publisher, offer, sku);

  if (!vmAddress) {
    await deleteCookie("vmAddressToken");
    return;
  }

  return vmAddress;
}
