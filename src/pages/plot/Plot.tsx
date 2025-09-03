import { parsePoints } from "../../utils/point";
import { Canvas, ThreeElement, useThree } from "@react-three/fiber";
import { GridCells } from "./grid";
import { useRef, useEffect, useState, Fragment, ReactNode } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import "./Plot.css";

type ThreeInput = [number, number, number];
type CellBaseProps = {
  position: ThreeInput | THREE.Vector3;
  size: [width?: number, height?: number];
};

function handlePointClick() {
  const points = parsePoints();
  console.log(points);
}

function CellBase({ position, size }: CellBaseProps) {
  
  const [isHovered, setIsHovered] = useState(false);
  const handlePointerOver = ()=>{setIsHovered(true)}
  const handlePointerOut = ()=>{setIsHovered(false)}

  return (
    <mesh position={position} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} scale={isHovered ? 1.1 : 1}>
      <Html distanceFactor={7} position={[0, 0, 0]}>
        {isHovered ? 
          <div className="content">
            {position instanceof THREE.Vector3
              ? `${(position.x, position.y, position.z)}`
              : `${position[0]}${position[1]}${position[2]}`}
          </div> :
          <></>
        }
      </Html>
      <planeGeometry args={size}/>
      <meshStandardMaterial color={isHovered ? "#A1EED6" : "#F2B694"}/>
    </mesh>
  );
}

function Scene(children : any) {
  const camera = useRef<THREE.OrthographicCamera | null>(null);
  const controls = useRef<any>(null);
  useEffect(() => {
    if (camera.current && controls.current) {
      //Position camera above the XY plane
      camera.current.position.set(0, 0, 10);
      camera.current.lookAt(0, 0, 0);
      //Points the controls target at the origin
      controls.current.target.set(0, 0, 0);
      //Update Control
      camera.current.updateProjectionMatrix();
      controls.current.update();
    }
  }, []);

  return (
    <>
      {/* <orthographicCamera ref={camera} position={[0, 0, 10]} left={-10} right={10} top={10} bottom={-10} near={0.1} far={100}/> */}
      <OrbitControls ref={controls} target={[0, 0, 0]} enablePan={true} enableZoom={true} enableRotate={false}/>
      <ambientLight intensity={2} color="white"></ambientLight>{" "}
      <CellBase position={[0, 0, 0]} size={[1, 1]}></CellBase>
      <CellBase position={[1, 1, 0]} size={[1, 1]}></CellBase>
    </>
  );
}

function Plot() {
  const container = useRef(null);

  return (

    <Canvas camera={{ position: [0, 0, 10]} }  ref = {container}>
        <GridCells/>
        <CursorTracker/>
        <Scene/>
        
    </Canvas>

    
  );
}
interface Props{
  children?: ReactNode
}



function CursorTracker({children}:Props){
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  
  return (
     <>
      <mesh 
      position={[0,0,-0.1]} 
      onPointerMove={(e)=>{setPosition(e.point)}}
      >
        <planeGeometry args ={[2e6,2e6]}/>
        <meshBasicMaterial transparent opacity={0}/>
      </mesh>
      <Html className="content" distanceFactor={7} position={[0, 3, 3]}>
        <div>
          {`${(position.x).toFixed(2)}:${position.y.toFixed(2)}`}
          {children}
        </div>
      </Html> 
     </>
  )
}

export default Plot;
