

console.log("walls-system.js : loaded");


//Global pointer to the wall.
let osap_wall = null;


function spawnWalls(){
  if(Math.random() < WALLS_SPAWN_RATE && osap_wall === null){

    osap_wall = addEntity("wall-" + Date.now(), {
      visible: true,
      type: "wall",
      height: 368,
      width: 612,
      x: canvas.width,
      y: canvas.height - 368,
      xVelocity: -5,
      yVelocity: 0,
      spriteSrc: "./images/osap.jpg",
      spriteHeight: 368,
      spriteWidth: 612,
    });
  }
}
