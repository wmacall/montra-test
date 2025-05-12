"use client";
import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  const handleNavigateToSignIn = () => push("/sign-in");
  const handleClickSubmit = () => push("/dashboard");

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <AuthForm
        isSignIn={false}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onPressNavigate={handleNavigateToSignIn}
        onPressSubmit={handleClickSubmit}
      />
    </div>
  );
}
