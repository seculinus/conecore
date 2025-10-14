import { useThree } from "@react-three/fiber";
import { useContext, useEffect, useRef } from "react";
import { StateContext } from "./StateContext";

export function ControlBridge(): any {
  console.log("helloJane")
  const state = useThree(); 
  const { setState } = useContext(StateContext);
  const hasSetState = useRef(false);


  useEffect(() => {
    if(state.controls && !hasSetState.current ){
      console.log("Setting state wiht controls")
      setState(state);
      hasSetState.current = true;
    }
  });
  return null;

}
