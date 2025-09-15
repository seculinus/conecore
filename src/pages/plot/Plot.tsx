import { parsePoints } from "../../utils/point";
import { Canvas, ThreeElement, useThree } from "@react-three/fiber";
import { GridCells } from "./grid";
import { useRef, useEffect, useState, Fragment, ReactNode } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import "./Plot.css";

const points : Point[]= parsePoints();

type Point ={
  x: number;
  y:number;
  name:string;
}

type ThreeInput = [number, number, number];
type CellBaseProps = {
  position: ThreeInput | THREE.Vector3;
  size: [width?: number, height?: number];
};



function MoveCamera(){
  const {camera, size} = useThree();
  const [isMoved, setMoved] = useState(false);
  const pt = points[2];

  const tagPosition = new THREE.Vector3(-5,5,0);

  const handleClick = () => {
    camera.position.set(pt.x,pt.y,10);
    camera.lookAt(pt.x,pt.y,0);
    setMoved(!isMoved);
    console.log(camera)
  }

  return(
    <Html  distanceFactor={400} position={camera.position}>
      <div className="content" style={{width:40,height:20, background:'#202035', transform: 'translate3d(calc(50% + 40px), 0, 0)',  position:'absolute', left:50}}onClick={handleClick}>MC</div>
    </Html>
  )
}


function ReturnCameraXY(){}


// function PointButton() {

//   console.log(points);
//   return (
//     <Html>
//       <div className = "btn-pt"style={{width:140,height:40 } } onClick={() =>
//       {
//         points = parsePoints();
//         console.log(points)
//       }
//     }
//       >PressMe
//       </div>
//     </Html>
//   )

// }

function CellBase({ position, size }: CellBaseProps) {
  
  const [isHovered, setIsHovered] = useState(false);
  const handlePointerOver = () => {setIsHovered(true)}
  const handlePointerOut = () => {setIsHovered(false)}


  return (
    <mesh position={position} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} scale={isHovered ? 1.1 : 1}>
      <planeGeometry args={size}/>
      <meshStandardMaterial color={isHovered ? "#A1EED6" : "#F2B694"}/>
    </mesh>
  );
}

function Scene(children : any) {
  const camera = useRef<THREE.OrthographicCamera | null>(null);
  const controls = useRef<any>(null);

  const cellbases = points.map((pos, i) =>{
         return <CellBase  key = {i} position={[pos.x,pos.y, 0]} size={[1, 1]}></CellBase>
       })
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
      {cellbases}
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
          <MoveCamera></MoveCamera>
          {/* <PointButton></PointButton> */}
      </Canvas>


  );
}


interface Props{
  children?: ReactNode
}


function CursorTracker({children}:Props){
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  const {camera}  = useThree();
  const meshPos = new THREE.Vector3(0,0,-0.1);
  
  console.log(camera.lookAt)
  return (
     <>
      <mesh 
      position={meshPos} 
      onPointerMove={(e)=>{setPosition(e.point)}}
      >
        <planeGeometry args ={[2e7,2e7]}/>
        <meshBasicMaterial transparent opacity={0}/>
      </mesh>
      <Html className="content" distanceFactor={400} position={camera.position}>
        <div>
          <span style={{color: '#FFCCCB'}}>X:{(position.x).toFixed(2)}</span>
          <span style = {{color:'#CCFEFF'}}>Y:{position.y.toFixed(2)}</span>
          {children}
        </div>
      </Html> 
     </>
  )
}

export default Plot;
