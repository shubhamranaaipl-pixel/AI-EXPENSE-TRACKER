
import { IExpenceDto } from "../dto/ExpenseDto";
import { ExpenseServices } from "../services/ExpenceServices";


export class ExpenseController{
    constructor(private expeneseServices:ExpenseServices){}

    async createExpense(userId:string,data:IExpenceDto){
        return this.expeneseServices.createExpense(userId,data);
    }
    async getUserExpense(userId:string){
        return this .expeneseServices.getUserExpense(userId)
    }

    async getExpenseDeail(id:string){
        return this.expeneseServices.getExpenseDetail(id);
    }

    async updateExpense(id:string,data:IExpenceDto){
        return this.expeneseServices.updateExpense(id,data)
    }

    async deleteExpense(id:string){
        return this.expeneseServices.deleteExpense(id);
    }
}