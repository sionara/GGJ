console.log("movement-system.js : loaded");


function updateMovement(){
  Object.values(entities).forEach(e => {

    if(e.visible === true){

      e.x += e.xVelocity;
      e.y += e.yVelocity;

      if(e.type === "bullet"){
        if(e.x < 100) deleteEntity(e.name);
      }

      if(e.type === "wall"){
        if(e.x < -300){

          deleteEntity(e.name);
          osap_wall = null;
        }
      }

    }
    

  });
}
