import { NextResponse } from "next/server";
import { connectDB } from "@/app/database/mongodb";
import { authMiddleware } from "@/app/middleware/authMiddleware";
import { ProfileController } from "@/app/module/profile/controller/ProfileController";
import { ProfileRepositary } from "@/app/module/profile/repositeries/ProfileRepositeries";
import { ProfileServices } from "@/app/module/profile/services/ProfileServices";


const profilerepositary=new ProfileRepositary();

const profileServices=new ProfileServices(profilerepositary);
const profileController=new ProfileController(profileServices);

export async function GET(request:Request){
    try{
        const user=await authMiddleware(request);
        await connectDB();

        const userId=user.id;

        const data=await profileController.getProfile(userId);

        return NextResponse.json({
          success:true,
          data:{
            name:data.name,
            email:data.email
          }
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