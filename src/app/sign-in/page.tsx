"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { supabase } from "@/db/supabase";
import { toast } from "sonner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { back, replace } = useRouter();

  const handlePressSubmit = async () => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      document.cookie = `access_token=${data.session?.access_token}; path=/;`;
      replace("/dashboard");
    } catch {
      console.log("Error in sign in");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <AuthForm
        isSignIn
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onPressNavigate={back}
        onPressSubmit={handlePressSubmit}
      />
    </div>
  );
}
