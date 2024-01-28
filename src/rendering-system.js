console.log("rendering-system.js");

//Global pointers to the canvas and the context.
let canvas_context = null;
let canvas = null;


function setupRenderingSystem(){
  canvas = document.querySelector("#stage");
  canvas_context = canvas.getContext("2d");

  //Set the internal resolution of the canvas.
  let height = $(window).height();
  let width = $(window).width();
  canvas.width = width;
  canvas.height = height;
}


function render() {
  canvas_context.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();

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
