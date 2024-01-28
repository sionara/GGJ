console.log("collision-detection-system.js : loaded");


function detectCollision() {
  Object.values(entities).forEach (e => {
    if (
      e.type != "player" && 
      e.visible == true &&
      e.collisionEnabled === true
    ) {
      
      if (player.x + player.width >= e.x && 
        player.x <= e.x + e.width &&
        player.y + player.height >= e.y &&
        player.y <= e.y + e.height) {


          //if collision was with a wall, reset wall counter
          if (e.name.startsWith("wall") === true) {
            osap_wall = null;
            oneShotAudio("hit-brick");
          } 

          if (e.name.startsWith("car") === true) {
            car = null;
            oneShotAudio("car-honk");
          }

          if (e.name.startsWith("pizza") === true) {
            oneShotAudio("boing");
          }

          if (e.name.startsWith("drink") === true) {
            oneShotAudio("boing");
          }

          if (e.name.startsWith("hotdog") === true) {
            oneShotAudio("boing");
          }

          


          //remove a life 
          lifeTotal -= 1;
          if (moneyHpList.length > 0 && !window.location.hash.includes("#debug")) {
            console.debug("🚀 ~ Object.values ~ moneyHpList.length:", moneyHpList.length)
            deleteEntity(moneyHpList.pop().name);
          }
         
          // delete that entity from game
          deleteEntity(e.name);


        //Spawn a bunch of money.
        for(let i = 0; i < 10; i++){

          const rng = new Math.seedrandom(`${Date.now() + Math.random()}`);

          addEntity("lost-money-" + Date.now(), {
            visible: true,

            type: "vfx",

            height: 50,
            width: 50,

            x: e.x,
            y: e.y,

            xVelocity: rng() * 50 - 30,
            yVelocity: rng() * 20 - 10,

            gravityEnabled: true,

            collisionEnabled: false,

            spriteSrc: "./images/money.gif",
            spriteHeight: 455,
            spriteWidth: 500,
          });


        }

        oneShotAudio("money-loss");
      }
    }  
  });


  if(player.hitsGround === true){
    if(player.y >= 500){
      //Calculate the overlap.
      const overlap = (player.y) - 500;
      player.y -= overlap;
    }

    if (player.y <= 0) {
      player.y = 0;
    }
  }
}
