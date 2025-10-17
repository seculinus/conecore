import { parsePoints, PointBase } from "./utils/point";
import { Canvas } from "@react-three/fiber";
import {Nodes, NavigationMenu } from "./components";
import { useRef, useState, ReactNode, useMemo, useContext } from "react";
import { OrbitControls } from "@react-three/drei";
import "./Plot.css";
import { RefObject } from "react";
import { StateContext } from "./components/StateContext";
import { CursorTracker } from "./components/CursorTracker";
import { OrbitControlsProps } from "@react-three/drei";
// import { Cells } from "./Cells";
import { ControlBridge } from "./components/ControlBridge";
import { ChakraProvider } from "@chakra-ui/react";
import { PointTable } from "./components/ui/PointTable";
import { DEFAULT_POINTS } from "./components/constants";
import { Node } from "./components";
// import { Nodes2 } from "./components/Nodes";
import { StateProvider } from "./components/StateProvider";

export const points : PointBase[] = parsePoints();
const defaultPosition = points[2];




//Ortographic camera is affecting the mos
function Plot() {
  const [stateContext, setState] = useState(null);
  // const [initialPoints, setPoints] = useState(DEFAULT_POINTS);
  const {positions, setPoints} = useContext(StateContext)

  console.log("I se echange also here")
  //Memoize the context value so it only changes when stateContext actually changes.
  const contextValue = useMemo(()=>({stateContext,setState, positions, setPoints}),[stateContext, positions])
  
  return (
  <div style ={{position: 'relative', width: '100vw', height: '100vh'}}>
   <StateProvider>
    <Canvas className ="wrapper" orthographic camera={{ position: [0, 0, 10]}}  >
        <ControlBridge/>
        <OrbitControls makeDefault ={true} enableRotate ={false}/>
        <ambientLight intensity={5}/> 
        <CursorTracker/>   
        <Nodes positions = {contextValue.positions}></Nodes>
        {/* <Nodes2></Nodes2> */}
      </Canvas>
     <PointTable/>
    <NavigationMenu></NavigationMenu>

   </StateProvider>
  </div>

  );
}

export default Plot;



