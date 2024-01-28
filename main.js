window.onload = _ => {

  //Initialize systems that require setup onload.
  setupRenderingSystem();
  setupInputSystem();
  setupPlayerSystem();

  //Start the gameloop.
  gameLoop();
};


function gameLoop(){

  //Process player input first on every frame.
  processInput();


  //Then apply entity spawning systems.
  spawnBullets();
  spawnWalls();


  //Then apply entity removing systems.
  despawnWalls();
  despawnBullets();
  gameOver();


  //Then apply movement systems.
  updateMovement();


  //Then apply a collision detection step.
  detectCollision();


  //Then apply miscellaneous game logic systems.

  
  //Finally draw all the entities on the canvas.
  render();


  //Update the container of active entities in the game.
  updateEntities();


  //Call the next update frame.
  requestAnimationFrame(gameLoop);
}
