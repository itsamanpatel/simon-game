//
// var buttonColours = ["red", "blue", "green", "yellow"];
//
// var gamePattern = [];
//
// //3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
// var userClickedPattern = [];
//
// //1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
// $(".btn").click(function() {
//
//   //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
//   var userChosenColour = $(this).attr("id");
//
//   //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
//   userClickedPattern.push(userChosenColour);
//
//   //console.log(userClickedPattern);
//
// });
//
// function nextSequence() {
//
//   var randomNumber = Math.floor(Math.random() * 4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);
//
//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//
//   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
//   audio.play();
// }


var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});


//Finding and passing the clicked button id.
$(".btn").on("click", function (e){
  var idName=e.target.classList[1];
  var userChosenColour=idName;

  userClickedPattern.push(userChosenColour);
  checkAnswer((userClickedPattern.length)-1);
  playSound(idName);
  animatePress(userChosenColour);

});

function nextSequence(){
  userClickedPattern=[]
  level++;
  $("#level-title").text("Level "+level);

  //random variable generation
  var randomNumber=Math.floor(Math.random()*4);
  //random Color selection
  var randomChosenColour=buttonColours[randomNumber];
  //storing random pattern
  gamePattern.push(randomChosenColour);
  //animation to button
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  //playing audio
  playSound(randomChosenColour);

  //console.log(userClickedPattern);
}

function playSound(name){
  //playing audio
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function (){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}
