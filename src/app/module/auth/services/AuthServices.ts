import bcrypt from "bcryptjs";
import { RegiesterDto, LoginDto } from "../dto/RegiesterDto";
import { UserRepositaory } from "../repositories/userRepositeries";
import jwt from "jsonwebtoken";
import { env } from "@/app/config/env";

export class AuthServices {
  constructor(private userRepositary: UserRepositaory) {}

  async regiester(data: RegiesterDto) {
    const existingUser = await this.userRepositary.findByEmail(data.email);

    if (existingUser) {
      throw new Error("User already Exists");
    }
    const hashPassword = await bcrypt.hash(data.password, 10);

    return this.userRepositary.craeteUser({
      ...data,
      password: hashPassword,
    });
  }

  async login(data: LoginDto) {
    const user = await this.userRepositary.findByEmail(data.email);

    if (!user) {
      throw new Error("Envalid Credential");
    }
    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new Error("Envalid Credential");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return token;
  }
}
