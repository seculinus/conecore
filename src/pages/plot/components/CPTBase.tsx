import { PointBase } from "../utils/point";

export function CPTBase({ radius, position }: { radius: number; position: PointBase; }) {
  return (
    <mesh position={[position.x, position.y, 0]}>
      <sphereGeometry args={[radius]} />
      <meshStandardMaterial color={'rgb(0,100,0)'} />
    </mesh>
  );
}
