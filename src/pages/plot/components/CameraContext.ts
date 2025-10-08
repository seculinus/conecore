import { createContext } from "react";
import * as THREE from 'three'
export const CameraContext = createContext({
    camera:null,
     setCamera:(camera?: THREE.OrthographicCamera)=>{},
    });

