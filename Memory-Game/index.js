// variables

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isStarted = false;
var level = 0;

//functions

function nextSequence(){
    userClickedPattern = [];
    var rand = Math.floor((Math.random()*4));
    var randomColor = buttonColors[rand];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // playSound(randomColor);
    level++;
    $("h1").text("level "+level);
}


$(document).keypress(function(){
    if(isStarted === false){
        $("h1").text("level "+level);
        nextSequence();
        isStarted = true;
    }
});


$(".btn").click(function(){
        
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

            if (userClickedPattern.length === gamePattern.length){
              setTimeout(function () {
                nextSequence();
              }, 1000);
            }
          
    }
        
      
  
      else {
  
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game over, Press any key to start again");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          startOver();
  
      } 
    }

function startOver(){
    level = 0;
    isStarted = false;
    gamePattern = [];

}


