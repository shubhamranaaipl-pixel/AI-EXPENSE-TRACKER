import { NextRequest,NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/authMiddleware";
import { User } from "@/database/models/User";
import { connectDB } from "@/database/mongodb";




export async function GET(
  request: NextRequest
) {

 await connectDB();
  const decoded = authMiddleware(request);

  const user = await User.findById(
    decoded.id
  ).select("-password");
  
  console.log("The user is ",user)
  return NextResponse.json({
    user,
  });
}