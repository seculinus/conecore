import { useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";



export function Node({ position, color, onMove }: { position: THREE.Vector3; color: string; onMove: (newPos: THREE.Vector3) => void; }) {

    const { size, camera} = useThree();
    const [hovered, setHovered] = useState(false);
    const [pos, setPos] = useState(position);
    const startNodeRef = useRef(new THREE.Vector3());
    const startMouseRef = useRef(new THREE.Vector3());

    useEffect(() => void (document.body.style.cursor = hovered ? 'grab' : 'auto'), [hovered]);

    const bind = useDrag(({ down, first, xy: [x, y] }) => {
        document.body.style.cursor = down ? 'grabbing' : 'grab';
        const currentMouse = new THREE.Vector3((x / size.width) * 2 - 1, -(y / size.height) * 2 + 1, 0).unproject(camera).multiply({ x: 1, y: 1, z: 0 });

        if (first) {
            startNodeRef.current.copy(pos);
            startMouseRef.current.copy(currentMouse);
        } else {

            const delta = currentMouse.clone().sub(startMouseRef.current);
            const nPos = startNodeRef.current.clone().add(delta);
            setPos(nPos);
            onMove(nPos);
        }

    });

    return (
        <mesh position={pos} {...bind()}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            <circleGeometry args={[3]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}
