import { RegiesterDto,LoginDto } from "../dto/RegiesterDto";
import { AuthServices } from "../services/AuthServices";

export class AuthController{
    constructor(
        private authService:AuthServices
    ){}

    async regiester (data:RegiesterDto){
        return this.authService.regiester(data)
    }
    async login (data:LoginDto){
        return this.authService.login(data);
    }
}