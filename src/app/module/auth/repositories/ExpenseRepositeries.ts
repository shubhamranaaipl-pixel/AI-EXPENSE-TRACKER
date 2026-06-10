import { Expense } from "@/app/database/models/expense";
import { IExpenceDto } from "../dto/ExpenseDto";

export class ExpenseRepository{
    async createexpense(data:IExpenceDto){
        return Expense.create(data);
    }

    async getExpenseByUserId(userId:string){
        return Expense.find({userId});
    }
    async getExpenseById(id:string){
        return Expense.findById(id);
    }

    async deleteExpense(id:string){
        return Expense.findByIdAndDelete(id);
    }
    async updateExpense(id:string,
        data:Partial<IExpenceDto>
    ){
        return Expense.findByIdAndUpdate(id,
            data,
            {new:true}
        )
    }

}