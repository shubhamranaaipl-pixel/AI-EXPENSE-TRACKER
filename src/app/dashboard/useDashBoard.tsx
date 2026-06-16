"use client";

import { useEffect, useState } from "react";

import { getdashBoard } from "@/services/ExpenseServices";
import { useAuth } from "@/context/AuthContext";

interface IDashBoard{
    totalExpense:number;
    totalIncome:number;
    totalBalance:number;
    categoryExpense:any[];
    monthlyExpense:any[];
    recentTransactions:any[];
}

export const useDashBoard=()=>{

    const [dashboard,setDashBoard]=useState<IDashBoard|null>(null);
    const {isLoading,setIsLoading,logout,user} =useAuth();

 useEffect(() => {
  
    if (!user) return;

    const fetchDashBoard = async () => {
      try {
        setIsLoading(true);
        const data = await getdashBoard();

        if (data) {
          setDashBoard(data);
        }
      } catch (error: any) {
        console.error("Dashboard Fetch Error:", error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashBoard();

  }, [user]);

  
  return{
  dashboard,
  isLoading,
  logout,
  user
  }
}