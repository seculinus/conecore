import { useState, useEffect, useRef, Ref } from "react";
import { useDrag } from "@use-gesture/react";
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
import { ReactProps } from "@react-three/fiber/dist/declarations/src/three-types";


function computeGrids(){

}




function Grid({geom}:any){
    const line : THREE.Line = geom.current; 
    if (line){
        line.geometry.computeBoundingBox();
        const bb = line.geometry.boundingBox;
        const [minX,maxX] = [bb.min.x, bb.max.x];
        const [minY, maxY] =[bb.min.y, bb.max.y];
        const spacing = .3;
        const  grid : THREE.Vector3[][] = [];
        for (let rowIndex = minX; rowIndex<maxX; rowIndex+=spacing){
            const cells : THREE.Vector3[] = [];
            for(let colIndex = minY; colIndex <maxY; colIndex+=spacing){
                const point = new THREE.Vector3(rowIndex, colIndex, 0);
                cells.push(point)
       
            }
            grid.push(cells);}
        
        const gridPoints = grid.map(row =>{ return row.map(cell=>{ 
            return <mesh position={cell}>
                    <circleGeometry args ={[.1]} />
                    <meshStandardMaterial color = {'silver'}/>
                </mesh>
            })})
            
        return (
            <>
            {gridPoints}
            </> 
        )
    }

    return(
        <></>
    )
}

export function Nodes({children}: ReactProps<Node>){
    const [positions, setPositions] = useState([
        {id:0, position: new THREE.Vector3(0,0,0)},
        {id:1, position: new THREE.Vector3(13,13,0)},
        {id:2, position: new THREE.Vector3(1,13,0)},
        {id:3, position: new THREE.Vector3(-12,13,0)},
        {id:4, position: new THREE.Vector3(25,1,0)},
        {id:5, position: new THREE.Vector3(-5,25,0)},
    ]);
    const lineRef = useRef(null);

    const colors = [
        'rgba(226, 226, 19, 1)',
        'rgba(38, 73, 230, 0.93)',
        'rgba(253, 4, 4, 1)',
        'rgba(66, 179, 141, 1)',
        'rgba(233, 116, 248, 1)',
        'rgba(47, 127, 219, 1)',
    ]

    const handleMove = (index:number, nPos:THREE.Vector3) =>{
        const newPositions = positions.map(p => p.id == index ? {...p, position:nPos} : p)
        setPositions(newPositions);
    }
  
   const lineGeoemetry = new THREE.BufferGeometry().setFromPoints([...positions.map(p=>p.position), positions[0].position])


   return (
        <>
        <line geometry={lineGeoemetry} ref={lineRef} >
            <lineBasicMaterial attach = 'material' color ={'red'} ></lineBasicMaterial>
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

