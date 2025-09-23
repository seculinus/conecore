import { useState, useEffect } from "react";
import { useDrag } from "@use-gesture/react";
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";




export function Node({position}){

    const {size,camera, pointer} = useThree();
    const [hovered, setHovered] = useState(false)
    const [pos, setPos] = useState(position)
    useEffect(() => void (document.body.style.cursor = hovered ? 'grab' : 'auto'), [hovered])
  
    const bind = useDrag(({down,event, xy:[x,y]})=>{
        document.body.style.cursor = down ? 'grabbing' : 'grab';
        console.log(pointer.x, pointer.y);
        setPos(new THREE.Vector3((x / size.width) * 2 -1, -(y/size.height) * 2 +1, 0).unproject(camera).multiply({ x: 1, y: 1, z: 0 }))
        // setPos(new THREE.Vector3(x,-y,0));
    });

    return(
        <mesh position ={pos} {...bind()}
        onPointerEnter={()=>setHovered(true)}
        onPointerLeave={()=>setHovered(false)}
        >
        =    
            <circleGeometry args ={[3]} />
            <meshStandardMaterial color = {'rgb(10,100,120)'}/>
        </mesh>
    )
}

