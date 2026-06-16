import { User } from "@/database/models/User";
import { RegiesterDto } from "../dto/RegiesterDto";


export class UserRepositaory{
  async findByEmail(email:string){
   return  User.findOne({email})
  }

  async craeteUser(data:RegiesterDto){
    return User.create(data);
  }
}
