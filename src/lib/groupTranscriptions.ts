import { GroupedTranscriptions, TranscriptionResponse } from "@/types";
import { isToday, isYesterday, subDays, isAfter } from "date-fns";

export const groupTranscriptions = (
  transcriptions: TranscriptionResponse[]
): GroupedTranscriptions[] => {
  const today: TranscriptionResponse[] = [];
  const yesterday: TranscriptionResponse[] = [];
  const last7Days: TranscriptionResponse[] = [];

  const sevenDaysAgo = subDays(new Date(), 7);

  transcriptions.forEach((transcription) => {
    const createdAt = new Date(transcription.created_at);

    if (isToday(createdAt)) {
      today.push(transcription);
    } else if (isYesterday(createdAt)) {
      yesterday.push(transcription);
    } else if (isAfter(createdAt, sevenDaysAgo)) {
      last7Days.push(transcription);
    }
  });

  return [
    { title: "Today", data: today },
    { title: "Yesterday", data: yesterday },
    { title: "Last 7 Days", data: last7Days },
  ];
};
