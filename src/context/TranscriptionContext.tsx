"use client";
import { createContext, FC, ReactNode, useContext, useState } from "react";

interface TranscriptionContextType {
  transcription: string;
  setTranscription: (text: string) => void;
}

const TranscriptionContext = createContext<
  TranscriptionContextType | undefined
>(undefined);

export const TranscriptionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transcription, setTranscription] = useState("");

  return (
    <TranscriptionContext.Provider value={{ transcription, setTranscription }}>
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
