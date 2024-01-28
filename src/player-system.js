console.log("player-system.js : loaded.");


//Global pointer to the player entity.
let player = null;


function setupPlayerSystem(){

  //Create player entity.
  player = addEntity("box", {
    type: "player",

    visible: true,

    height: 100,
    width: 100,

    sx: 128,
    sy: 0,
    x: 50,
    y: 0,

    yVelocity: 0,
    xVelocity: 0,

    gravityEnabled: true,
    //False ground collision detection, 
    //TODO: update to real collision detection.
    hitsGround: true,

    spriteSrc: "./images/redbullv2.png",
    spriteHeight: 110,
    spriteWidth: 128 - 40,
  });

}

