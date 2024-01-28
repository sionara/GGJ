console.log("movement-system.js : loaded");


const GRAVITY_CONSTANT = 5;


function updateMovement(){
  Object.values(entities).forEach(e => {

    if(e.visible === true){


      x_velocity = e.xVelocity ?? 0;
      y_velocity = e.yVelocity ?? 0;


      //Check if this entity is affected by gravity.
      if(e.gravityEnabled === true){
        y_velocity += GRAVITY_CONSTANT; 

      }


      e.x += x_velocity;
      e.y += y_velocity;

    }
    

  });
}
