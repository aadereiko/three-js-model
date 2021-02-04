import { BoxGeometry, DoubleSide, Mesh, MeshPhongMaterial, MirroredRepeatWrapping } from "three";

import { textureLoader } from '../systems/textureLoader';
const name = 'Plane';

function createPlane() {
    const geometry = new BoxGeometry(1000, 1000, 4);


    const gross = textureLoader.load('assets/textures/gross.jpg');
    
    gross.wrapS = MirroredRepeatWrapping;
    gross.wrapT = MirroredRepeatWrapping;

    gross.repeat.set(2, 2);

    const material = new MeshPhongMaterial({ map: gross, side: DoubleSide });

    const plane = new Mesh(geometry, material);
    plane.rotateX(Math.PI / 2);
    plane.name = name;
    return plane;
}

export {
    createPlane, 
};