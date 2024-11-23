import { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

const SelectedContext = createContext();

export function SelectedProvider({ children }: { children: ReactNode }) {
  const [selectedItem, setSelectedItem] = useState(); // Default selected item

  return (
    <SelectedContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </SelectedContext.Provider>
  );
}

export function useSelectedItem() {
  return useContext(SelectedContext);
}
