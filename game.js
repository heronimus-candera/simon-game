var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var start = false;

// randomColor
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  userClickPattern = [];
  level++;
  gamePattern.push(randomChosenColor);

  //animate
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  // audio
  playSound(randomChosenColor);

  $("#level-title").html("Level " + level);
}

// userClick
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
});

$(document).keypress(function() {
  if (!start) {
    $("#level-title").html("Level " + level);
    nextSequence();
    start = true;
  }
});

$("h1").click(function() {
  if (!start) {
    $("#level-title").html("Level " + level);
    nextSequence();
    start = true;
  }
});

// playSound
function playSound(button) {
  var audio = new Audio("sounds/" + button +".mp3");
  audio.play();
}

// animate
function animatePress(currentColour) {
  var button = $("#" + currentColour);
  button.addClass("pressed");
  setTimeout(function(){
    button.removeClass("pressed");
  }, 100);

}

// check answer
function checkAnswer(currentLevel) {
  if(userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  start = false;
  level = 0;
}
