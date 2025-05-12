import { ProjectRow } from "@/components/ProjectRow";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
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
