function setupStartMenu() {
  //Pause the game by default.
  pause_toggle = true;

  var btn = document.getElementById("playBtn");
  btn.addEventListener("click", function play() {
    var stage = document.getElementById("stage");
    var start = document.getElementById("start");

    btn.style.animation = "paused";
    stage.style.display = "block";
    start.style.display = "none";

    //Start gameloop on click of play button
    pause_toggle = false;

    //check to see that start btn was pressed
    gameStart = true;
    loopAudio("bgm");
    oneShotAudio("intro");
  });
}
