"use client";

import axios from "axios";
import { ILogin,IRegiester } from "@/types/auth";



export const api=axios.create({
    baseURL:"http://localhost:3000/api"
})

export const regiesterUser=async(data:IRegiester)=>{
    const response=await api.post("/auth/regiester",data);

    return response.data;
}

export const loginUser=async(data:ILogin)=>{
    const response=await api.post("/auth/login",data);

    return response.data;
}

export const logoutUser=async()=>{
    const response=await fetch("/api/auth/logout",{
        method:"POST",
        credentials:"include"
    })

    return response.json();
}