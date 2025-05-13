"use client";
import { ReactNode } from "react";
import { ChevronLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface NewDocumentLayoutProps {
  children: ReactNode;
}

export default function NewDocumentLayout({
  children,
}: NewDocumentLayoutProps) {
  const { back } = useRouter();

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex justify-between h-14 w-full px-4 border-b border-gray-300/50 items-center">
        <Button
          onClick={back}
          variant="outline"
          className="h-8 p-0 px-2.5 cursor-pointer flex"
        >
          <ChevronLeft color="#505050" />
          <span className="font-medium text-black">Back</span>
        </Button>
        <div className="flex items-center gap-1 justify-center w-full">
          <FileText size={16} />
          <p className="text-sm text-black font-medium">
            Strategic Investor Engagement
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 items-center justify-center rounded-sm flex bg-white border border-gray-300/50">
            <div className="h-6 w-6 flex justify-center items-center bg-[#21CCEE] rounded-sm">
              <span className="text-white font-medium">C</span>
            </div>
          </div>
          <Button className="h-8 p-0 px-3.5 bg-blue-600 hover:bg-blue-800 cursor-pointer">
            Share
          </Button>
        </div>
      </div>
      <div className="bg-white flex flex-1">{children}</div>
    </div>
  );
}
