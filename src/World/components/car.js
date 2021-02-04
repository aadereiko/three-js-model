import {
  AnimationMixer,
  BufferGeometry,
  Geometry,
  Points,
  PointsMaterial,
  Vector3,
} from "three";
import { gltfLoader } from "../systems/gltfLoader";

let carRoot = null;

const carPosition = new Vector3();
const carTarget = new Vector3();
let t = 0;

async function createCar(trackCurve) {
  const gltfModel = await gltfLoader.loadAsync(
    "../../assets/models/car/scene.gltf"
  );

  carRoot = gltfModel.scene;
  carRoot.position.setY(2);
  const clip = gltfModel.animations[0];

  const mixer = new AnimationMixer(carRoot);
  const action = mixer.clipAction(clip);

  action.play();

  carRoot.tick = (delta) => {
    t += 0.0009;
    const currentPoint = trackCurve.getPoint(t);

    // the problem is that the car model when looks at point, it's rotated by its side part
    // it means when it looks at a star, it looks like:
    // 
    //
    //   ----
    //   |  |
    //   |  | -------->   *
    //   |  |
    //   ----
    //
    // So therefore i decided to get the point, placed on a line from origin (0, 0) to the point on a circle
    // to calculate the x and z coordinates I used the equation of line:
    // x - x0   z - z0
    // ------ = -------
    // x1 - x0  z1 - z0
    //
    // where i got (x0, z0) as origin (0, 0) and (x1, z1) is a point on circle
    // x := x + delta x, where delta is a distance to point
    // so then 
    // x / x1 = z / z1
    // z = z1 * x / x1
    
    const newX = currentPoint.x + (currentPoint.x < 0 ? -1 : 1);
    const currentParallelXZPoint = new Vector3(newX, currentPoint.y, newX * currentPoint.z / currentPoint.x);

    carPosition.copy(currentPoint);
    carTarget.copy(currentParallelXZPoint);
    carRoot.position.copy(carPosition);
    carRoot.lookAt(carTarget);
    mixer.update(delta);
  };

  return carRoot;
}

const getCarModel = () => carRoot;

export { createCar, getCarModel };
