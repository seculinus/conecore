import { create } from 'zustand'
import * as THREE from 'three'
import { OrbitControls } from 'three-stdlib'

// Define the store’s interface
interface CameraStore {
  camera: THREE.OrthographicCamera | null
  controls: OrbitControls | null
  setCamera: (camera: THREE.OrthographicCamera) => void
  setControls: (controls: OrbitControls) => void
  cameraUpdatePosition: () => void
  zoomIn:() =>  void
  zoomOut:() => void 
  resetView :() => void
}



export const useCameraStore = create<CameraStore>((set, get) => ({
  camera: null,
  controls: null,

  setCamera: (cam) => set({ camera: cam }),
  setControls: (ctrl) => set({ controls: ctrl }),

  cameraUpdatePosition: () => {
    const { camera, controls } = get()
    if (!camera || !controls) {
      console.warn("Camera or controls not set yet!")
      return
    }
    // Example: move camera
    camera.position.set(0, 0, 10)
    if ('zoom' in camera)
    camera.zoom = 10
    camera.updateProjectionMatrix()

    // Update orbit target
    controls.target.set(camera.position.x, camera.position.y, 0)
    controls.update()
  },
  zoomIn:()=>{
    const {camera,controls}=get();
    if (!camera || !controls) {
      console.warn("Camera or controls not set yet!")
      return
    }
    camera.zoom *=1.1;
    camera.updateProjectionMatrix();
  },
  zoomOut:()=>{
        const {camera,controls}=get();
    if (!camera || !controls) {
      console.warn("Camera or controls not set yet!")
      return
    }
    camera.zoom /= 1.1;
    camera.updateProjectionMatrix();
  },
  resetView:()=>{},
}))
