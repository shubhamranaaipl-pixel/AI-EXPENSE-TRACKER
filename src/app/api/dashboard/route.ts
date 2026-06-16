import { NextResponse } from "next/server";
import { DashBoardController } from "@/app/module/dashboard/controllers/DashBoardController";
import { DashBoardServices } from "@/app/module/dashboard/services/DashBoardServices";
import { DashboardRepository } from "@/app/module/dashboard/repositories/DashboardRepositeries";
import { connectDB } from "@/database/mongodb";
import { authMiddleware } from "@/middleware/authMiddleware";




const dashBoardRepository=new DashboardRepository();

const dashBoardServices=new DashBoardServices(dashBoardRepository);
const dashBoardController=new DashBoardController(dashBoardServices);

export async function GET(request:Request){
    try{
        const user=await authMiddleware(request);
        await connectDB();
    

        const data=await dashBoardController.getdashBoardData(user.id);
       
        return NextResponse.json({
            success:true,
            data:data,
        },{
            status:200
        })

    }
    catch(err:any){
      return NextResponse.json({
        success:false,
        message:err.message
      },{
        status:400
      })
    }
}
