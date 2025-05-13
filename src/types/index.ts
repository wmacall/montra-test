export interface TranscriptionResponse {
  id: string;
  user_id: string;
  raw_text: string;
  summary: string | null;
  created_at: string;
  title: string;
  updated_at: string | null;
}

export interface GroupedTranscriptions {
  title: string;
  data: TranscriptionResponse[];
}
