import { parsePoints, PointBase } from "./utils/point";
import { Canvas, useThree } from "@react-three/fiber";
import {Nodes, NavigationMenu } from "./components";
import { useRef, useEffect, useState, useContext, ReactNode } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import "./Plot.css";
import { RefObject } from "react";
import { StateContext } from "./components/StateContext";
import { CursorTracker } from "./components/CursorTracker";
import { OrbitControlsProps } from "@react-three/drei";
import { Cells } from "./Cells";

export const points : PointBase[] = parsePoints();
const defaultPosition = points[2];

interface ControlProps {
  controlsRef: RefObject<React.ComponentRef<typeof OrbitControls>>;
}



export function MoveCamera({controlsRef} : ControlProps){

  const {camera, } = useThree();
  const [isMoved, setMoved] = useState(false);
  const pt = points[2];

  const handleClick = () => {
    camera.position.set(pt.x,pt.y,100);
    controlsRef.current.target.set(pt.x,pt.y,0);
    controlsRef.current.update();
    setMoved(!isMoved);
  }

  return(
    <Html  distanceFactor={400} position={camera.position}>
      <div className="" style={{width:40,height:20, background:'#202035', transform: 'translate3d(calc(50% + 40px), 0, 0)',  position:'absolute', left:50}}onClick={handleClick}>MC</div>
    </Html>
  )
}
//Ortographic camera is affecting the mos
function Plot() {

  const [stateContext, setState] = useState(null);
  return (

  
  <div style ={{position: 'relative', width: '100vw', height: '100vh'}}>
   <StateContext.Provider value ={{stateContext, setState}}>
    <Canvas className ="wrapper" orthographic camera={{ position: [0, 0, 10]}}  >
        <ControlBridge/>
        <OrbitControls makeDefault ={true} enableRotate ={false}/>
        <ambientLight intensity={5}/> 
        <CursorTracker/>   
        <Nodes></Nodes>
      </Canvas>
    <NavigationMenu></NavigationMenu>
  </StateContext.Provider>
  </div>

  );
}

function ControlBridge() :any{
  
  const state = useThree();
  const {setState} = useContext(StateContext);

  useEffect(()=>{
    setState(state);
  },[state, setState])
  return null;
  
}



export default Plot;
//It works on zoom, but not on span by camera
function Tab(){
  return (
  <div style ={{ position:'absolute',
      width:'100vw',
      height:50,
      border:"1px solid black",
      top:5}}>
        
      </div>
   )
}



