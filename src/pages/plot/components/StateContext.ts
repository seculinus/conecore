import { createContext } from "react";
import { OrbitControlsProps } from "@react-three/drei";

export const StateContext = createContext({
    stateContext:null,
    setState:(state:any)=>{},
    });

