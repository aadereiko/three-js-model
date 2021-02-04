import { DirectionalLight, HemisphereLight } from 'three';

function createLights() {
  const ambientLight = new HemisphereLight('white', 'darkslategrey', 1);
  const directionalLight = new DirectionalLight('white', 4);
  directionalLight.position.set(2, 2, 2);
  return { directionalLight, ambientLight };
}

export { createLights };
