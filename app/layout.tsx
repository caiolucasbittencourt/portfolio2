import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { CursorProvider } from "@/context/CursorContext";

export const metadata: Metadata = {
  title: "Caio Bittencourt | Front-end Developer",
  description: "",
  icons: {
    icon: "./favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-black text-white font-[Poppins] overflow-hidden">
        <CursorProvider>
          <CustomCursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
