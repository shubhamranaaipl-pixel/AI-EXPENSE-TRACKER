import { NextResponse } from "next/server";
import { connectDB } from "@/app/database/mongodb";
import { UserRepositaory } from "@/app/module/auth/repositories/userRepositeries";
import { AuthController } from "@/app/module/auth/controller/authController";
import { AuthServices } from "@/app/module/auth/services/AuthServices";
import { RegiesterValidator } from "@/app/module/auth/validator/regiesterValidator";

const userRepositary = new UserRepositaory();

const authService = new AuthServices(userRepositary);

const authController = new AuthController(authService);

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const validateData = RegiesterValidator.parse(body);

    const user = await authController.regiester(validateData);

    return NextResponse.json(
      {
        succes: true,
        data: user,
      },
      {
        status: 201,
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
