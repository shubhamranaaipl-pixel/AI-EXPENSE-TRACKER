import mongoose from "mongoose";


const ExpenseSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"Users",
         required:true
    },
        title:{
           type:String,
           required:true
        },
        category:{
          type:String,
        },
        amount:{
            type:Number,
            required:true
        }
        ,
        description:{
            type:String
        },
        type:{
          type:String,
          enum:["income","expense"],
          required:true
        },
        expenseDate:{
            type:Date,
            required:true
        }
    
},{
    timestamps:true  
})

export const Expense=mongoose.models.Expenses || mongoose.model('Expenses', ExpenseSchema);