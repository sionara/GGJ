var btn = document.getElementById("btn");

btn.addEventListener("click", function play(){
    
    var stage = document.getElementById("stage");
    var start = document.getElementById("start");

    btn.style.animation = "paused";
    stage.style.display = "block";
    start.style.display = "none";

    //Start gameloop on click of play button
    gameLoop();
});