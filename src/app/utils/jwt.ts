"use server";
import { sign, verify } from "jsonwebtoken";

export const generateToken = async (payload: any) => {
  return sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: "1h",
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
