buttonColours = ["red", "yellow" ,"blue", "green"];

gamePattern = [];
userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function() {
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})


$(".btn").on("click",function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});




function nextSequence(){
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};




function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};




function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    },100);
  };




  function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success")
   if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
    }
  } else {
    console.log("Wrong")
    
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over,Press Any Key to Restart.");

    startOver();
  }
  };



  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }





