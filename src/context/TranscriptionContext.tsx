"use client";
import { TranscriptionResponse } from "@/types";
import { createContext, FC, ReactNode, useContext, useState } from "react";

interface TranscriptionContextType {
  transcription: string;
  setTranscription: (text: string) => void;
  createdAt: string | null;
  setCreatedAt: (date: string) => void;
  title: string | null;
  setTitle: (title: string) => void;
  summary: string | null;
  setSummary: (summary: string | null) => void;
  onSetTranscriptionData: (transcription: TranscriptionResponse) => void;
}

const TranscriptionContext = createContext<
  TranscriptionContextType | undefined
>(undefined);

export const TranscriptionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transcription, setTranscription] = useState("");
  const [createdAt, setCreatedAt] = useState<string | null>("");
  const [title, setTitle] = useState<string | null>("");
  const [summary, setSummary] = useState<string | null>("");

  const onSetTranscriptionData = (transcription: TranscriptionResponse) => {
    setTitle(transcription.title);
    setCreatedAt(transcription.created_at);
    setSummary(transcription.summary);
  };

  return (
    <TranscriptionContext.Provider
      value={{
        transcription,
        setTranscription,
        createdAt,
        setCreatedAt,
        title,
        setTitle,
        summary,
        setSummary,
        onSetTranscriptionData,
      }}
    >
      {children}
    </TranscriptionContext.Provider>
  );
};

export const useTranscription = (): TranscriptionContextType => {
  const context = useContext(TranscriptionContext);
  if (!context) {
    throw new Error(
      "useTranscription must be used within a TranscriptionProvider"
    );
  }
  return context;
};
