let x = null;

let canvas_context = null;
let canvas = null;

//Global pointer to the player entity.
let player = null;

//List of entites in the game.
const entities = [];

//Object containing the state of input keys.
const input_states = {
  KeyW: { keydown: false },
  KeyS: { keydown: false },
  KeyA: { keydown: false },
  KeyD: { keydown: false },
};

window.onload = (_) => {
  canvas = document.querySelector("#stage");
  canvas_context = canvas.getContext("2d");

  //Set the internal resolution of the canvas.
  canvas.width = 1366;
  canvas.height = 768;

  //Attach input event listeners
  document.addEventListener("keyup", (e) => {
    input_states[e.code] = { keydown: false };
  });
  document.addEventListener("keydown", (e) => {
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

function updateSize() {}

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

const background = {
  floorX: 0,
  floorY: 0,
  cloudX: 0,
  cloudY: 0,
};

function drawBackground() {
  canvas_context.clearRect(0, 0, canvas.width, canvas.height);

  const torontoLayer = new Image();
  torontoLayer.src = "images/layer-2.png";
  const cloudLayer = new Image();
  cloudLayer.src = "images/layer-3.png";
  const floorLayer = new Image();
  floorLayer.src = "images/layer-5.png";

  background.floorX -= 5;
  background.cloudX -= 1;

  canvas_context.drawImage(torontoLayer, 0, 0, 2400, 720);
  canvas_context.drawImage(
    cloudLayer,
    background.cloudX,
    background.cloudY,
    2400,
    720
  );
  canvas_context.drawImage(cloudLayer, 2400 + background.cloudX, 0, 2400, 720);
  canvas_context.drawImage(
    floorLayer,
    background.floorX,
    background.floorY,
    2400,
    720
  );
  canvas_context.drawImage(
    floorLayer,
    2400 + background.floorX,
    background.floorY,
    2400,
    720
  );
  // Reset the background once the first image is out of bounds
  if (background.floorX < -2400) {
    background.floorX = 0;
  }
  if (background.cloudX < -2400) {
    background.cloudX = 0;
  }
}

function render() {
  canvas_context.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();

  entities.forEach((e) => {
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
