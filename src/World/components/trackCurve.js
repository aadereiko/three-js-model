import {
  CatmullRomCurve3,
  Geometry,
  Line,
  LineBasicMaterial,
  Vector3,
} from "three";

function createTrackCurve() {
  const points = [
    new Vector3(-350, 5, 350),
    new Vector3(350, 5, 350),
    new Vector3(350, 5, -350),
    new Vector3(-350, 5, -350),
  ];

  const curve = new CatmullRomCurve3(points, true);
  const detailedPoints = curve.getPoints(25);
  const geometry = new Geometry();
  geometry.vertices = detailedPoints;
  const material = new LineBasicMaterial({ color: "black", size: 2 });

  const curveObject = new Line(geometry, material);

  return { trackCurveObject: curveObject, trackCurve: curve };
}

export { createTrackCurve };
