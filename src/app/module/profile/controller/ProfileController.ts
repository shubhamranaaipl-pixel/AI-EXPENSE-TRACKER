import { IUpdateProfile } from "../dto/updateProfiledto";
import { ProfileServices } from "../services/ProfileServices";

export class ProfileController{
    constructor(private profileServices:ProfileServices){}

    async getProfile(userId:string){
        return this.profileServices.getProfile(userId);
    }

    async updateProfile(userId:string,data:IUpdateProfile){
        return this.profileServices.updateProfile(userId,data);
    }
}