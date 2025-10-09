import { Point } from "../Plot";

export function CPTBase({ radius, position }: { radius: number; position: Point; }) {
  return (
    <mesh position={[position.x, position.y, 0]}>
      <sphereGeometry args={[radius]} />
      <meshStandardMaterial color={'rgb(0,100,0)'} />
    </mesh>
  );
}
