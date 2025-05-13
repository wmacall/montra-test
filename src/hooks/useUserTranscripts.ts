import { useSession } from "@/context/SessionContext";
import { supabase } from "@/db/supabase";
import { TranscriptionResponse } from "@/types";

export const useUserTranscripts = () => {
  const { session } = useSession();

  const onGetUserTranscripts = async (): Promise<TranscriptionResponse[]> => {
    const { data, error } = await supabase
      .from("transcripts")
      .select("*")
      .eq("user_id", session?.user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching transcripts:", error);
      return [];
    }
    return data as TranscriptionResponse[];
  };

  return {
    onGetUserTranscripts,
  };
};
