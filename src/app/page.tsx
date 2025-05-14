"use client";
import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import { supabase } from "@/db/supabase";
import { toast } from "sonner";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleNavigateToSignIn = () => push("/sign-in");

  const handlePressSubmit = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
    } catch {
      console.log("Error in sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <AuthForm
        isSignIn={false}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onPressNavigate={handleNavigateToSignIn}
        onPressSubmit={handlePressSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
