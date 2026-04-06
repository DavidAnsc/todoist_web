import { useState } from "react";
import { SelectionContext } from "./SelectionContext";

export function SelectionProvider({ children }) {
  const [selected, setSelected] = useState(0);

  return (
    <SelectionContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectionContext.Provider>
  );
}
