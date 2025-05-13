"use client";
import { ReactNode } from "react";
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
} from "lucide-react";

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
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Underline,
      Link,
      Blockquote,
      Strike,
      TextAlign,
      Text,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: "",
  });

  if (!editor) return null;

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full justify-center gap-1 items-center py-1.5 border-b border-gray-300/50 bg-white">
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
      <EditorContent className="mx-6" editor={editor} />
    </div>
  );
};
