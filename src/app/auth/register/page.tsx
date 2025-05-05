"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { RegisterForm } from "@/components/Forms/regsiterForm";

const RegisterPage = () => {
  const router = useRouter();

  const _handleSubmit = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("DATA register page", data);
    try {
      const res = await axios.post("/api/register", data);
      if (res.status === 201) {
        alert("Register Success");
        router.push("/dashboard/create-restaurant"); // หลังจากลงทะเบียนสำเร็จให้ไปหน้าสร้างร้าน
      }
    } catch (error) {
      console.error("Register Failed", error);
      alert("Register Failed");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm onSubmit={_handleSubmit} />
      </div>
    </div>
  );
};

export default RegisterPage;
