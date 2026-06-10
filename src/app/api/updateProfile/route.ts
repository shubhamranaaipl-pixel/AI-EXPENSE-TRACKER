import { NextResponse } from "next/server";
import { connectDB } from "@/app/database/mongodb";
import { authMiddleware } from "@/app/middleware/authMiddleware";
import { ProfileController } from "@/app/module/profile/controller/ProfileController";
import { ProfileRepositary } from "@/app/module/profile/repositeries/ProfileRepositeries";
import { ProfileServices } from "@/app/module/profile/services/ProfileServices";



const profilerepositary=new ProfileRepositary();

const profileServices=new ProfileServices(profilerepositary);
const profileController=new ProfileController(profileServices);

export async function PATCH(request:Request){
    try{
        const user=await authMiddleware(request);
        await connectDB();

        const userId=user.id;

        const body=await request.json();

        const data=await profileController.updateProfile(userId,body);

        return NextResponse.json({
            success:true,
            data:data
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