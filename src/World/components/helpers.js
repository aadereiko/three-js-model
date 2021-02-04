import { GridHelper, AxesHelper } from 'three';

function createHelpers() {
  const gridHelper = new GridHelper(200, 20);
  const axesHelper = new AxesHelper(200);

  return { gridHelper, axesHelper };
}

export { createHelpers };