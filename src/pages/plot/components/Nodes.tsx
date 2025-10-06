import { ReactProps } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";
import { Node } from "./Node";
import { Grid } from "./Grid";


export function Nodes({ children }: ReactProps<Node>) {
    const [positions, setPositions] = useState([
        { id: 0, position: new THREE.Vector3(10, 0, 0) },
        { id: 1, position: new THREE.Vector3(10, -10, 0) },
        { id: 2, position: new THREE.Vector3(-10, -10, 0) },
        { id: 3, position: new THREE.Vector3(-10, 0, 0) },
        // { id: 4, position: new THREE.Vector3(-10, 3, 0) },
        // { id: 5, position: new THREE.Vector3(-10, -3, 0) },
    ]);
    const lineRef = useRef(null);


    const handleMove = (index: number, nPos: THREE.Vector3) => {
        const newPositions = positions.map(p => p.id == index ? { ...p, position: nPos } : p);
        setPositions(newPositions);
    };

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
                    onMove={(newPos) => { handleMove(positions[i].id, newPos); }} />
            ))}
        </>
    );
}
