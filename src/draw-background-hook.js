console.log("draw-background-hook.js : loaded");


const background = {
  floorX: 0,
  floorY: 0,
  cloudX: 0,
  cloudY: 0,
};


function drawBackground() {
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
