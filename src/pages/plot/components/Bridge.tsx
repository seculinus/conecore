import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useCameraStore } from '../store/useCameraStore';
import { useEffect } from 'react';
import { OrbitControls } from "@react-three/drei";


export function Bridge(){
    const  {camera} = useThree();
    const {setCamera, setControls}= useCameraStore();

    useEffect(()=>{
        setCamera(camera)
    }, [camera,setCamera])
    
    return(

        <OrbitControls makeDefault={true} enableRotate={false} ref={setControls}/>
    )

}