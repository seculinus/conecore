import { parsePoints } from "../../utils/point";
import { Canvas, useThree } from "@react-three/fiber";
import {Nodes, NavigationMenu } from "./components";
import { useRef, useEffect, useState, useContext, ReactNode } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import "./Plot.css";
import { RefObject } from "react";
import { CameraContext } from "./components/CameraContext";


type Point ={
  x: number;
  y:number;
  name:string;
}

type ThreeInput = [number, number, number];

type CellBaseProps = {
  position: ThreeInput | THREE.Vector3;
  size: [width?: number, height?: number];
  name: string;
};

interface MoveCameraProps {
  controlsRef: RefObject<React.ComponentRef<typeof OrbitControls>>;
}


const points : Point[]= parsePoints();
const defaultPosition = points[2];

function MoveCamera({controlsRef} : MoveCameraProps){

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

function ReturnCameraXY(){}


function CPTBase({radius, position}:{radius:number, position: Point}){
  return(
    <mesh position={[position.x, position.y,0]}>
      <sphereGeometry args={[radius]}/>
      <meshStandardMaterial color = {'rgb(0,100,0)'}/>
    </mesh>
  )
}

function CellBase({ position, size , name}: CellBaseProps) {
  
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerOver = (e:Event) => { 
    e.stopPropagation();
    setIsHovered(true)}
  const handlePointerLeave = (e:Event) => {
    e.stopPropagation();
    setIsHovered(false)
  }
// rotation = {[new THREE.Vector3(0,0,1), Math.PI/4}
  return (
    <>
      <mesh rotation ={[0,0, .1 * Math.PI / 180]}position={position} onPointerEnter={handlePointerOver} onPointerLeave={handlePointerLeave} >
        <planeGeometry args={size}  />
        <meshStandardMaterial color={isHovered ? "#A1EED6" : "#F2B694"}/>
      </mesh>
        <LabelCellBase position={position} name ={name} isHovered ={isHovered} size={size[0]}></LabelCellBase>
    </>
  );
}
interface Props{
  children?: ReactNode
}

function CursorTracker({children}:Props){
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  const {camera, size, viewport}  = useThree();
  const meshPos = new THREE.Vector3(0,0,-0.1);

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

function LabelCellBase({position, name, isHovered, size}:any){

  const offsetX = position[0] - 0.75 * size;
  const offsetY = position[1] + 1.05 * size;

  const newPosition = new THREE.Vector3(offsetX, offsetY, 0);
  return(
    <>  
      {
        isHovered &&
        <Html 
          className = 'content'
          position = {newPosition}
          distanceFactor={200}
            style ={{ width:100}}>
          {/* <div className = "content" style ={{margin:'none', padding:'none', width:100}}> */}
            {name}
          {/* </div> */}
        </Html>
      }
    </>
  )

}

function Scene(children : any) {
  const camera = useRef<THREE.OrthographicCamera | null>(null);
  const controls = useRef<any>(null);
  const plane = useRef<THREE.Mesh>(null);

  const cellbases = points.map((pt, i) =>{
         return <CellBase  key = {i} name ={pt.name}position={[pt.x,pt.y, 0]} size={[25, 25]}></CellBase>
       });

  const cptbases = points.map((pt,i)=>{
    return <CPTBase radius={3} key = {i} position = {pt}  ></CPTBase>
  })

  return (
    <>
      <OrbitControls ref={controls} target={[0, 0, 0]} position0={[0,0,25]} enablePan={true} enableZoom={true} enableRotate={false}/>
      <ambientLight intensity={2} color="white"></ambientLight>
      {cellbases}
      {cptbases}
      <MoveCamera controlsRef = {controls}></MoveCamera>
    </>
  );
}

//Ortographic camera is affecting the mos
function Plot() {
  const container = useRef(null);
  
  const [cameraState, setCamera] = useState(null);
  return (

  
  <div style ={{position: 'relative', width: '100vw', height: '100vh'}}>
   <CameraContext.Provider value ={{camera: cameraState, setCamera}}>
    <Canvas className ="wrapper" orthographic camera={{ position: [0, 0, 10], zoom:10}}  ref = {container}>
        <CameraBridge></CameraBridge>
        <OrbitControls enableRotate ={false}></OrbitControls>
        <ambientLight intensity={5}/> 
        <CursorTracker/>   
        <Nodes></Nodes>
      </Canvas>
    <NavigationMenu></NavigationMenu>
  </CameraContext.Provider>
  </div>

  );
}

function CameraBridge(){
  
  const {setCamera} = useContext(CameraContext);
  const {camera}= useThree();

  useEffect(()=>{
    setCamera(camera);
  },[camera, setCamera])
  return null;
  
}

function UserInterface(){
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

