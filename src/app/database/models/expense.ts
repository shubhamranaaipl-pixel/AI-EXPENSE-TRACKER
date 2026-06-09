import mongoose from "mongoose";


const expenseSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"Users",
         required:true
    },
        title:{
           type:String,
           required:true
        },
        amount:{
            type:Number,
            required:true
        }
        ,
        description:{
            type:String
        },
        expenseDate:{
            type:Date,
            required:true
        }
    
},{
    timestamps:true  
})

export const Expense=mongoose.model("Expenses",expenseSchema);