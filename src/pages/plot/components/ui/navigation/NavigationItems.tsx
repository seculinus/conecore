import { useCameraStore } from '../../../store/useCameraStore';
import { FullScreen } from '../items/FullScreen';
import { OpenSettings } from '../items/OpenSettings';
import { OrbitView } from '../items/OrbitView';
import { PanView } from '../items/PanView';
import { ResetView } from '../items/ResetView';
import { Wireframe } from '../items/Wireframe';
import { ZoomIn } from '../items/ZoomIn';
import { ZoomOut } from '../items/ZoomOut';


export function NavigationItems() {

  const cameraUpdatePosition = useCameraStore((s) => s.cameraUpdatePosition);
  const zoomIn = useCameraStore((s) => s.zoomIn);
  const zoomOut = useCameraStore((s) => s.zoomOut);

  const navigationItems = [
    ZoomIn(zoomIn),
    ZoomOut(zoomOut),
    // FullScreen(null),
    // OpenSettings(null),
    // Wireframe(null),
    // OrbitView(null),
    ResetView(cameraUpdatePosition),
    // PanView(null),
  ];

  return navigationItems;
}


export function EditItems() {
  const editItems =[
    FullScreen(null),
  ]
  return editItems;
}

