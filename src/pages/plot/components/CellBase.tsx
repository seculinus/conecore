import * as THREE from 'three';
import { useState } from "react";
import { LabelCellBase } from "./LabelCellBase";

type ThreeInput = [number, number, number];
export type CellBaseProps = {
  position: ThreeInput | THREE.Vector3;
  size: [width?: number, height?: number];
  name: string;
};
export function CellBase({ position, size, name }: CellBaseProps) {

  const [isHovered, setIsHovered] = useState(false);

  const handlePointerOver = (e: Event) => {
    e.stopPropagation();
    setIsHovered(true);
  };
  const handlePointerLeave = (e: Event) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  return (
    <>
      <mesh rotation={[0, 0, .1 * Math.PI / 180]} position={position} onPointerEnter={handlePointerOver} onPointerLeave={handlePointerLeave}>
        <planeGeometry args={size} />
        <meshStandardMaterial color={isHovered ? "#A1EED6" : "#F2B694"} />
      </mesh>
      <LabelCellBase position={position} name={name} isHovered={isHovered} size={size[0]}></LabelCellBase>
    </>
  );
}
