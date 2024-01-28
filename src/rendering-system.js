console.log("rendering-system.js");

//Global pointers to the canvas and the context.
let canvas_context = null;
let canvas = null;


function setupRenderingSystem(){
  canvas = document.querySelector("#stage");
  canvas_context = canvas.getContext("2d");

  //Set the internal resolution of the canvas.
  let height = 720; // put fixed height to fix game height regardless of screen size
  let width = $(window).width();
  canvas.width = width;
  canvas.height = height;
}


function render() {
  canvas_context.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();

  renderHUD();
  Object.values(entities).forEach(e => {
    if(e.visible === true){
      canvas_context.strokeStyle = "green";
      canvas_context.strokeRect(e.x, e.y, e.width, e.height);

      if (e.type === "text") {
        canvas_context.font = e.font ?? "15px 'Press Start 2P'";
        canvas_context.fillStyle = "Green";
        canvas_context.fillText(e.textContent, e.x, e.y);
      }

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

      if(e.type === "player"){
        const sprite = new Image();
        sprite.src = e.spriteSrc;
        let currPlayerImageIndex = 0;
        if (input_states.KeyW.keydown === false) {
          // console.log("input_states.KeyW.keydown",input_states.KeyW.keydown);
          currPlayerImageIndex = 0;
        } else {
          // console.log("input_states.KeyW.keydown",input_states.KeyW.keydown);
          currPlayerImageIndex = frameCounter % 2;
        }
        //console.log("currPlayerImageIndex",currPlayerImageIndex);
        canvas_context.drawImage(
          sprite, 
          e.sx * currPlayerImageIndex, e.sy, 
          e.spriteWidth, e.spriteHeight, 
          e.x, e.y, 
          e.width, e.height
        );
      }
    }
  });
}
