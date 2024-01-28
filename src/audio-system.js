console.log("audio-system.js : loaded");


let sounds = {};


function setupAudioSystem(){

  //Preload all the necessary audio files.
  sounds = {
    "boing" : {
      audio : new Audio("./sounds/boing.mp3"),
      looping : false,
    },

    "car-honk" : {
      audio : new Audio("./sounds/car-honk-sound.mp3"),
      looping : false,
    },

    "game-over" : {
      audio : new Audio("./sounds/game-over-sound.mp3"),
      looping : false,
    },

    "hit-brick" : {
      audio : new Audio("./sounds/hit-brick-sound.mp3"),
      looping : false,
    },

    "jet-pack" : {
      audio : new Audio("./sounds/jet-pack-sound.mp3"),
      looping : false,
    },

    "ka-ching" : {
      audio : new Audio("./sounds/ka-ching-sound.mp3"),
      looping : false,
    },

    "bgm" : {
      audio : new Audio("./sounds/bgm.mp3"),
      looping : false,
    },


    "game-over" : {
      audio : new Audio("./sounds/game-over-sound.mp3"),
      looping : false,
    },
  };
}


function oneShotAudio(sound_name){
  //Clone the audio node and play it.
  let sound_copy = sounds[sound_name].audio.cloneNode(true);


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
  if(sounds[sound_name].looping === false){

    //play the audio
    sounds[sound_name].audio.play();


    console.log("playing bgm");


    function handleEnded(){

      //Play the sound again when it has ended.
      sounds[sound_name].audio.play();
    }


    //loop it
    sounds[sound_name].audio.addEventListener("ended", handleEnded);


    //Set the flag so calling this again doesn't do anything.
    sounds[sound_name].audio.looping = true;
  }
  else {

    //play the audio
    sounds[sound_name].audio.play();
  }

}


function pauseAudio(sound_name){

  //pause the audio
  sounds[sound_name].audio.pause();
}


function resumeAudio(sound_name){

  //resume the audio
  sounds[sound_name].audio.play();
}
