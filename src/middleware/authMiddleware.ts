import jwt from "jsonwebtoken";
import { env } from "../app/config/env";
interface JwtUser {
  id: string;
  email: string;
}

export const authMiddleware = (request: Request): JwtUser => {
  const cookieHeader = request.headers.get("cookie");

  

  if (!cookieHeader) {
    throw new Error("Access Denied");
  }
  const token = cookieHeader
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];



  if (!token) {
    throw new Error("Unauthorized");
  }

  const decode = jwt.verify(token, env.JWT_SECRET) as JwtUser;

  return decode;
};
