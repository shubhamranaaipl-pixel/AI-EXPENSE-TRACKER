import { NextResponse } from "next/server";
import { ExpenseController } from "@/app/module/auth/controller/expenseController";
import { ExpenseRepository } from "@/app/module/auth/repositories/ExpenseRepositeries";
import { ExpenseServices } from "@/app/module/auth/services/ExpenceServices";
import { authMiddleware } from "@/middleware/authMiddleware";
import { connectDB } from "@/database/mongodb";

const expenseRepositary = new ExpenseRepository();

const expenseService = new ExpenseServices(expenseRepositary);

const expenseController = new ExpenseController(expenseService);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    authMiddleware(request);
    await connectDB();
    const { id } = await params;

    const expenseData = await expenseController.getExpenseDeail(id);

    return NextResponse.json(
      {
        sucess: true,
        data: expenseData,
      },
      {
        status: 200,
      },
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        sucess: false,
        message: err.message,
      },
      {
        status: 400,
      },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    authMiddleware(request);
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updatedData = await expenseController.updateExpense(id, body);

    return NextResponse.json(
      {
        success: true,
        data: updatedData,
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    authMiddleware(request);
    await connectDB();
    const { id } = await params;
    const deletedData = await expenseController.deleteExpense(id);
    return NextResponse.json(
      {
        success: true,
        messaege: "Deleted SuccesFully",
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
      { status: 400 },
    );
  }
}
