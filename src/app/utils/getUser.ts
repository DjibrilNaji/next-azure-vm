import { User } from "@/app/models/User";
import users from "../../../public/users.json";

export async function getUser(
  username: string,
  password: string
): Promise<User> {
  const user = users.find(
    (u: User) => u?.username === username && u?.password === password
  );
  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }
  return user;
}