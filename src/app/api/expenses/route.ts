import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/mongodb";
import { ExpenseRepository } from "@/app/module/auth/repositories/ExpenseRepositeries";
import { ExpenseController } from "@/app/module/auth/controller/expenseController";
import { ExpenseServices } from "@/app/module/auth/services/ExpenceServices";
import { authMiddleware } from "@/middleware/authMiddleware";
import { success } from "zod";

const expenseRepositary = new ExpenseRepository();

const expenseService = new ExpenseServices(expenseRepositary);

const expenseController = new ExpenseController(expenseService);

export async function POST(request: Request) {
  try {
   const userdata= authMiddleware(request);
    await connectDB();
    const body = await request.json();
    const userId=userdata.id;
    const data = await expenseController.createExpense(userId,body);

    return NextResponse.json(
      {
        success: true,
        data: data,
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

export async function GET(request: Request) {
  try {
    const userData = authMiddleware(request);
    await connectDB();
    const userId = userData?.id as string;

    const expenses = await expenseController.getUserExpense(userId);

    return NextResponse.json(
      {
        success: true,
        data: expenses,
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
