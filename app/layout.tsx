import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { CursorProvider } from "@/context/CursorContext";

export const metadata: Metadata = {
  title: "Reactive - Our Process",
  description: "Interactive process visualization built with Next.js + TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <CursorProvider>
        <body className="bg-black text-white font-[Poppins] overflow-hidden">
          <CustomCursor />
          {children}
        </body>
      </CursorProvider>
    </html>
  );
}