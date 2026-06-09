import { NextResponse } from "next/server";
import { connectDB } from "@/app/database/mongodb";
import { UserRepositaory } from "@/app/module/auth/repositories/userRepositeries";
import { AuthController } from "@/app/module/auth/controller/authController";
import { AuthServices } from "@/app/module/auth/services/AuthServices";
import { LoginValidator } from "@/app/module/auth/validator/regiesterValidator";


const userRepositary = new UserRepositaory();

const authService = new AuthServices(userRepositary);

const authController = new AuthController(authService);

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const validateData = LoginValidator.parse(body);

    const login = await authController.login(validateData);

    return NextResponse.json(
      {
        success: true,
        token: login,
      },
      {
        status: 200,
      },
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 400,
      },
    );
  }
}
