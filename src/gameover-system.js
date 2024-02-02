console.log("gameover-system.js : loaded");

//global life counter
let lifeTotal = 5;


function gameOver() {
  var survivalTimeMsg = document.getElementById("survivalTime");
  // var finalTime = document.getElementById("survivalTime");

  let finalSurvivalTime = survivalTime;

  let stage = document.getElementById("stage");
  let gameOverScreen = document.getElementById("gameover");
  var start = document.getElementById("start");

  if (lifeTotal === 0) {
    console.log("Game Over");
    console.log(survivalTime);
    pause_toggle = true;
    survivalTimeMsg.innerHTML = finalSurvivalTime;
    stage.style.display = "none";
    gameOverScreen.style.display = "block";
    start.style.display = "none";
    gameStart = false;
    
    pauseAudio("bgm");
    oneShotAudio("game-over");
  }
}
