

console.log("walls-system.js : loaded");


//Global pointer to the wall.
let osap_wall = null;


const WALLS_SPAWN_RATE = 0.03;


function spawnWalls(){
  if(Math.random() < WALLS_SPAWN_RATE && osap_wall === null){

    osap_wall = addEntity("wall-" + Date.now(), {
      visible: true,

      type: "wall",

      height: 100,
      width: 315,

      x: canvas.width,
      y: 0,

      xVelocity: -10,
      yVelocity: 0,

      collisionEnabled: true,

      spriteSrc: "./images/osap.jpg",
      spriteHeight: 190,
      spriteWidth: 315,
    });
  }
}


function despawnWalls(){
  if(
    osap_wall !== null &&
    osap_wall.x < 0
  ){

    console.log("deleting osap wall");
    deleteEntity(osap_wall.name);
    osap_wall = null;
  }
}
