//Global pointers to the canvas and the context.
let canvas_context = null;
let canvas = null;


//Global pointer to the player entity.
let player = null;


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
    visible: true,
    height: 100,
    width: 100,
    x: 0,
    y: 0,
    spriteSrc: "./images/hotdog.png",
  });


  //Start the gameloop.
  gameLoop();
};


function spawnEntities(){

  if(Math.random() > 0.1){

    addEntity("bullet-" + Date.now(), {
      visible: true,
      type: "bullet",
      height: Math.random() * 100,
      width: Math.random() * 100,
      x: 0,
      y: Math.random() * canvas.height,
      spriteSrc: "./images/hotdog.png",
    });
  }
}


function updateMovement(){
  Object.values(entities).forEach(e => {
    if(e.visible === true){
      if(e.type === "bullet"){

        if(e.x > 250){
          deleteEntity(e.name);
        }
        e.x++;
      }
    }
  });
}


function processInput(){
  if(input_states.KeyW.keydown === true){
    player.y--;
  }
  if (input_states.KeyS.keydown === true) {
    player.y++;
  }
  if (input_states.KeyA.keydown === true) {
    player.x--;
  }
  if (input_states.KeyD.keydown === true) {
    player.x++;
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


        canvas_context.drawImage(sprite, 0, 0, 32, 32, e.x, e.y, e.width, e.height);
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


  spawnEntities();
  updateMovement();


  render();
  updateEntities();
  requestAnimationFrame(gameLoop);
}
