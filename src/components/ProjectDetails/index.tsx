"use client";

import { useSession } from "@/context/SessionContext";
import { useTranscription } from "@/context/TranscriptionContext";
import { formatDateMMMMD } from "@/lib/formatDateMMMMD";

export const ProjectDetails = () => {
  const { transcription, createdAt } = useTranscription();
  const { session } = useSession();
  const email = session?.user?.email || null;

  if (!transcription) {
    return null;
  }

  return (
    <div className="flex flex-col border-b border-gray-300/50 px-3 py-4 gap-2 relative">
      <p className="text-xs font-medium text-neutral-700">Project Details</p>
      <div className="w-full rounded-md relative flex flex-col bg-neutral-50 p-3 gap-3">
        <div>
          <p className="text-gray-700">Latest edited</p>
          <p className="text-black font-medium text-md">
            {formatDateMMMMD(createdAt)}
          </p>
        </div>
        <div>
          <p className="text-gray-700">Created by</p>
          <p className="text-black font-medium text-md">
            {email
              ? email.split("@")[0].charAt(0) + email.split("@")[0].slice(1)
              : "User"}
          </p>
        </div>
      </div>
    </div>
  );
};
