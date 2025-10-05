import { useState, useEffect, useRef, Ref, useMemo } from "react";
import { useDrag } from "@use-gesture/react";
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
import { ReactProps } from "@react-three/fiber/dist/declarations/src/three-types";


const spacing = 1;

function computeGrids(box: THREE.Box3) : THREE.Vector3[]{
    const [minX,maxX] = [box.min.x, box.max.x];
    const [minY, maxY] =[box.min.y, box.max.y];

    const  grid : THREE.Vector3[][] = [];
    for (let rowIndex = minX; rowIndex<maxX; rowIndex+=spacing){
    const cells : THREE.Vector3[] = [];
        for(let colIndex = minY; colIndex <maxY; colIndex+=spacing){
            const point = new THREE.Vector3(rowIndex, colIndex, 0);
            cells.push(point)
        }
        grid.push(cells);
    }
    return grid.flat();
}


function  intersectAll(line:THREE.Line ,gridPoints:THREE.Vector3[]){
    
    if(!line) return;

    let flags = [];
    const direction = new THREE.Vector3(-1,0,0)
    let origin = new THREE.Vector3(0,0,0);
    const raycast = new THREE.Raycaster(origin,direction);
    for (let i = 0; i < gridPoints.length; i++){
        raycast.set(gridPoints[i],direction);
        const intersected = raycast.intersectObject(line);
        const isInside = intersected.length % 2 != 0;
        flags.push(isInside);
    }

    return flags;

}

type Sieve = {
inside: THREE.Vector3[];
outside: THREE.Vector3[]
}

function sievePoints(flags : boolean[], gridPoints : THREE.Vector3[]) : Sieve {

    const inside : THREE.Vector3[]= [];
    const outside : THREE.Vector3[]= []
    flags.forEach((side,index)=>{
        if(side) inside.push(gridPoints[index])
        else outside.push(gridPoints[index])
    })
    return {inside, outside};
}


function Circle({pos, index, origin }:{pos:THREE.Vector3, index:number, origin:boolean}){
  return(
    <mesh position={pos} key = {index}>
      <sphereGeometry args={[1]}/>
      <meshStandardMaterial color = { origin? 'rgba(109, 208, 84, 1)':'rgba(242, 84, 245, 1)'}/>
    </mesh>
  )
}
function Grid({geom}: any) {
    const line: THREE.Line = geom.current;
    
    // Memoize the geometry creation
    let origin = new THREE.Vector3(0,0,0);
    const geometry = useMemo(() => {
        if (!line?.geometry) return null;
        
        line.geometry.computeBoundingBox();
        const boundingBox = line.geometry.boundingBox;
        if (!boundingBox) return null;

        const cachedGrid = computeGrids(boundingBox);
        if (!cachedGrid || cachedGrid.length === 0) return null;

        // const geom = new THREE.BufferGeometry();
        // const array = new Float32Array(cachedGrid.length * 3);
        // cachedGrid.forEach((pt, i) => {
        //     array[i * 3] = pt.x;
        //     array[i * 3 + 1] = pt.y;
        //     array[i * 3 + 2] = pt.z;
        // });

        // geom.setAttribute('position', new THREE.BufferAttribute(array, 3));
        // geom.computeBoundingSphere();
            
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
        // inside.computeBoundingSphere();
        outside.setAttribute('position', new THREE.BufferAttribute(outsideArray, 3));
        // outside.computeBoundingSphere();
        
        // return geom;
        return {inside,outside};
        
    }, [line?.geometry.boundingBox]); // Only recreate when line changes
    
    // // console.log()
    // let _points;
    // if (line){
    //     const raycast = new THREE.Raycaster(origin,new THREE.Vector3(0,-1,0));
    //     const intersected = raycast.intersectObject(line);
    //     _points = (intersected.map(i => i.point));
    // }

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
            {/* {_points.length > 0 && _points.map((p,i) => (<Circle pos={p} index ={i} origin ={false}/>))} */}
        </>
    );
}

