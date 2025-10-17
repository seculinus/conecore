import { createContext } from "react";
import { OrbitControlsProps } from "@react-three/drei";

export interface PlotContextType {
  stateContext: any;
  setState: (state: any) => void;
  positions: { x: number; y: number }[] | null;
  setPoints: (points: { x: number; y: number }[]) => void;
}
export const StateContext = createContext({
    stateContext:null,
    setState:(state:any)=>{},
    positions: null,
    setPoints: (points:any)=>{},
    });

