import mongoose, {Mongoose, trusted} from "mongoose";
import { unique } from "next/dist/build/utils";


const UserSchema=new mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 password:{
    type:String,
    required:true,

 }
},{
    timestamps:true
});

export const User= mongoose.models.User|| mongoose.model("Users",UserSchema);

