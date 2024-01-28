console.log("gameover-system.js : loaded");

let stage = document.getElementById("stage");

//global life counter
let lifeTotal = 5;


function gameOver() {
  if (lifeTotal === 0) {
    console.log("Game Over");
    stage.style.display = "none";
  }
}
