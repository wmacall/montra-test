import { format } from "date-fns";

export const formatDateMMMMD = (dateString?: string | null): string => {
  if (!dateString) return "Unknown date";
  try {
    return format(new Date(dateString), "MMMM d, yyyy");
  } catch {
    return "Unknown date";
  }
};
