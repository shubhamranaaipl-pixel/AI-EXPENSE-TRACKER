import { IExpenceDto } from "../dto/ExpenseDto";
import { ExpenseRepository } from "../repositories/ExpenseRepositeries";


export class ExpenseServices{
    constructor(private expenseRespository:ExpenseRepository){}


    async createExpense(userId:string,data:IExpenceDto){
      if(data.amount<=0){
        throw new Error("amount Must be Greater than 0")
      }

      return this.expenseRespository.createexpense({...data,
        userId:userId}
      );
    }

    async getUserExpense(userId:string){
        if(!userId){
            throw new Error("Id is not defined")
        }

        return this.expenseRespository.getExpenseByUserId(userId);
    }
    async getExpenseDetail(id:string){
        if(!id){
            throw new Error("Id id not defined")
        }
        return this.expenseRespository.getExpenseById(id);
    }
    async updateExpense(id:string,data:IExpenceDto){
        return this.expenseRespository.updateExpense(id,data)
    }

    async deleteExpense(id:string){
        if(!id){
            throw new Error("id is not defined")
        }
        return this.expenseRespository.deleteExpense(id);
    }
}