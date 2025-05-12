"use client";
import { useState } from "react";
import AuthForm from "@/components/AuthForm";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <AuthForm
        isSignIn={false}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
}
