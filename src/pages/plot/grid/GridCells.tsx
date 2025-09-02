import { Grid } from "@react-three/drei"
import { useControls } from "leva"

 export default function GridCells(){    
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
    cellThickness: {value: 0,min: 0,max: 5,step: 0.1,},
    cellColor: "#6f6f6f",
    sectionSize: {value: 2.5,min: 0,max: 50,step: 1},
    sectionThickness: {value:0,min: 0,max: 5,step: 0.1,},
    sectionColor:"#9d4b4b",
    followCamera: false,
    infiniteGrid: true,
    fadeDistance: {value: 100,min: 0,max: 500,step: 5,},
    fadeStrength: {value: 0.5,min: 0,max: 5,step: 0.1,},
    fadeFrom: {value: 0.5,min: 0,max: 5,step: 0.1,},
    })
        return(
        <Grid
            rotation={[Math.PI/2,0,0]}
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
