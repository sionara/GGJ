console.log("bullet-system.js : loaded");


//Balance settings
const BULLET_SPAWN_RATE = 0.1;
const SHINY_BULLET_SPAWN_RATE = 0.3;


function spawnBullets(){

  if(Math.random() < BULLET_SPAWN_RATE){

    if(Math.random() < SHINY_BULLET_SPAWN_RATE){

      addEntity("bullet-" + Date.now(), {
        visible: true,

        type: "bullet",

        height: 183,
        width: 288,

        x: canvas.width,
        y: Math.random() * canvas.height,

        xVelocity: -20,
        yVelocity: 0,

        collisionEnabled: true,

        spriteSrc: "./images/car.png",
        spriteHeight: 183,
        spriteWidth: 288,
      });

    }
    else {

      addEntity("bullet-" + Date.now(), {
        visible: true,

        type: "bullet",

        height: 50,
        width: 50,

        x: canvas.width,
        y: Math.random() * canvas.height,

        xVelocity: -10,
        yVelocity: 0,

        collisionEnabled: true,

        spriteSrc: "./images/hotdog.png",
        spriteHeight: 32,
        spriteWidth: 32,
      });

    }

  }
}


function despawnBullets(){
 Object.values(entities).forEach(e => {
    if(e.type === "bullet"){
      if(e.x < 100) deleteEntity(e.name);
    }
  });
}