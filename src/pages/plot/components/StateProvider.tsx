// StateProvider.tsx
import { useState } from "react";
import { StateContext } from "./StateContext";

export function StateProvider({ children }) {
  const [stateContext, setState] = useState(null);
  const [positions, setPoints] = useState([]);

  return (
    <StateContext.Provider value={{ stateContext, setState, positions, setPoints }}>
      {children}
    </StateContext.Provider>
  );
}