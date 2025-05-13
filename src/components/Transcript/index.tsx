import { useTranscription } from "@/context/TranscriptionContext";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";

export const Transcript = () => {
  const { transcription } = useTranscription();

  const handlePressCopy = async () => {
    await navigator.clipboard.writeText(transcription);
  };

  if (!transcription) {
    return null;
  }

  return (
    <div className="flex flex-col border-b border-gray-300/50 px-3 py-4 gap-2 relative">
      <p className="text-xs font-medium text-neutral-700">Transcript</p>
      <div className="w-full border rounded-md border-gray-300/50 relative">
        <div className="w-full h-4 bg-white/60 bottom-0 absolute gradient-to-b from-white/50 white" />
        <p className="text-sm text-gray-800 pl-3 pr-3 pt-3 ">{transcription}</p>
      </div>
      <Button
        variant="outline"
        className="relative h-[28px] shadow-sm my-2"
        onClick={handlePressCopy}
      >
        <Copy size={8} />
        Copy Text
      </Button>
    </div>
  );
};
