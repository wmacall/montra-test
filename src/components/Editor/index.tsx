"use client";
import { ReactNode, useEffect, useRef } from "react";
import { useEditor, EditorContent, Editor as EditorType } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Placeholder from "@tiptap/extension-placeholder";
import { VoiceRecorder } from "../VoiceRecorder";
import { Transcript } from "../Transcript";
import { ProjectDetails } from "../ProjectDetails";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Type,
  X,
  Mic,
} from "lucide-react";
import { useTranscription } from "@/context/TranscriptionContext";
import { supabase } from "@/db/supabase";
import { useSession } from "@/context/SessionContext";
import { Loader } from "../Loader";

const toolbarButtons: {
  icon: ReactNode;
  action: (editor: EditorType) => void;
}[] = [
  {
    icon: <Type size={16} />,
    action: (editor: EditorType) => editor.chain().focus().setParagraph().run(),
  },
  {
    icon: <Heading1 size={16} />,
    action: (editor: EditorType) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    icon: <Heading2 size={16} />,
    action: (editor: EditorType) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    icon: <Heading3 size={16} />,
    action: (editor: EditorType) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    icon: <Bold size={16} />,
    action: (editor: EditorType) => editor.chain().focus().toggleBold().run(),
  },
  {
    icon: <Italic size={16} />,
    action: (editor: EditorType) => editor.chain().focus().toggleItalic().run(),
  },
  {
    icon: <UnderlineIcon size={16} />,
    action: (editor: EditorType) =>
      editor.chain().focus().toggleUnderline().run(),
  },
  {
    icon: <s>S</s>,
    action: (editor: EditorType) => editor.chain().focus().toggleStrike().run(),
  },
  {
    icon: <List size={16} />,
    action: (editor: EditorType) =>
      editor.chain().focus().toggleBulletList().run(),
  },
  {
    icon: <ListOrdered size={16} />,
    action: (editor: EditorType) =>
      editor.chain().focus().toggleOrderedList().run(),
  },
  {
    icon: <LinkIcon size={16} />,
    action: (editor: EditorType) =>
      editor
        .chain()
        .focus()
        .toggleLink({ href: prompt("Enter URL") || "" })
        .run(),
  },
  {
    icon: <AlignLeft size={16} />,
    action: (editor: EditorType) =>
      editor.chain().focus().setTextAlign("left").run(),
  },
  {
    icon: <AlignCenter size={16} />,
    action: (editor: EditorType) =>
      editor.chain().focus().setTextAlign("center").run(),
  },
  {
    icon: <AlignRight size={16} />,
    action: (editor: EditorType) =>
      editor.chain().focus().setTextAlign("right").run(),
  },
  {
    icon: <Quote size={16} />,
    action: (editor: EditorType) =>
      editor.chain().focus().toggleBlockquote().run(),
  },
];

export const Editor = () => {
  const {
    transcription,
    summary,
    transcriptionId,
    onSetTranscriptionData,
    isLoading,
  } = useTranscription();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Underline,
      Link,
      Blockquote,
      Strike,
      TextAlign,
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: "",
  });

  const { session } = useSession();
  const isSaving = useRef(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!editor) return;

    const handleSave = async () => {
      if (isSaving.current || !editor) return;
      isSaving.current = true;

      const content = editor.getHTML();
      const json = editor.getJSON();
      const firstNode = json.content?.[0];
      const text = firstNode?.content?.map((node) => node.text).join("") || "";

      try {
        if (!transcriptionId) {
          const { error, data } = await supabase
            .from("transcripts")
            .insert([
              {
                user_id: session?.user.id,
                summary: content,
                title: text.slice(0, 20),
              },
            ])
            .select();
          if (data) {
            onSetTranscriptionData(data[0]);
          }
          if (error) console.error("Insert error:", error);
        } else {
          const { error } = await supabase
            .from("transcripts")
            .update({
              summary: content,
            })
            .eq("id", transcriptionId);

          if (error) console.error("Update error:", error);
        }
      } catch (err) {
        console.error("Unexpected error saving draft:", err);
      } finally {
        isSaving.current = false;
      }
    };

    const handleUpdate = () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(handleSave, 1500);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [editor, transcriptionId, session]);

  useEffect(() => {
    if (editor && summary) {
      editor.commands.setContent(summary);
    }
  }, [editor, summary]);

  if (!editor) return null;

  return (
    <div className="flex flex-1">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col w-full flex-1">
            <div className="flex flex-col">
              <div className="flex w-full justify-center gap-1 items-center border-b border-gray-300/50 bg-white h-10">
                {toolbarButtons.map((button, index) => (
                  <div
                    key={index}
                    onClick={() => button.action(editor)}
                    className="bg-white h-[28px] w-[28px] flex items-center justify-center cursor-pointer hover:bg-gray-100"
                  >
                    {button.icon}
                  </div>
                ))}
              </div>
            </div>
            <EditorContent className="py-16 px-6" editor={editor} />
          </div>
          <div className="flex flex-col border-b border-l border-gray-300/50 bg-white w-[268px]">
            <div className="flex flex-row h-10 border-b border-l border-gray-300/50 bg-white items-center justify-between px-3">
              <p className="text-black font-medium">
                {transcription.length > 0 ? "Input" : "New Draft"}
              </p>
              <X size={18} color="#707070" />
            </div>
            <VoiceRecorder />
            <Transcript />
            <ProjectDetails />
          </div>
        </>
      )}

      <div className="flex flex-col bg-gray-100 p-2 border-b border-l border-gray-300/50">
        <div className="h-8 w-8 rounded-sm bg-neutral-200 items-center justify-center flex">
          <Mic size={20} color="#505050" />
        </div>
      </div>
    </div>
  );
};
