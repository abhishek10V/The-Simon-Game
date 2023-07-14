var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started= false;
var level = 0;
$(document).keypress(function(){

    if(!started){
        $("#level-title").text("Level " +level);
        newSequence();
        started = true;
       
    }
})  

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();  
}
function newSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " +level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    animatePress(randomChosenColor);
    
   
    
}

$(".btn").click(function handler(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length - 1);
    //console.log(userClickedPattern);
});
/*
document.addEventListener("keypress" , function(event){
    var userChosenColor = $("."+event.key).attr("id");
    userClickedPattern.push(userChosenColor);
    switch (event.key) {
        case "r":
            var audio = new Audio("sounds/red.mp3");
            audio.play(); 
            break;
        case "y":
                var audio = new Audio("sounds/yellow.mp3");
                audio.play(); 
                break; 
        case "b":
                    var audio = new Audio("sounds/blue.mp3");
                    audio.play(); 
                    break;
        case "g":
                        var audio = new Audio("sounds/green.mp3");
                        audio.play(); 
                        break;
        default:
            break;
    }
    animatePress(event.key);
    checkAnswer(userClickedPattern.length - 1);
});*/

function animatePress(currentColor){
    $("." +currentColor).addClass("pressed");
    setTimeout(function(){
        $("." +currentColor).removeClass("pressed");
    }, 100);
}
   
function checkAnswer(currentLevel){
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");
     
    if(gamePattern.length === userClickedPattern.length){
        setTimeout(function(){
            newSequence();
           },1000);

    }
   } else{
     console.log("wrong");

     var audio = new Audio("sounds/wrong.mp3");
    audio.play(); 

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    
    $("h1").text("Game Over - Your Final Score is : "+level+" , Press any key to Restart");

    startOver();
   }
   
} 

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

