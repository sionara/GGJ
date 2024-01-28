window.onload = _ => {

  //Initialize systems that require setup onload.
  setupRenderingSystem();
  setupInputSystem();
  setupPlayerSystem();
  setupAudioSystem();
  setupStartMenu();

  //Start the gameloop.
  gameLoop();
};


function gameLoop(){

  //Process player input first on every frame.
  processInput();

  if(pause_toggle === false){

    //Only run these systems when the game is unpaused.
    

    //Then apply entity spawning systems.
    spawnBullets();
    spawnWalls();
    spawnCars();
  
  
    //Then apply entity removing systems.
    despawnWalls();
    despawnBullets();
    despawnCars();
    gameOver();
  
  
    //Then apply movement systems.
    updateMovement();
  
  
    //Then apply a collision detection step.
    detectCollision();
  
  
    //Then apply miscellaneous game logic systems.
  
  }
  
  //Finally draw all the entities on the canvas.
  render();


  //Update the container of active entities in the game.
  updateEntities();


  //Call the next update frame.
  requestAnimationFrame(gameLoop);
}
