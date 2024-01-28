console.log("bullet-system.js : loaded");


//Balance settings
const BULLET_SPAWN_RATE = 0.01;
const SHINY_BULLET_SPAWN_RATE = 0.009;
const HOTDOG_SPAWN_RATE = 0.008;

function spawnBullets(){

  if(Math.random() < BULLET_SPAWN_RATE){
    addEntity("drink-" + Date.now(), {
      visible: true,

      type: "bullet",

      height: 50,
      width: 50,

      x: canvas.width,
      y: Math.random() * (600 - 100)+100,

      xVelocity: -10,
      yVelocity: 0,

      collisionEnabled: true,

      spriteSrc: "./images/drink.png",
      spriteHeight: 32,
      spriteWidth: 32,
    });
  } 
  if (Math.random() < SHINY_BULLET_SPAWN_RATE) {

    addEntity("pizza-" + Date.now(), {
      visible: true,

      type: "bullet",

      height: 50,
      width: 50,

      x: canvas.width,
      y: Math.random() * (600 - 100) + 100,

      xVelocity: -10,
      yVelocity: 0,

      collisionEnabled: true,

      spriteSrc: "./images/pizza.png",
      spriteHeight: 32,
      spriteWidth: 32,
    }); } 
    if (Math.random() < HOTDOG_SPAWN_RATE) {

      addEntity("hotdog-" + Date.now(), {
        visible: true,

        type: "bullet",

        height: 50,
        width: 50,

        x: canvas.width,
        y: (Math.random() * (600 - 100)+100),

        xVelocity: -10,
        yVelocity: 0,

        collisionEnabled: true,

        spriteSrc: "./images/hotdog.png",
        spriteHeight: 32,
        spriteWidth: 32,
      });

    }

  }


function despawnBullets(){
 Object.values(entities).forEach(e => {
    if(e.type === "bullet"){
      if(e.x < 100) deleteEntity(e.name);
    }
  });
}
