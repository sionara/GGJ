console.log("hud-system.js : loaded");
const moneyHpList = [];
let gameStart = false;
/**
 * Tracks how long the player can survive the game.
 * @type {number}
 */
let survivalTime = 0;

/**
 * Tracks frame passed so that the age can be increase after certain number of frame.
 * @type {number}
 */
let frameCounter= 0;

let isLifeRender = false;

function renderHUD() {
  renderAge();
  renderLifeIcons();
  renderLifeTitle();
}

const renderAge = function() {
  // Increase the time every 60 frames
  if (gameStart) {  
    if (frameCounter % 60 === 0) {
      survivalTime++;
    }
    frameCounter++;
    addEntity("player-age", {
      visible: true,
      textContent: `Time survived: ${survivalTime} s`,
      type: "text",
      x: 30,
      y: 120,
    });
  }
}

const renderLifeTitle = function() {
  addEntity("money-hp-title", {
    visible: true,
    textContent: "LIFE:",
    type: "text",
    x: 30,
    y: 60,
  });
}

const renderLifeIcons = function() {
  const num_of_life = lifeTotal; // copy the value of the global lifeTotal variable
  // canvas_context
  if (isLifeRender) {
    return;
  } 

  const initialPos = 90;
  const gap = 30;
  const width = 50;
  const height = 50;
  for (let index = 0; index < num_of_life; index++) {
    const moneyHP = addEntity(`money-hp-${index}`, {
      visible: true,
      type: "hp",
      height: width,
      width: height,
      x: initialPos + index * width + gap * (index + 1),
      y: 30 ,
      spriteSrc: "./images/money-hp.png",
      spriteHeight: 300,
      spriteWidth: 290,
    });
    moneyHpList.push(moneyHP);
  }
  isLifeRender = true;
}
