let x = null;


let canvas_context = null;
let canvas = null;


//Global pointer to the player entity.
let player = null;


//List of entites in the game.
const entities = [];


//Object containing the state of input keys.
const input_states = {
  "KeyW": { keydown: false },
  "KeyS": { keydown: false },
  "KeyA": { keydown: false },
  "KeyD": { keydown: false },
};



window.onload = _ => {
  canvas = document.querySelector("#stage");
  canvas_context = canvas.getContext("2d");


  //Set the internal resolution of the canvas.
  let height = $(window).height();
  //console.log("height", height);
  let width = $(window).width();
  //console.log("width", width);
  canvas.width = width; //try to get game to natively
  canvas.height = height; //adjust to user's screen size


  //Attach input event listeners
  document.addEventListener('keyup', e => {
    input_states[e.code] = { keydown: false };
  });
  document.addEventListener('keydown', e => {
    input_states[e.code] = { keydown: true };
  });


  //Create player entity.
  player = {
    name: "Box",
    visible: true,
    height: 100,
    width: 100,
    x: 0,
    y: 0,
  };


  //Add this to the list of entities.
  entities.push(player);


  //Start the gameloop.
  gameLoop();
};


function updateMovement() {
  x += 1;
}


function updateSize() {

}


function processInput() {
  console.log(input_states.KeyR);


  if (input_states.KeyW.keydown === true) {
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


  entities.forEach(e => {
    if (e.visible === true) {
      canvas_context.fillStyle = "green";
      canvas_context.fillRect(e.x, e.y, e.width, e.height);
    }
  });
}


function gameLoop() {
  processInput();


  updateMovement();
  updateSize();


  render();
  requestAnimationFrame(gameLoop);
}
