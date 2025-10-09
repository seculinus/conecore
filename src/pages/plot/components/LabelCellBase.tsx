import { Html } from "@react-three/drei";
import * as THREE from "three";


export function LabelCellBase({ position, name, isHovered, size }: any) {

  const offsetX = position[0] - 0.75 * size;
  const offsetY = position[1] + 1.05 * size;

  const newPosition = new THREE.Vector3(offsetX, offsetY, 0);
  return (
    <>
      {isHovered &&
        <Html
          className='content'
          position={newPosition}
          distanceFactor={200}
          style={{ width: 100 }}>
          {name}
        </Html>}
    </>
  );

}
