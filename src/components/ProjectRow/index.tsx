import { FC, MouseEvent } from "react";
import { MoreHorizontal, FileText } from "lucide-react";
import { formatDateMMMMD } from "@/lib/formatDateMMMMD";
import { useRouter } from "next/navigation";
import { useTranscription } from "@/context/TranscriptionContext";
import { TranscriptionResponse } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ProjectRowProps extends TranscriptionResponse {
  onDeleteTranscription: (id: string) => void;
}

export const ProjectRow: FC<ProjectRowProps> = (transcription) => {
  const { push } = useRouter();
  const { onSetTranscriptionData } = useTranscription();
  const { title, created_at, updated_at, onDeleteTranscription } =
    transcription;

  const handleClickTranscription = () => {
    onSetTranscriptionData(transcription);
    push("/new-document");
  };

  const handleDeleteTranscription = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onDeleteTranscription(transcription.id);
  };

  return (
    <div
      onClick={handleClickTranscription}
      className="w-full border-b border-gray-300/30 cursor-pointer p-1"
    >
      <div className="flex items-center justify-between w-full  hover:bg-neutral-50 p-3 rounded-xl transition-all duration-300 ease-in-out gap-2">
        <div className="flex items-center gap-2 flex-4">
          <div className="h-8 w-8 items-center justify-center rounded-lg bg-white flex border border-gray-300/30">
            <FileText className="w-4 h-4 text-gray-500" />
          </div>
          <span className="text-black font-medium text-sm">{title}</span>
        </div>
        <div className="flex items-center justify-start flex-1">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-1.5 h-5 gap-1">
            <span className="h-1 w-1 rounded-full bg-orange-500"></span>
            <span className="text-gray-700 text-sm font-medium">
              Investor Updates
            </span>
          </div>
        </div>
        <div className="flex items-center flex-1 justify-center">
          <span className="text-gray-500">{formatDateMMMMD(created_at)}</span>
        </div>
        <div className="flex items-center flex-1 justify-center">
          <span className="text-gray-500">
            {formatDateMMMMD(updated_at ? updated_at : created_at)}
          </span>
        </div>
        <div className="flex items-center flex-[0.5] justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none">
                <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleDeleteTranscription}
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
