import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/context/SessionContext";
import { Toaster } from "sonner";
import { TranscriptionProvider } from "@/context/TranscriptionContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Montra Technical Test",
  description: "Montra Technical Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Toaster />
        <SessionProvider>
          <TranscriptionProvider>{children}</TranscriptionProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
