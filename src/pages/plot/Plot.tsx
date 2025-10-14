import { parsePoints, PointBase } from "./utils/point";
import { Canvas } from "@react-three/fiber";
import {Nodes, NavigationMenu } from "./components";
import { useRef, useState, ReactNode, useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import "./Plot.css";
import { RefObject } from "react";
import { StateContext } from "./components/StateContext";
import { CursorTracker } from "./components/CursorTracker";
import { OrbitControlsProps } from "@react-three/drei";
import { Cells } from "./Cells";
import { ControlBridge } from "./components/ControlBridge";
import { ChakraProvider } from "@chakra-ui/react";
import { PointTable } from "./components/ui/PointTable";


export const points : PointBase[] = parsePoints();
const defaultPosition = points[2];




//Ortographic camera is affecting the mos
function Plot() {
  const [stateContext, setState] = useState(null);

  //Memoize the context value so it only changes when stateContext actually changes.
  const contextValue = useMemo(()=>({stateContext,setState}),[stateContext])
  
  return (
  <div style ={{position: 'relative', width: '100vw', height: '100vh'}}>
   <StateContext.Provider value ={contextValue}>
    <Canvas className ="wrapper" orthographic camera={{ position: [0, 0, 10]}}  >
        <ControlBridge/>
        <OrbitControls makeDefault ={true} enableRotate ={false}/>
        <ambientLight intensity={5}/> 
        <CursorTracker/>   
        <Nodes></Nodes>
      </Canvas>
     <PointTable/>
    <NavigationMenu></NavigationMenu>
   

  </StateContext.Provider>
  </div>

  );
}

export default Plot;



