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
  //console.log("height", height);
  let width = $(window).width();
  //console.log("width", width);
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
  });


  //Start the gameloop.
  gameLoop();
};


function spawnEntities(){
  addEntity("enemy-" + Date.now(), {
    visible: true,
    type: "enemy",
    height: Math.random() * 100,
    width: Math.random() * 100,
    x: 0,
    y: Math.random() * canvas.height,
  });
}


function updateMovement(){
  Object.values(entities).forEach(e => {
    if(e.visible === true){
      if(e.type === "enemy"){

        if(e.x > 250){
          deleteEntity(e.name);
        }
        e.x++;
      }
    }
  });
}


function updateSize() {

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

  console.log(entities);


  Object.values(entities).forEach(e => {
    if(e.visible === true){
      canvas_context.fillStyle = "green";
      canvas_context.fillRect(e.x, e.y, e.width, e.height);
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
  updateSize();


  render();
  updateEntities();
  requestAnimationFrame(gameLoop);
}
