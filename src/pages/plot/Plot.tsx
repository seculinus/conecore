import { parsePoints, PointBase } from "./utils/point";
import { Canvas } from "@react-three/fiber";
import { Nodes,  } from "./components";
import { useRef, useState, ReactNode, useMemo, useContext } from "react";
import { CursorTracker } from "./components/CursorTracker";
import { Bridge } from "./components/Bridge";
import { NavigationItems,EditItems, NavigationMenu } from "./components";

export const points: PointBase[] = parsePoints();
const defaultPosition = points[2];

//Ortographic camera is affecting the mos
function Plot() {

  const navItems = NavigationItems();
  const editItems = EditItems();
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh",}}>
      <Canvas
        className="wrapper"
        orthographic
        camera={{ position: [0, 0, 10] }}
      >
        <Bridge></Bridge>
        {/* <OrbitControls makeDefault={true} enableRotate={false} /> */}
        <ambientLight intensity={5} />
        <CursorTracker />
        <Nodes></Nodes>
      </Canvas>
      <NavigationMenu items={navItems} columns={2}/>
      <NavigationMenu items={editItems}  columns={1}
  direction="horizontal"
  placement={{
    bottom: "1.5rem",
    left: "50%",
    transform: "translateX(-20%)", // centers horizontally
  }}
      />
    </div>
  );
}

export default Plot;
