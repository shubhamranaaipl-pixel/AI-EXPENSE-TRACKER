"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRoutes{
    children:React.ReactNode
}


export default function ProtectedRoutes({children}:ProtectedRoutes){

    const {isLoading,isAuthenticated}=useAuth();
    const router=useRouter();
    console.log("The is Authentiacted ",isAuthenticated)


    useEffect(()=>{
     
         if(!isAuthenticated &&!isLoading){
            router.push("/login")
         }
    },[isAuthenticated,isLoading,router]);

    if(isLoading){
        return <div>Loading...</div>
    }
  if(!isAuthenticated){
    return null;
  }
     return (
     <>{children}</>

     )
}