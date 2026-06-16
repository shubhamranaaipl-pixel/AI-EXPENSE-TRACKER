"use client";

import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})


export const getdashBoard=async()=>{
    const response=await api.get("/dashboard");
    return response.data.data;

}


