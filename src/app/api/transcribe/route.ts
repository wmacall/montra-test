import { NextRequest, NextResponse } from "next/server";

const DEEPGRAM_API_KEY = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || "";
const DEEPGRAM_API_URL = process.env.NEXT_PUBLIC_DEEPGRAM_API_URL || "";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("audio") as Blob;

  if (!file) {
    return NextResponse.json({ error: "No audio file found" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const response = await fetch(`${DEEPGRAM_API_URL}/listen`, {
    method: "POST",
    headers: {
      Authorization: `Token ${DEEPGRAM_API_KEY}`,
      "Content-Type": "audio/webm",
    },
    body: buffer,
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ error }, { status: response.status });
  }

  const data = await response.json();
  const transcript =
    data.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

  return NextResponse.json({ transcript });
}
