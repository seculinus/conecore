import { parsePoints } from "../../utils/point";
import { Canvas, useThree} from "@react-three/fiber";
import { GridCells } from "./grid";
import { useRef, useEffect, useState, Fragment } from "react";
import {
  OrbitControls,
  Html,
} from "@react-three/drei";
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

//Any??
function CursorCoords(){
  
  const [position, setPosition] = useState(new THREE.Vector4(0,0,0,0));
  const camera = useThree((state) => state.camera);
  const canvas = useThree((state)=> state.scene);  
  return (
        <Html className="content" distanceFactor={7} position={[0,3,3]} >
            <div onPointerMove={(e)=>{
            e.stopPropagation();
            const pos = new THREE.Vector4();
            pos.x = Number(((e.clientX / window.innerWidth )).toFixed(2));
            pos.y = Number(((e.clientY / window.innerHeight )).toFixed(2));
            pos.z = 0;
            pos.w = 1;
            pos.applyMatrix4(camera.projectionMatrixInverse);
            console.log("is curosr fiered?")
            setPosition(pos);
        }}>
                {
                `${position.x}:${position.y}`
                }
            </div>
        </Html>
    )
}

function CellBase({ position, size }: CellBaseProps) {
    
  const [isHovered, setIsHovered] = useState(false);
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerOver={() => {
        setIsHovered(true);
        // console.log("pointer enter");
      }}
      onPointerOut={() => {
        setIsHovered(false);
        // console.log("pointerLeave");
      }}
      scale={isHovered ? 1.1 : 1}
    >
      <Html distanceFactor={7} position={[0, 0, 0]}>
        {isHovered ? (
          <div className="content">
            {position instanceof THREE.Vector3
              ? `${(position.x, position.y, position.z)}`
              : `${position[0]}${position[1]}${position[2]}`}
          </div>
        ) : (
          <></>
        )}
      </Html>
      <planeGeometry args={size}></planeGeometry>
      <meshStandardMaterial
        color={isHovered ? "#A1EED6" : "#F2B694"}
      ></meshStandardMaterial>
    </mesh>
  );
}

function Scene() {
  const camera = useRef<THREE.OrthographicCamera | null>(null);
  const controls = useRef<any>(null);
  //   useHelper(camera, THREE.CameraHelper);
  useEffect(() => {
    if (camera.current && controls.current) {
      //Position camera above the XY plane
      camera.current.position.set(0, 10, 0);
      camera.current.lookAt(0, 0, 0);
      //Points the controls target at the origin
      controls.current.target.set(0, 0, 0);
      //Update Control
      camera.current.updateProjectionMatrix();
      controls.current.update();
    //   console.log("hey this is afetr mount");
    //   console.log(camera.current.position);
    //   console.log(controls.current.target);
    }
  }, []);

  return (
    <>
      <orthographicCamera
        ref={camera}
        position={[0, 10, 0]}
        // lookAt={[0,-1,0]}
        // makeDefault
        left={-10}
        right={10}
        top={10}
        bottom={-10}
        near={0.1}
        far={100}
      />
      <OrbitControls
        ref={controls}
        target={[0, 0, 0]} // Look at the origin
        enablePan={true}
        enableZoom={true}
        enableRotate={false}
      />
      <ambientLight intensity={2} color="white"></ambientLight>{" "}
      <CellBase position={[0, 0, 0]} size={[1, 1]}></CellBase>
      <CellBase position={[1, 0, 1]} size={[1, 1]}></CellBase>
    </>
  );
}

function Plot() {
  
  
  return (
    <Canvas camera={{ position: [0, 15, 0] }}>
      <CursorCoords></CursorCoords>
      <GridCells></GridCells>zcvcvczczxzxAZAA
      <Scene></Scene>
    </Canvas>
  );
}

export default Plot;
