//check load
console.log("car-system loaded");
//global pointer to car
let car = null;

const CAR_SPAWN_RATE = 0.01;

function spawnCars() {
  if (Math.random() < CAR_SPAWN_RATE && car === null) {
    car = addEntity("car-" + Date.now(), {
      visible: true,

      type: "car",

      height: 150,
      width: 288,

      x: canvas.width,
      y: 500,

      xVelocity: -10,
      yVelocity: 0,

      collisionEnabled: true,

      spriteSrc: "./images/car.png",
      spriteHeight: 183,
      spriteWidth: 288,
    });
  }
}

function despawnCars(){
  if(
    car !== null &&
    car.x < 0
  ){
    deleteEntity(car.name);
    car = null;
  }
}