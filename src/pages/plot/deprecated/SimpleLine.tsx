import * as THREE from "three";

function SimpleLine(pointsAB: THREE.Vector3[]) {

    const lineGeometry = new THREE.BufferGeometry().setFromPoints([...pointsAB]);
    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial attach='material' color={'red'} />
        </line>
    );
}
