import { ProfileRepositary } from "../repositeries/ProfileRepositeries";
import { IUpdateProfile } from "../dto/updateProfiledto";

export class ProfileServices{
    constructor(private profileRepositary:ProfileRepositary){}

    async getProfile(userId:string){
        return this.profileRepositary.getProfile(userId);
    }

    async updateProfile(userId:string,data:IUpdateProfile){
        return this.profileRepositary.updateProfile(userId,data);
    }
}