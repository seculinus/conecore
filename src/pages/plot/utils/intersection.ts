import * as THREE from "three";

import { configuration } from "@/src/config/config";
//TODO: TO BE USED LATER the config file 

const spacing = 3;
export function computeGrids(box: THREE.Box3): THREE.Vector3[] {
    const [minX, maxX] = [box.min.x, box.max.x];
    const [minY, maxY] = [box.min.y, box.max.y];

    const grid: THREE.Vector3[][] = [];
    for (let rowIndex = minX; rowIndex < maxX; rowIndex += spacing) {
        const cells: THREE.Vector3[] = [];
        for (let colIndex = minY; colIndex < maxY; colIndex += spacing) {
            const point = new THREE.Vector3(rowIndex, colIndex, 0);
            cells.push(point);
        }
        grid.push(cells);
    }
    return grid.flat();
}
export function intersectAll(line: THREE.Line, gridPoints: THREE.Vector3[]) {


    let flags = [];
    const direction = new THREE.Vector3(-1, 0, 0);
    let origin = new THREE.Vector3(0, 0, 0);
    const raycast = new THREE.Raycaster(origin, direction);
    raycast.params.Points = { threshold: 0.01 };
    raycast.params.Line = { threshold: 0.01 };
    for (let i = 0; i < gridPoints.length; i++) {
        raycast.set(gridPoints[i], direction);
        const intersected = raycast.intersectObject(line);
        const isInside = intersected.length % 2 != 0;
        flags.push(isInside);
    }

    return flags;

}
export function sievePoints(flags: boolean[], gridPoints: THREE.Vector3[]): Sieve {

    const inside: THREE.Vector3[] = [];
    const outside: THREE.Vector3[] = [];
    flags.forEach((side, index) => {
        if (side) inside.push(gridPoints[index]);
        else outside.push(gridPoints[index]);
    });
    return { inside, outside };
}

export type Sieve = {
    inside: THREE.Vector3[];
    outside: THREE.Vector3[];
};

