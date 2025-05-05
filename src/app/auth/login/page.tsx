"use client";

import { LoginForm } from "@/components/Forms/loginForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/authSlice";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const _handleSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await axios.post("/api/auth/login", data);
      if (res.status === 200) {
        dispatch(
          setUser({
            token: res.data.token,
            user: {
              email: res.data.user.email,
              id: res.data.user.id,
            },
          })
        );
        alert("Login Success");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login Failed", error);
      alert("Login Failed");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={_handleSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;
