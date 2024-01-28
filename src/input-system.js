console.log("input-system.js : loaded");


//Object containing the state of input keys.
const input_states = {
  "KeyW": { keydown: false, keypressed: false },
  "KeyS": { keydown: false, keypressed: false },
  "KeyA": { keydown: false, keypressed: false },
  "KeyD": { keydown: false, keypressed: false },
  "KeyP": { keydown: false, keypressed: false },
};


let pause_toggle = false;


function setupInputSystem(){
  document.addEventListener('keyup', e => {
    input_states[e.code] = { keydown: false, keypressed: false  };
  });
  document.addEventListener('keydown', e => {
    input_states[e.code] = { keydown: true, keypressed: input_states[e.code].keydown === true ? false : true};
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


  // if (input_states.KeyA.keydown === true) {
  //   player.xVelocity = -10;
  // } 
  // else if (input_states.KeyD.keydown === true) {
  //   player.xVelocity = 10;
  // }
  // else {
  //   player.xVelocity = 0;
  // }


  if(input_states.KeyP.keypressed === true){
    pause_toggle = !pause_toggle;
  }
}
