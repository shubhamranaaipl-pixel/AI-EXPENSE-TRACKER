import { NextResponse } from "next/server";
import { connectDB } from "@/database/mongodb";
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
  

    const response= NextResponse.json(
      {
        success: true,
        message:"Login SuccesFully"
      },
      {
        status: 200,
      },
    );
    response.cookies.set("token",login.token  ,{
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      sameSite:"strict",
      maxAge:60 * 60,
      path:"/"
    })

    return response;
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
