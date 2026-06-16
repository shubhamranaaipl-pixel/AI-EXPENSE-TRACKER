import { NextResponse } from "next/server";
import { success } from "zod";

export async function POST(){
    const response=NextResponse.json({
        succes:true,
        message:"Logged Out SuccessFully"
    });

    response.cookies.set("token","",{
        httpOnly:true,
        expires:new Date(0),
        path:"/"
    })

    return response;
}