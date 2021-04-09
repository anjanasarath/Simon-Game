
let buttonColors = ["red","blue","green", "yellow"];
let randomChosenColour;
let gamePattern = [];
let userClickedPattern = [];


const nextSequence = () => {
  let randomNumber = Math.round(Math.random()*3);
  userClickedPattern = [];//empty user pattern...
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  allowBtnClick();
  $("h1").text(`LEVEL ${gamePattern.length}`);
  return randomChosenColour;
};

const playSound = (name) => {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
    animatePress(name);
};

//debugger;
const animatePress = (currentColor) => {
 $(`#${currentColor}`).addClass("pressed");
 setTimeout(function(){ $(`#${currentColor}`).removeClass("pressed");},100);
};

const allowKeyDown = () => (
  $(document).keydown(
    function(){
      nextSequence();
      $(document).off("keydown");
    }
  )
);

allowKeyDown();

const allowBtnClick = () => (
  $(".btn").on("click", function(evt)
    {
      if (evt.target.id === gamePattern[userClickedPattern.length]) {
          userClickedPattern.push(evt.target.id);
          playSound(evt.target.id);
          if (gamePattern.length === userClickedPattern.length) {
            $(".btn").off("click");
            setTimeout(nextSequence, 2000);
          }
      } else {
        playSound("wrong");
        $("h1").text("GAME OVER!!! \n PRESS A KEY TO RESTART");
        $(".btn").off("click");
        gamePattern = [];
        allowKeyDown();
      }
    }
  )
);
