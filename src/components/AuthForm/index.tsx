"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import FormInput from "@/components/FormInput";
import { Mail, Lock, Eye } from "lucide-react";

interface AuthFormProps {
  isSignIn?: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onPressNavigate?: () => void;
  onPressSubmit?: () => void;
}

export default function AuthForm({
  isSignIn = true,
  email,
  setEmail,
  password,
  setPassword,
  onPressNavigate,
  onPressSubmit,
}: AuthFormProps) {
  return (
    <Card className="w-full max-w-md shadow-sm p-6">
      <CardHeader className="text-center gap-4">
        <CardTitle className="text-2xl font-bold">
          {isSignIn ? "Sign In" : "Sign Up"}
        </CardTitle>
        <CardDescription>A few steps to access Redraft</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-col gap-3">
          <FormInput
            name="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={setEmail}
            leftIcon={<Mail size={18} />}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            leftIcon={<Lock size={18} />}
            rightIcon={<Eye size={18} />}
          />
        </div>
        {isSignIn && (
          <p className="text-right text-sm py-1.5 font-medium mt-1.5 hover:underline cursor-pointer">
            Forgot Password
          </p>
        )}
        <Button
          onClick={onPressSubmit}
          className={cn(
            "w-full bg-blue-500 hover:bg-blue-600 cursor-pointer",
            isSignIn ? "mt-3" : "mt-6"
          )}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>
        <div className="flex items-center gap-2 justify-center pt-6">
          <p className="text-gray-600">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button
            variant="link"
            className="font-semibold cursor-pointer p-0"
            onClick={onPressNavigate}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