export function Nodes({children}: ReactProps<Node>){
    const [positions, setPositions] = useState([
        {id:0, position: new THREE.Vector3(10,0,0)},
        {id:1, position: new THREE.Vector3(10,-10,0)},
        {id:2, position: new THREE.Vector3(-10,-10,0)},
        {id:3, position: new THREE.Vector3(-10,0,0)},
        // {id:4, position: new THREE.Vector3(-10,10,0)},
        // {id:5, position: new THREE.Vector3(-10,-10,0)},
    ]);
    const lineRef = useRef(null);

    const colors = [
        'rgba(235, 235, 228, 1)',
        'rgba(235, 235, 228, 1)',
        'rgba(235, 235, 228, 1)',
        'rgba(235, 235, 228, 1)',
        'rgba(235, 235, 228, 1)',
        'rgba(235, 235, 228, 1)',
        // 'rgba(226, 226, 19, 1)',
        // 'rgba(38, 73, 230, 1)',
        // 'rgba(253, 4, 4, 1)',
        // 'rgba(66, 179, 141, 1)',
        // 'rgba(233, 116, 248, 1)',
        // 'rgba(47, 127, 219, 1)',
    ]

    const handleMove = (index:number, nPos:THREE.Vector3) =>{
        const newPositions = positions.map(p => p.id == index ? {...p, position:nPos} : p)
        setPositions(newPositions);
    }
  
   const lineGeoemetry = new THREE.BufferGeometry().setFromPoints([...positions.map(p=>p.position), positions[0].position])


   return (
        <>
        <line geometry ={lineGeoemetry} ref={lineRef}>
            <lineBasicMaterial attach = 'material' color ={'cyan'} linewidth ={500} ></lineBasicMaterial>
        </line>
        <Grid geom ={lineRef}/>
            {positions.map((pos, i) => (
                <Node 
                key = {positions[i].id} 
                position ={positions[i].position} 
                color ={colors[i]}
                onMove = {(newPos)=>{handleMove(positions[i].id, newPos)}}
                />   
            ))
            }                     
        </>
    )
}



function SimpleLine(pointsAB: THREE.Vector3[]){
    
    const lineGeometry = new THREE. BufferGeometry().setFromPoints([...pointsAB]);
    return (
        <line geometry ={lineGeometry}>
            <lineBasicMaterial attach = 'material' color ={'red'}/>
        </line>
    )
}


export function Node({position, color, onMove}:{position:THREE.Vector3, color:string, onMove:(newPos:THREE.Vector3)=>void}){

    const {size,camera, pointer} = useThree();
    const [hovered, setHovered] = useState(false)
    const [pos, setPos] = useState(position)
    const startNodeRef = useRef(new THREE.Vector3());
    const startMouseRef = useRef(new THREE.Vector3());

    useEffect(() => void (document.body.style.cursor = hovered ? 'grab' : 'auto'), [hovered])
    
    const bind = useDrag(({down,first, xy:[x,y]})=>{
        document.body.style.cursor = down ? 'grabbing' : 'grab';
        const currentMouse = new THREE.Vector3((x / size.width) * 2 -1, -(y/size.height) * 2 +1, 0).unproject(camera).multiply({ x: 1, y: 1, z: 0 })

        if (first){
            startNodeRef.current.copy(pos)
            startMouseRef.current.copy(currentMouse);
        } else{
            
            const delta = currentMouse.clone().sub(startMouseRef.current);
            const nPos = startNodeRef.current.clone().add(delta)
            setPos(nPos);
            onMove(nPos);
        }
        
    });

    return(
        <mesh position ={pos} {...bind()}
        onPointerEnter={()=>setHovered(true)}
        onPointerLeave={()=>setHovered(false)}
        >  
            <circleGeometry args ={[3]} />
            <meshStandardMaterial color = {color}/>
        </mesh>
    )
}

