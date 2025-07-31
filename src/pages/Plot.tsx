import { parsePoints } from "../utils/point"; 
import { Canvas, Color, Vector2, Vector3 } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useEffect, useState } from "react";
import { OrbitControls, Grid, OrthographicCamera, PerspectiveCamera, useHelper, OrbitControlsProps , } from "@react-three/drei";
import * as THREE from 'three';

import './Plot.css'

type CellBaseProps = {
    position:[number,number,number] | THREE.Vector3,
    size: [
        width?: number,
        height?:number,
    ]    
    color: string;
}

function handlePointClick(){
        const points = parsePoints();
        console.log(points)}


function CellBase( {position,size, color}:CellBaseProps){

    const [isHovered, setIsHovered] = useState(false);



    return (
        <mesh 
        position = {position}
        rotation={[-Math.PI/2,0,0]}
        onPointerEnter={()=>{setIsHovered(!isHovered)}}
        onPointerLeave={()=>{setIsHovered(!isHovered)}}
        scale = {isHovered? 0.9 : 1}
        >
            <planeGeometry args = {size} ></planeGeometry>
            <meshStandardMaterial color = {isHovered? 'pink': color}></meshStandardMaterial>
        </mesh>
    )
}

function GridCells(){
    
const {
cellSize,
cellThickness,
cellColor,
sectionSize,
sectionThickness,
sectionColor,
followCamera,
infiniteGrid,
fadeDistance,
fadeStrength,
fadeFrom,
    } = useControls({
  cellSize: {value: 0.5,min: 0,max: 55,step: 1,},
  cellThickness: {value: 1,min: 0,max: 5,step: 0.1,},
  cellColor: "#6f6f6f",
  sectionSize: {value: 2.5,min: 0,max: 50,step: 1},
  sectionThickness: {value:1.5,min: 0,max: 5,step: 0.1,},
  sectionColor:"#9d4b4b",
  followCamera: false,
  infiniteGrid: true,
  fadeDistance: {value: 100,min: 0,max: 500,step: 5,},
  fadeStrength: {value: 0.5,min: 0,max: 5,step: 0.1,},
  fadeFrom: {value: 0.5,min: 0,max: 5,step: 0.1,},
})
    return(
    <Grid
        cellSize = {cellSize}
        cellThickness = {cellThickness}
        cellColor = {cellColor}
        sectionSize = {sectionSize}
        sectionThickness = {sectionThickness}
        sectionColor = {sectionColor}
        followCamera = {followCamera}
        infiniteGrid = {infiniteGrid}
        fadeDistance = {fadeDistance}
        fadeStrength = {fadeStrength}
        fadeFrom = {fadeFrom}
    >
        </Grid>

    )
}



function Scene(){

      const camera = useRef<THREE.OrthographicCamera | null>(null);
      const controls = useRef<any>(null);

    //   useHelper(camera, THREE.CameraHelper);

      useEffect(()=>{
        if(camera.current && controls.current)
        {
            //Position camera above the XY plane
            camera.current.position.set(0,10,0);
            camera.current.lookAt(0,0,0);
            //Points the controls target at the origin
            controls.current.target.set(0,0,0);
            //Update Control
            
            camera.current.updateProjectionMatrix();
            controls.current.update()

            console.log("hey this is afetr mount")
            console.log(camera.current.position)
            console.log(controls.current.target)
        }
      },[])

    return(
        <>
            <orthographicCamera
                ref ={camera}
                position = {[0,10,0]}
                // lookAt={[0,-1,0]}
                // makeDefault
                left ={-10}
                right ={10}
                top ={10}
                bottom ={-10}
                near ={.1}
                far ={100}
            />

            <OrbitControls
                ref = {controls}
                // camera={camera.current}
                target={[0, 0, 0]}     // Look at the origin
                enablePan={true}
                enableZoom={true}
                enableRotate={false}
            />
                <ambientLight intensity = {2} color = 'white'></ambientLight> {/* Reduced intensity, 5.5 is very bright */}
                <CellBase position ={[0,0,0]} size ={[1,1]} color ={'red'}></CellBase>
                <CellBase position ={[1,0,1]}  size ={[1,1]} color ={'blue'}></CellBase>
            </>
    )
}


function Plot(){
    return(
            <Canvas camera={{ position: [0, 10, 0] }}>
                <GridCells></GridCells>
                <Scene>
                </Scene>
            </Canvas> 
    )
};

export default Plot;
