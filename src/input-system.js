console.log("input-system.js : loaded");


//Object containing the state of input keys.
const input_states = {
  "KeyW": { keydown: false },
  "KeyS": { keydown: false },
  "KeyA": { keydown: false },
  "KeyD": { keydown: false },
};


function setupInputSystem(){
  document.addEventListener('keyup', e => {
    input_states[e.code] = { keydown: false };
  });
  document.addEventListener('keydown', e => {
    input_states[e.code] = { keydown: true };
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
