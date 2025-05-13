"use client";
import { ProjectRow } from "@/components/ProjectRow";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/SessionContext";
import { useUserTranscripts } from "@/hooks/useUserTranscripts";
import { groupTranscriptions } from "@/lib/groupTranscriptions";
import { GroupedTranscriptions } from "@/types";
import { ListFilterIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { push } = useRouter();
  const { onGetUserTranscripts } = useUserTranscripts();
  const { session } = useSession();
  const [transcripts, setTranscripts] = useState<GroupedTranscriptions[]>([]);

  const handleNewProject = () => push("/new-document");

  const handleGetUserTranscriptions = async () => {
    const data = await onGetUserTranscripts();
    setTranscripts(groupTranscriptions(data));
  };

  useEffect(() => {
    if (session) {
      handleGetUserTranscriptions();
    }
  }, [session]);

  console.log(transcripts);

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex py-3.5 px-4 justify-between">
        <div className="flex items-center gap-2 bg-gray-50 h-[28-px] rounded-md px-2 cursor-pointer">
          <ListFilterIcon size={16} color="#505050" />
          <p className="text-sm text-gray-700 font-medium">
            Sorted by <span className="text-black">Latest Edited</span>
          </p>
        </div>
        <Button
          onClick={handleNewProject}
          className="bg-blue-600 hover:bg-blue-800 cursor-pointer p-0 h-[28px] px-2.5 gap-0.5"
        >
          <Plus size={16} color="#ffffff" />
          <span className="text-sm font-bold">New Project</span>
        </Button>
      </div>
      {transcripts.map((transcription) => (
        <div key={transcription.title}>
          <div className="bg-neutral-50 w-full px-4 py-[5.5px]">
            <p className="text-sm font-bold text-neutral-700">
              {transcription.title}
            </p>
          </div>
          {transcription.data.map((data) => (
            <ProjectRow
              key={data.id}
              title={data.title}
              created_at={data.created_at}
              updated_at={data.updated_at}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
