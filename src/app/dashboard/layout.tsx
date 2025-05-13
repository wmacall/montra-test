"use client";
import { Avatar } from "@/components/ui/avatar";
import { useSession } from "@/context/SessionContext";
import { supabase } from "@/db/supabase";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ChartNoAxesGantt, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { session } = useSession();
  const { replace } = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return toast.error("Failed to sign out");
    }
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    replace("/");
  };

  return (
    <div className="flex h-screen">
      <div className="w-60 bg-gray-100/50 flex flex-col border-r border-gray-300/50">
        <div className="flex flex-row p-4 gap-2 items-center h-14 border-b border-gray-300/50">
          <Avatar className="h-6 w-6 bg-teal-300 rounded-sm items-center justify-center">
            <AvatarFallback className="text-white font-medium">
              {session?.user?.email
                ? session.user.email.charAt(0).toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
          <p className="font-medium text-lg">
            {session?.user?.email
              ? session.user.email.split("@")[0].charAt(0) +
                session.user.email.split("@")[0].slice(1)
              : "User"}
          </p>
        </div>
        <div className="flex flex-col flex-1 justify-between px-3 pt-3.5">
          <div className="flex flex-row items-center p-2 bg-gray-100 rounded-sm gap-2">
            <ChartNoAxesGantt color="#505050" />
            <p className="font-medium">Projects</p>
          </div>
          <div
            onClick={handleSignOut}
            className="flex flex-row items-center gap-2 p-2 mb-3 cursor-pointer hover:bg-gray-100 rounded-sm"
          >
            <LogOut size={16} color="#505050" />
            <p className="text-gray-600 font-medium">Sign Out</p>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white flex flex-col">
        <div className="h-14 flex items-center border-b border-gray-300 px-4 gap-1.5">
          <ChartNoAxesGantt color="#505050" />
          <p className="font-medium">Projects</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
