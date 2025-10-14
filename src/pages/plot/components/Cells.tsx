import { points } from "./Plot";
import { CellBase } from "./components/CellBase";
import { CPTBase } from "./components/CPTBase";

export function Cells() {
  const cellbases = points.map((pt, i) => {
    return <CellBase key={i} name={pt.name} position={[pt.x, pt.y, 0]} size={[25, 25]}></CellBase>;
  });

  const cptbases = points.map((pt, i) => {
    return <CPTBase radius={3} key={i} position={pt}></CPTBase>;
  });

  return (
    <>
      {cellbases}
      {cptbases}
    </>
  );
}
