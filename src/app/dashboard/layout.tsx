import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ChartNoAxesGantt, LogOut } from "lucide-react";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <div className="w-60 bg-gray-100/50 flex flex-col border-r border-gray-300/50">
        <div className="flex flex-row p-4 gap-2 items-center h-14 border-b border-gray-300/50">
          <Avatar className="h-6 w-6 bg-teal-300 rounded-sm items-center justify-center">
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <h1 className="font-medium text-lg">Campbell Baron</h1>
        </div>
        <div className="flex flex-col flex-1 justify-between px-3 pt-3.5">
          <div className="flex flex-row items-center p-2 bg-gray-100 rounded-sm gap-2">
            <ChartNoAxesGantt color="#505050" />
            <h1 className="font-medium">Projects</h1>
          </div>
          <div className="flex flex-row items-center gap-2 p-2 mb-3">
            <LogOut size={16} color="#505050" />
            <p className="text-gray-600 font-medium">Sign Out</p>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white flex flex-col">
        <div className="h-14 flex items-center border-b border-gray-300 px-4 gap-1.5">
          <ChartNoAxesGantt color="#505050" />
          <h1 className="font-medium">Projects</h1>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
