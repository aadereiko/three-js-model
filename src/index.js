import { World } from './World/World.js';
import './styles/main.css';

async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // create a new world
  const world = new World(container);

  await world.init();

  // start the animation loop
  world.start();
}

main().catch((err) => {
  console.error(err);
});
