"use client";
import { useEffect, useState, useCallback } from "react";
import { ProjectRow } from "@/components/ProjectRow";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/SessionContext";
import { useUserTranscripts } from "@/hooks/useUserTranscripts";
import {
  groupTranscriptions,
  sortTranscriptions,
} from "@/lib/groupTranscriptions";
import { GroupedTranscriptions, SortDirection, SortField } from "@/types";
import { ChevronsUpDown, ListFilterIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranscription } from "@/context/TranscriptionContext";

export default function Dashboard() {
  const { push } = useRouter();
  const { onGetUserTranscripts } = useUserTranscripts();
  const { session } = useSession();
  const [transcripts, setTranscripts] = useState<GroupedTranscriptions[]>([]);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const { onResetTranscriptionData } = useTranscription();

  const handleNewProject = () => {
    onResetTranscriptionData();
    push("/new-document");
  };

  const handleGetUserTranscriptions = useCallback(async () => {
    const data = await onGetUserTranscripts();
    setTranscripts(groupTranscriptions(data));
  }, [onGetUserTranscripts]);

  const handleSortTranscriptions = (field: SortField) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    setSortField(field);
    setTranscripts((prev) => sortTranscriptions(prev, field, newDirection));
  };

  useEffect(() => {
    if (session) {
      handleGetUserTranscriptions();
    }
  }, [session]);

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex py-3.5 px-4 justify-between border-b border-gray-300/30">
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
      <div className="w-full border-b border-gray-300/30 px-6 py-1.5">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2 flex-4">
            <span className="text-gray-500 text-sm font-medium">
              Project name
            </span>
          </div>
          <div className="flex items-center justify-start flex-1">
            <span className="text-gray-500 text-sm font-medium">Templates</span>
          </div>
          <div
            className="flex items-center flex-1 justify-center cursor-pointer flex-row gap-2"
            onClick={() => handleSortTranscriptions("created_at")}
          >
            <span className="text-gray-500 text-sm font-medium">
              Creation Date
            </span>
            <ChevronsUpDown size={14} className="text-gray-700" />
          </div>
          <div
            className="flex items-center flex-1 justify-center cursor-pointer flex-row gap-2"
            onClick={() => handleSortTranscriptions("updated_at")}
          >
            <span className="text-gray-500 text-sm font-medium">
              Latest edited
            </span>
            <ChevronsUpDown size={14} className="text-gray-700" />
          </div>
          <div className="flex items-center flex-[0.5] justify-end" />
        </div>
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
