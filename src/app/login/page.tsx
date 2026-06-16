"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "@/component/ui/input";
import Button from "@/component/ui/button";

import { ILogin } from "@/types/auth";
import { loginUser } from "@/services/AuthServices";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { isAuthenticated, isLoading, fetchUser,setIsLoading } = useAuth();

  const [formData, setFormData] = useState<ILogin>({
    email: "",
    password: "",
  });



  const onSubmit = async (data: ILogin) => {
    try {
      setIsLoading(true);

      const response = await loginUser(data);
      if (response.success === true) {
        await fetchUser();
        router.push("/dashboard");
      } else {
        console.log(response.message);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;

      console.log(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router, isLoading]);

  if(isLoading){
    return <div>Loading....</div>
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-4"
        >
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <Button type="submit">{isLoading ? "Loading..." : "Login"}</Button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/regiester" className="text-blue-500 font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
