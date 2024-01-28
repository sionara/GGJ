//Global pointers to the canvas and the context.
let canvas_context = null;
let canvas = null;


//Global pointer to the player entity.
let player = null;

let osap_wall = null;

//global life counter
let lifeTotal = 5;


//Balance settings
const BULLET_SPAWN_RATE = 0.1;
const SHINY_BULLET_SPAWN_RATE = 0.3;
const WALLS_SPAWN_RATE = 0.01;


//List of entites in the game.
const entities = {};


//These are required to manage adding and deleting entities in the game.
//Entities are added at the end of the frame to avoid bugs arising from
//deleting entities while another system is processing the entities.
const entities_to_add = [];
const entities_to_delete = [];


//Object containing the state of input keys.
const input_states = {
  "KeyW": { keydown: false },
  "KeyS": { keydown: false },
  "KeyA": { keydown: false },
  "KeyD": { keydown: false },
};




//Global functions
function addEntity(entity_name, components_object){
  const entity = {
    name: entity_name,
    ...components_object
  };


  entities_to_add.push(entity);
  return entity;
}


function deleteEntity(entity_name){
  entities_to_delete.push(entity_name);
}




window.onload = _ => {
  canvas = document.querySelector("#stage");
  canvas_context = canvas.getContext("2d");


  //Set the internal resolution of the canvas.
  let height = $(window).height();
  let width = $(window).width();
  canvas.width = width;
  canvas.height = height;


  //Attach input event listeners
  document.addEventListener('keyup', e => {
    input_states[e.code] = { keydown: false };
  });
  document.addEventListener('keydown', e => {
    input_states[e.code] = { keydown: true };
  });


  //Create player entity.
  player = addEntity("box", {
    type: "player",
    visible: true,
    height: 100,
    width: 100,
    x: 0,
    y: 0,
    yVelocity: 0,
    xVelocity: 0,
    spriteSrc: "./images/hotdog.png",
    spriteHeight: 32,
    spriteWidth: 32,
  });


  //Start the gameloop.
  gameLoop();
};


function spawnWalls(){
  if(Math.random() < WALLS_SPAWN_RATE && osap_wall === null){

    osap_wall = addEntity("wall-" + Date.now(), {
      visible: true,
      type: "wall",
      height: 368,
      width: 612,
      x: canvas.width,
      y: canvas.height - 368,
      xVelocity: -5,
      yVelocity: 0,
      spriteSrc: "./images/osap.jpg",
      spriteHeight: 368,
      spriteWidth: 612,
    });
  }
}


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
        spriteSrc: "./images/hotdog.png",
        spriteHeight: 32,
        spriteWidth: 32,
      });

    }

  }
}


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


function processInput(){
  if(input_states.KeyW.keydown === true){
    player.yVelocity = -10;
  } else if (input_states.KeyS.keydown === true) {
    player.yVelocity = 10;
  }
  else {
    player.yVelocity = 0;
  }


  if (input_states.KeyA.keydown === true) {
    player.xVelocity = -10;
  } 
  else if (input_states.KeyD.keydown === true) {
    player.xVelocity = 10;
  }
  else {
    player.xVelocity = 0;
  }
}

function render() {
  canvas_context.clearRect(0, 0, canvas.width, canvas.height);

  Object.values(entities).forEach(e => {
    if(e.visible === true){
      canvas_context.strokeStyle = "green";
      canvas_context.strokeRect(e.x, e.y, e.width, e.height);


      if(e.hasOwnProperty("spriteSrc")){
        const sprite = new Image();
        sprite.src = e.spriteSrc;


        canvas_context.drawImage(
          sprite, 
          0, 0, 
          e.spriteWidth, e.spriteHeight, 
          e.x, e.y, 
          e.width, e.height
        );
      }
    }
  });
}


function updateEntities(){

  //Add entities first.
  entities_to_add.forEach(e => {
    entities[e.name] = e;
  });


  //Remove entities.
  entities_to_delete.forEach(e_name => {
    delete entities[e_name];
  });
}


function gameLoop(){
  processInput();


  spawnBullets();
  spawnWalls();
  updateMovement();
  detectCollision();


  render();
  updateEntities();
  gameOver();
  requestAnimationFrame(gameLoop);
}
