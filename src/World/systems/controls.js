import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createOrbitControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;

  controls.tick = () => controls.update();

  return controls;
}

export { createOrbitControls };
