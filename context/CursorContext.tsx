"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface CursorContextType {
  isBlack: boolean;
  setIsBlack: (isBlack: boolean) => void;
}

const CursorContext = createContext<CursorContextType | null>(null);
export function CursorProvider({ children }: { children: ReactNode }) {
  const [isBlack, setIsBlack] = useState(false);

  return (
    <CursorContext.Provider value={{ isBlack, setIsBlack }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}