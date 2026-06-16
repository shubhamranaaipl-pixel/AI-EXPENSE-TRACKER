import { User } from "@/database/models/User";
import { IUpdateProfile } from "../dto/updateProfiledto";

export class ProfileRepositary{
    async getProfile(userId:string){
        return User.findById(userId).select("-password")

    }


    async updateProfile(userId:string,
        data:IUpdateProfile
    ){
        return User.findByIdAndUpdate(
            userId,
            data,{new:true}
        ).select("-password");
    }
}

