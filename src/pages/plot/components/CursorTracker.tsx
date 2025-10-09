import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import { ReactNode } from "react";

export interface Props{
  children?: ReactNode
}

export function CursorTracker({ children }: Props) {
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  const { camera, size, viewport } = useThree();
  const meshPos = new THREE.Vector3(0, 0, -0.1);

  return (
    <>
      <mesh
        position={meshPos}
        onPointerMove={(e) => { setPosition(e.point); }}
      >
        <planeGeometry args={[2e7, 2e7]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <Html className="content" distanceFactor={400} position={camera.position}>
        <div>
          <span style={{ color: '#FFCCCB' }}>X:{(position.x).toFixed(2)}</span>
          <span style={{ color: '#CCFEFF' }}>Y:{position.y.toFixed(2)}</span>
          {children}
        </div>
      </Html>
    </>
  );
}
