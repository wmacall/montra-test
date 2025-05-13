import {
  GroupedTranscriptions,
  SortDirection,
  SortField,
  TranscriptionResponse,
} from "@/types";
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

export const sortTranscriptions = (
  groupedData: GroupedTranscriptions[],
  field: SortField,
  direction: SortDirection
): GroupedTranscriptions[] => {
  if (field === "created_at" && direction === "desc") {
    return groupedData.sort((a, b) => {
      const order = ["Last 7 Days", "Yesterday", "Today"];
      return order.indexOf(a.title) - order.indexOf(b.title);
    });
  } else if (field === "created_at" && direction === "asc") {
    return groupedData.sort((a, b) => {
      const order = ["Today", "Yesterday", "Last 7 Days"];
      return order.indexOf(a.title) - order.indexOf(b.title);
    });
  } else if (field === "updated_at") {
    return groupedData.map((group) => ({
      ...group,
      data: group.data.sort((a, b) => {
        const dateA = new Date(a.updated_at || 0).getTime();
        const dateB = new Date(b.updated_at || 0).getTime();
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }),
    }));
  }
  return groupedData;
};
