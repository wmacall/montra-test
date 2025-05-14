import { Anthropic } from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "";

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { transcription } = await req.json();

    const SYSTEM_PROMPT = `
    You are tasked with reformatting and rewriting user-provided content. Your goal is to create a clear, effective, and well-structured output that retains the ideas, message and style of the user's input.

    Follow these instructions very carefully and precisely:

    A. Here is the user's input. This could be transcribed voice memos, text files, or other forms of written content.
    <user_input>
    ${transcription}
    </user_input>

    B. Additionally, refer to the following dictionary of words for automatic correction:
    <dictionary>
    {}
    </dictionary>

    C. Here is a list of available HTML Tags that can be used:
    <html_library>
    - <p> (Used for paragraphs and sections)
    - <h1>, <h2>, <h3> (Used for headings)
    - <ul>, <ol> (<ul> for bullet list, <ol> for ordered list)
    - <strong> (Used to make text appear as bold)
    - <em> (Used to lay emphasis)
    </html_library>

    2. Rewrite and reformat the content as necessary, keeping the following guidelines in mind:
    a. Use the html_library above to apply structure and formatting.
    b. Break long paragraphs into smaller sections.
    c. Highlight key ideas or terms where helpful.
    d. Do not change the tone or message of the input.
    `;

    const msg = await anthropic.messages.create({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 1024,
      messages: [{ role: "user", content: SYSTEM_PROMPT }],
    });

    return NextResponse.json({ data: msg.content[0] });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
