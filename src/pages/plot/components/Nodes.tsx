import { ReactProps } from "@react-three/fiber";
import { useState, useRef, useContext } from "react";
import * as THREE from "three";
import { Node } from "./Node";
import { Grid } from "./Grid";
import { DEFAULT_POINTS } from "./constants";
import { StateContext } from "./StateContext";


// export function Nodes2(){
//   const { points } = useContext(StateContext);

//   console.log("I ran")
//   return (
//     <>
//       {points?.map((p, i) => (
//         <mesh key={i} position={[p.x, p.y, 0]}>
//           <circleGeometry args={[1]} />
//           <meshBasicMaterial color="hotpink" />
//         </mesh>
//       ))}
//     </>
//   );
// }

export function Nodes({positions}) {
    // const [positions, setPositions] = useState(nUll);
    // const { positions} = useContext(StateContext);
    const lineRef = useRef(null);

    if(!positions) return;



    console.log("Positions are: ", positions)

    // const handleMove = (index: number, nPos: THREE.Vector3) => {
    //     const newPositions = positions.map(p => p.id == index ? { ...p, position: nPos } : p);
    //     setPositions(newPositions);
    // };

    const lineGeoemetry = new THREE.BufferGeometry().setFromPoints([...positions.map(p => p.position), positions[0].position]);

    return (
        <>
            <line geometry={lineGeoemetry} ref={lineRef}>
                <lineBasicMaterial attach='material' color={'cyan'} linewidth={500}></lineBasicMaterial>
            </line>
            <Grid geom={lineRef} />
            {positions.map((pos, i) => (
                <Node
                    key={positions[i].id}
                    position={positions[i].position}
                    color={'rgba(235, 235, 228, 1)'}
                    // onMove={(newPos) => { handleMove(positions[i].id, newPos); }} 
                    />
            ))}
        </>
    );
}
