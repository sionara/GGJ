function detectCollision() {
  Object.values(entities).forEach (e => {
    if (e.type != "player" && e.visible == true) {
      
      if (player.x + player.width >= e.x && 
        player.x <= e.x + e.width &&
        player.y + player.height >= e.y &&
        player.y <= e.y + e.height) {
          //if collision was with a wall, reset wall counter
          if (e.type === "wall") {
            osap_wall = null;
          }
          //remove a life 
          lifeTotal -= 1;
          // delete that entity from game
          deleteEntity(e.name);
      }
    }  
  });
}