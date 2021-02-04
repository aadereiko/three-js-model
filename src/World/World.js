import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";
import { createPlane } from "./components/plane.js";
import { createHelpers } from "./components/helpers.js";
import { createTrackCurve } from "./components/trackCurve";
import { createCar } from "./components/car.js";

import { createOrbitControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";

let camera;
let renderer;
let scene;
let loop;

let trackCurve = null;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();

    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const orbitControls = createOrbitControls(camera, renderer.domElement);
    const { directionalLight, ambientLight } = createLights();
    const trackCurveInfo = createTrackCurve();

    trackCurve = trackCurveInfo.trackCurve;

    loop.updatables.push(orbitControls);

    new Resizer(container, camera, renderer);

    const plane = createPlane();
    const { axesHelper } = createHelpers();

    scene.add(directionalLight, ambientLight);
    scene.add(trackCurveInfo.trackCurveObject);
    scene.add(plane);
    scene.add(axesHelper);
  }

  async init() {
    const car = await createCar(trackCurve);
    loop.updatables.push(car);
    scene.add(car);
  }
  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
