/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";
import { Button } from "@/components/ui/button";
import { Mic, Play, RefreshCcw, StopCircle, PauseCircle } from "lucide-react";

enum RecordingState {
  IDLE = "idle",
  RECORDING = "recording",
  PAUSED = "paused",
  STOPPED = "stopped",
}

export const VoiceRecorder = () => {
  const [recordingState, setRecordingState] = useState<RecordingState>(
    RecordingState.RECORDING
  );
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordRef = useRef<RecordPlugin>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const [canGenerateTranscription, setCanGenerateTranscription] =
    useState(true);

  useEffect(() => {
    if (!waveformRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#4F46E5",
      progressColor: "#818CF8",
      cursorColor: "transparent",
      barWidth: 2,
      barGap: 3,
      barRadius: 3,
      height: 80,
      normalize: true,
    });

    const record = wavesurfer.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: false,
        scrollingWaveform: true,
      })
    );

    record.on("record-start", () => {
      startTimer();
    });

    record.on("record-pause", (blob: Blob) => {
      pauseTimer();

      if (blob) {
        if (audioUrlRef.current) {
          URL.revokeObjectURL(audioUrlRef.current);
        }
        audioUrlRef.current = URL.createObjectURL(blob);

        if (audioRef.current) {
          audioRef.current.src = audioUrlRef.current;
        }
      }
    });
    record.on("record-end", (blob: Blob) => {
      stopTimer();

      if (blob) {
        if (audioUrlRef.current) {
          URL.revokeObjectURL(audioUrlRef.current);
        }
        audioUrlRef.current = URL.createObjectURL(blob);

        if (audioRef.current) {
          audioRef.current.src = audioUrlRef.current;
        }
      }
    });

    wavesurferRef.current = wavesurfer;
    recordRef.current = record;

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
      wavesurfer.destroy();
    };
  }, []);

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopTimer = () => {
    pauseTimer();
  };

  const resetTimer = () => {
    pauseTimer();
  };

  const startRecording = async () => {
    if (!recordRef.current) return;

    try {
      if (recordingState === RecordingState.IDLE) {
        resetTimer();
        await recordRef.current.startRecording();
        setRecordingState(RecordingState.RECORDING);
      } else if (recordingState === RecordingState.PAUSED) {
        await recordRef.current.resumeRecording();
        setRecordingState(RecordingState.RECORDING);
      }
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const pauseRecording = async () => {
    if (!recordRef.current || recordingState !== RecordingState.RECORDING)
      return;

    try {
      await recordRef.current.pauseRecording();
      setRecordingState(RecordingState.PAUSED);
    } catch (error) {
      console.error("Error pausing recording:", error);
    }
  };

  const stopRecording = async () => {
    if (!recordRef.current || recordingState === RecordingState.IDLE) return;
    try {
      await recordRef.current.stopRecording();
      setRecordingState(RecordingState.STOPPED);
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleGenerateTranscription = async () => {
    try {
      if (!audioUrlRef.current) return;
      const response = await fetch(audioUrlRef.current);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      const transcriptionResponse = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const transcriptionData = await transcriptionResponse.json();
      console.log("Blob:", transcriptionData.transcript);
      setCanGenerateTranscription(false);
    } catch (error) {
      console.log("Error generating transcription:", error);
    }
  };

  const resetRecorder = () => {
    if (recordingState === RecordingState.IDLE) return;
    resetTimer();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    if (wavesurferRef.current) {
      wavesurferRef.current.empty();
    }
    setRecordingState(RecordingState.IDLE);
  };

  return (
    <div className="px-3 py-4 flex flex-col gap-2">
      <div className="text-gray-500">Click to start recording a voice memo</div>
      <div
        ref={waveformRef}
        className="rounded-lg overflow-hidden h-[88px] bg-gray-50 relative"
      >
        {recordingState === RecordingState.RECORDING ||
        recordingState === RecordingState.PAUSED ||
        recordingState === RecordingState.STOPPED ? (
          <div
            onClick={resetRecorder}
            className="h-5 w-5 bg-white absolute top-1 right-1 rounded-sm border-2 border-b-gray-50 shadow-sm flex items-center justify-center z-10 cursor-pointer"
          >
            <RefreshCcw size={12} color="#505050" />
          </div>
        ) : null}
      </div>
      <audio ref={audioRef} className="hidden" />
      {recordingState === RecordingState.PAUSED ||
      recordingState === RecordingState.STOPPED ? (
        <Button
          onClick={playAudio}
          variant="outline"
          className="shadow-sm relative"
        >
          <Play size={8} className="absolute left-2" />
          Play
        </Button>
      ) : null}
      <div className="flex justify-center gap-2">
        {recordingState === RecordingState.IDLE ||
        recordingState === RecordingState.PAUSED ? (
          <Button
            onClick={startRecording}
            variant="outline"
            className="flex-1 relative h-[28px] shadow-sm"
          >
            <Mic size={8} className="absolute left-2" />
            {recordingState === RecordingState.IDLE ? "Record Memo" : "Resume"}
          </Button>
        ) : recordingState === RecordingState.RECORDING ? (
          <Button
            variant="outline"
            onClick={pauseRecording}
            className="flex-1 relative h-[28px] shadow-sm"
          >
            <PauseCircle size={8} className="absolute left-2" />
            Pause
          </Button>
        ) : null}
        {recordingState === RecordingState.RECORDING ||
        recordingState === RecordingState.PAUSED ? (
          <Button
            variant="outline"
            onClick={stopRecording}
            className="flex-1 relative h-[28px] shadow-sm"
          >
            <StopCircle size={8} className="absolute left-2" />
            Stop
          </Button>
        ) : null}
        {recordingState === RecordingState.STOPPED &&
        canGenerateTranscription ? (
          <Button
            onClick={handleGenerateTranscription}
            className="relative flex-1"
          >
            Generate
          </Button>
        ) : null}
      </div>
    </div>
  );
};
