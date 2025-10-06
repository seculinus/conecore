import { useEffect, Ref, useMemo } from "react";
import * as THREE from 'three';
import { computeGrids, intersectAll, sievePoints } from "../utils/intersection";




function Circle({pos, index, origin }:{pos:THREE.Vector3, index:number, origin:boolean}){
  return(
    <mesh position={pos} key = {index}>
      <sphereGeometry args={[1]}/>
      <meshStandardMaterial color = { origin? 'rgba(109, 208, 84, 1)':'rgba(242, 84, 245, 1)'}/>
    </mesh>
  )
}
export function Grid({geom}: any) {
    const line: THREE.Line = geom.current;
    
    // Memoize the geometry creation
    let origin = new THREE.Vector3(0,0,0);
    const geometry = useMemo(() => {
        if (!line?.geometry) return null;
        
        line.geometry.computeBoundingBox();
        const boundingBox = line.geometry.boundingBox;
        if (!boundingBox) return null;

        const cachedGrid = computeGrids(boundingBox);
        if (!cachedGrid || cachedGrid.length === 0) return null
            
        const flags = intersectAll(line, cachedGrid);
        const points = sievePoints(flags, cachedGrid);
        console.log('inside:',points.inside.length, 'outside:', points.outside.length)
        
        const inside = new THREE.BufferGeometry();
        const outside = new THREE.BufferGeometry();
        
        const insideArray = new Float32Array(points.inside.length * 3);
        const outsideArray = new Float32Array(points.outside.length * 3);
        
        
        points.inside.forEach((pt, i) => {
            insideArray[i * 3] = pt.x;
            insideArray[i * 3 + 1] = pt.y;
            insideArray[i * 3 + 2] = pt.z;
        });
        points.outside.forEach((pt, i) => {
            outsideArray[i * 3] = pt.x;
            outsideArray[i * 3 + 1] = pt.y;
            outsideArray[i * 3 + 2] = pt.z;
        });
        inside.setAttribute('position', new THREE.BufferAttribute(insideArray, 3));
        outside.setAttribute('position', new THREE.BufferAttribute(outsideArray, 3));    
        return {inside,outside};
        
    }, [line?.geometry.boundingBox]); // Only recreate when line changes
    
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (geometry) {
                geometry.inside.dispose();
                geometry.outside.dispose();
            }
        };
    }, [geometry]);

    if (!geometry) return null;

    return (
        <>
            <points geometry={geometry.inside}>
                <pointsMaterial size={4} color="green" />
            </points>
            <points geometry={geometry.outside}>
                <pointsMaterial size={4} color="red" />
            </points>
            <Circle pos ={origin}  index ={2} origin = {true}/>
        </>
    );
}


