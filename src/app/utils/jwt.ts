"use server";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const generateToken = async (payload: any) => {
  return sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: "2h",
  });
};

export const verifyToken = (token: string): any => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET || "");
    return decoded;
  } catch (err) {
    return err;
  }
};

export async function getToken(cookieName: string) {
  const token = cookies().get(cookieName);
  if (token) {
    return JSON.stringify(cookies().get(cookieName));
  }
  return null;
}

export async function getValueByToken(token: string) {
  const tokenFetch = cookies().get(token);

  if (tokenFetch) {
    const decodedToken = await verifyToken(tokenFetch?.value);

    if (decodedToken instanceof Error) {
      return null;
    }
    return decodedToken;
  }
}
