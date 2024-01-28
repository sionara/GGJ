console.log("audio-system.js : loaded");


let sounds = {};


function setupAudioSystem(){

  //Preload all the necessary audio files.
  sounds = {
    "boing" : new Audio("./sounds/boing.mp3"),
  };
}


function oneShotAudio(sound_name){
  //Clone the audio node and play it.
  let sound_copy = sounds[sound_name].cloneNode(true);


  function handlePlayback(){
    sound_copy.play();
  }


  function handleEnded(){

    //Remove all references to the sound to allow garbage collection.
    sound_copy.removeEventListener("canplaythrough", handlePlayback);
    sound_copy.removeEventListener("ended", handleEnded);
    sound_copy.pause();
    sound_copy.src = "";
    sound_copy.load();
    sound_copy = null;
  }

  sound_copy.addEventListener("canplaythrough", handlePlayback);
  sound_copy.addEventListener("ended", handleEnded);
}


function loopAudio(sound_name){
  sounds[sound_name].play();
}
