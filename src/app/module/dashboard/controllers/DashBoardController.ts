import { DashBoardServices } from "../services/DashBoardServices";

export class DashBoardController{
    constructor(private dashBoardServices:DashBoardServices){}

    async getdashBoardData(userId:string){
        return this.dashBoardServices.getDashBoardDetail(userId);
    }
}