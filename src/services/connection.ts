"use server";
import { getUser } from "@/app/utils/getUser";
import { redirect } from "next/navigation";

export async function connection(username: string, password: string) {
  const user = await getUser(username, password);

  if (user) {
    redirect("/admin");
  } else {
    throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
  }
}
