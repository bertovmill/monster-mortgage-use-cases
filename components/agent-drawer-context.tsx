"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface DrawerContextValue {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const DrawerContext = createContext<DrawerContextValue>({
  isOpen: false,
  toggle: () => {},
  open: () => {},
  close: () => {},
});

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        toggle: () => setIsOpen(v => !v),
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export const useDrawer = () => useContext(DrawerContext);
