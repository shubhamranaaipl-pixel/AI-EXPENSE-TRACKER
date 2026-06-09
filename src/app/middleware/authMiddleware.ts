
import jwt from "jsonwebtoken";
import { env } from "../config/env";
interface JwtUser{
  id:string,
  email:string
}

export const authMiddleware=(request:Request)=>{
  const authHeader=request.headers.get("authorization");

  if(!authHeader){
   throw new Error("Access Denied")

  }
  const token=authHeader.split(" ")[1];

  const decode=jwt.verify(token,env.JWT_SECRET) as JwtUser;

  return decode ;
}