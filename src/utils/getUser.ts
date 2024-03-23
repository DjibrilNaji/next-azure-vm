import { users } from "@/data/users";
import { User } from "@/models/User";

export async function getUser(
  username: string,
  password: string
): Promise<User> {
  const user = users.find(
    (u: User) => u?.username === username && u?.password === password
  );

  if (!user) {
    throw new Error("Le nom d'utilisateur ou le mot de passe est incorrect.");
  }
  return user;
}
