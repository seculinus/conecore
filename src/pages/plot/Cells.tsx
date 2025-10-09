import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { points, MoveCamera } from "./Plot";
import { CellBase } from "./components/CellBase";
import { CPTBase } from "./components/CPTBase";



export function Cells() {
  const camera = useRef<THREE.OrthographicCamera | null>(null);
  const controls = useRef<any>(null);
  const plane = useRef<THREE.Mesh>(null);

  const cellbases = points.map((pt, i) => {
    return <CellBase key={i} name={pt.name} position={[pt.x, pt.y, 0]} size={[25, 25]}></CellBase>;
  });

  const cptbases = points.map((pt, i) => {
    return <CPTBase radius={3} key={i} position={pt}></CPTBase>;
  });

  return (
    <>
      {/* <OrbitControls ref={controls} target={[0, 0, 0]} position0={[0, 0, 25]} enablePan={true} enableZoom={true} enableRotate={false} /> */}
      <ambientLight intensity={2} color="white"></ambientLight>
      {cellbases}
      {cptbases}
      {/* <MoveCamera controlsRef={controls}></MoveCamera> */}
    </>
  );
}
