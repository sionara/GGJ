import {EntityComponentSystem} from "javascript-entity-component-system";

//export function setupCounter(element) {
//  let counter = 0
//  const setCounter = (count) => {
//    counter = count
//    element.innerHTML = `count is ${counter}`
//  }
//  element.addEventListener('click', () => setCounter(counter + 1))
//  setCounter(0)
//}


export function setupEngine(canvas){
  const ecs = new EntityComponentSystem();
  const canvas_context = canvas.getContext("2d");


  //Start the game loop.
  gameLoop(ecs);
}


function gameLoop(ecs){

  //Call update on the ECS system.
  ecs.update();
  requestAnimationFrame(gameLoop);
}



