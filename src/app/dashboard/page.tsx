"use client";
import { ProjectRow } from "@/components/ProjectRow";
import { Button } from "@/components/ui/button";
import { ListFilterIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { push } = useRouter();

  const handleNewProject = () => push("/new-document");

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex py-3.5 px-4 justify-between">
        <div className="flex items-center gap-2 bg-gray-50 h-[28-px] rounded-md px-2 cursor-pointer">
          <ListFilterIcon size={16} color="#505050" />
          <h1 className="text-sm text-gray-700 font-medium">
            Sorted by <span className="text-black">Latest Edited</span>
          </h1>
        </div>
        <Button
          onClick={handleNewProject}
          className="bg-blue-600 hover:bg-blue-800 cursor-pointer p-0 h-[28px] px-2.5 gap-0.5"
        >
          <Plus size={16} color="#ffffff" />
          <span className="text-sm font-bold">New Project</span>
        </Button>
      </div>
      <div className="bg-neutral-50 w-full px-4 py-[5.5px]">
        <h1 className="text-sm font-bold text-neutral-700">Today</h1>
      </div>
      <ProjectRow
        title="Leveraging Technology for Efficient Communication"
        date="March 25, 2024"
      />
      <div className="bg-neutral-50 w-full px-4 py-[5.5px]">
        <h1 className="text-sm font-bold text-neutral-700">Yesterday</h1>
      </div>
      <ProjectRow title="The Investor Spectrum" date="March 25, 2024" />
      <ProjectRow
        title="Building Trust and Transparency"
        date="March 25, 2024"
      />
      <ProjectRow
        title="Engaging Investors Through Storytelling"
        date="March 25, 2024"
      />
    </div>
  );
}
