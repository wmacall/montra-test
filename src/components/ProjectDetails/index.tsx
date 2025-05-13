"use client";

import { useTranscription } from "@/context/TranscriptionContext";

export const ProjectDetails = () => {
  const { transcription } = useTranscription();
  const lastEdited = "2023-10-01 12:00 PM";
  const createdBy = "John Doe";

  if (!transcription) {
    return null;
  }

  return (
    <div className="flex flex-col border-b border-gray-300/50 px-3 py-4 gap-2 relative">
      <p className="text-xs font-medium text-neutral-700">Project Details</p>
      <div className="w-full rounded-md relative flex flex-col bg-neutral-50 p-3 gap-3">
        <div>
          <p className="text-gray-700">Latest edited</p>
          <p className="text-black font-medium text-md">{lastEdited}</p>
        </div>
        <div>
          <p className="text-gray-700">Created by</p>
          <p className="text-black font-medium text-md">{createdBy}</p>
        </div>
      </div>
    </div>
  );
};
