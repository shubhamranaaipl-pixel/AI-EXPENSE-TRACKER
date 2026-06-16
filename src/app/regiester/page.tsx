"use client";

import Input from "@/component/ui/input";
import Button from "@/component/ui/button";
import { IRegiester } from "@/types/auth";
import { useState } from "react";
import { regiesterUser } from "@/services/AuthServices";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const [register, setRegister] = useState<IRegiester>({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const {isAuthenticated,isLoading}=useAuth();

  const onSubmit = async (data: IRegiester) => {
    try {
      const response = await regiesterUser(data);

      console.log(response.message);

      if (response.success==true) {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
   useEffect(()=>{
     if(!isLoading && isAuthenticated){
       router.replace("/dashboard")
     }
   },[isAuthenticated,router,isLoading]);
   if(isLoading){
    return<div>Loading...</div>
   }

   if (isAuthenticated) {
  return null;
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(register);
          }}
          className="space-y-4"
        >
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={register.name}
            onChange={(e) =>
              setRegister({
                ...register,
                name: e.target.value,
              })
            }
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={register.email}
            onChange={(e) =>
              setRegister({
                ...register,
                email: e.target.value,
              })
            }
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={register.password}
            onChange={(e) =>
              setRegister({
                ...register,
                password: e.target.value,
              })
            }
          />

          <Button type="submit">
            Register
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}