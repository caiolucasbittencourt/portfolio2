// context/CursorContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from "react";

// Define o tipo de dados que nosso contexto irá fornecer
interface CursorContextType {
  isBlack: boolean;
  setIsBlack: (isBlack: boolean) => void;
}

// Cria o contexto com um valor padrão
const CursorContext = createContext<CursorContextType | null>(null);

// Cria o Provedor, que irá gerenciar o estado
export function CursorProvider({ children }: { children: ReactNode }) {
  const [isBlack, setIsBlack] = useState(false);

  return (
    <CursorContext.Provider value={{ isBlack, setIsBlack }}>
      {children}
    </CursorContext.Provider>
  );
}

// Cria um hook customizado para usar o contexto facilmente
export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}