
var score = 0;
var lives = 10;
var start = false;
var toGuess = "";//random Cartoon name to guess
var answer =[]; //empty array with answer
var messages = {
    correct: 'Correct!',
    incorrect: 'Incorrect!',
    win: 'You won!',
    lose: 'Game over!',
    guessed: ' Already guessed, please try again...',
    validLetter: 'Please press a valid key',
    instructions: 'Please press the desired key'
}
var availableLetters;
var audio = new Audio('assets/audio/looney_tunes.mp3'); 
var error = new Audio('assets/audio/beep.mp3'); 

var letterClicked = ["."];//inicialiazed with . dt not able to make it work with an empty array. Keeps track of the pressed keys
var alreadyGuessed;//counter of letters al ready guessed - Adds without typing spaces.
var brandName = [{name:"elmer fudd", image:"47.jpeg"},{name:"buttercup", image:"46.png"},{name:"squidward tentacles", image:"45.jpeg"},
{name:"sylvester", image:"1.jpg"},{name:"homer simpson", image:"2.jpg"},{name:"mickey mouse", image:"3.jpg"},{name:"rocky", image:"4.jpg"},{name:"wile e coyote", image:"5.jpg"},
,{name:"spongebob", image:"6.jpg"},{name:"eric cartman", image:"7.jpg"},{name:"daffy duck", image:"8.jpg"},{name:"porky pig", image:"9.jpg"},{name:"brian", image:"19.jpg"},{name:"betty boop", image:"12.jpg"},
{name:"pongo", image:"32.jpg"},{name:"casper", image:"28.jpg"},{name:"bender", image:"38.jpg"},{name:"pepe le pew", image:"37.jpg"}, {name:"baloo", image:"18.jpg"},{name:"velma", image:"10.jpg"},
{name:"optimus prime", image:"11.jpg"},{name:"ren", image:"13.jpg"}];
/*
 * Function called by button in hmtl. Makes the buttons hide while the user guess the image.
 * Resets the available letters array and all other counters
 */
function startGame(){
    availableLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    alreadyGuessed=0;
    answer =[];
    randomBrand();
    createAnswer();
    setElements();
    start = true;
    audio.pause(); //when you win or when you lose sound
    audio.currentTime = 0;
}
/*
 * default screen layout to start playing
 * 
 */
function setElements(){
    document.getElementById("top").style.visibility= 'visible';
    document.getElementById("outputError").innerText= messages.instructions;
    document.getElementById("startGame").style.visibility = 'hidden';
    document.getElementById("title_header").style.visibility = 'hidden';
    document.getElementById("tai").style.visibility= 'visible';

}
/*
 * Called everytime user presses a key
 * @event onkeyup
 */
document.onkeyup = function(event) {
    var keyPressed = event.key;
    if(start)
    hangman(keyPressed.toLowerCase()); 
}
/*
 * Called everytime we finish sorting a letter
 * Increases/decreses score and decides if you win/lose. Plays music.
 */

function checkScores(){
    if(alreadyGuessed == toGuess.length){
        printLives(messages.win);
        resetElements();
        start=false; 
        score++;
        audio.play();
        audio.currentTime = 0;

    }
    if(lives === 0){
        printLives(messages.lose);
        resetElements();
        start=false; 
        score--;
        audio.play();
        lives = 10;
    }
    document.getElementById("scoreupdate").innerText= score;
}
/**
 * Called by checkScores. Resets the display in case of Win or Lose.
 *
 */
function resetElements(){
    document.getElementById("startGame").style.visibility = 'visible';
    document.getElementById("imageGuess").style.visibility = 'hidden';
    document.getElementById("title_header").innerText= 'Do you want to play again?';
    document.getElementById("title_header").style.visibility = 'visible';
    document.getElementById("top").style.visibility= 'hidden';
}
/**
 * main function. Recieves letter from event decides if it has been pressed
 * Asigns the letter to a position in the screen
 */
function hangman(letter){
    //is the key a valid letter? 
    if (availableLetters.indexOf(letter)!==-1) {
        availableLetters.splice(availableLetters.indexOf(letter),1);
        letterClicked.push(letter);
        document.getElementById("outputError").innerText= messages.correct;
            //is valid
            /* does guess exist in current word? if so, add to answer, if final letter added, game over with win message */
            if(existInWord(letter)){
                printAnswer();
            }
            else{
                lives--;
                printLives(messages.incorrect);
                error.play();
            }
    }else if(letterClicked.indexOf(letter)!==-1){
        lives--;
        printLives(messages.guessed); 
        error.play();  
    }else{
        lives--;
        printLives(messages.validLetter);
        error.play();
    }
    checkScores();

}

/**
 * Function which gets a random Cartoon name and photo
 */

function randomBrand(){
    var selection = Math.floor(Math.random() * brandName.length + 1);
    toGuess = brandName[selection].name;
    document.getElementById("imageGuess").src = "assets/images/" + brandName[selection].image;
    document.getElementById("imageGuess").style.visibility = 'visible';
    //console.log(toGuess);
}
        
/**
 * Populates an empty array  with underscores to start the game
 * Spaces are skipped
 */
function createAnswer(){
    for (var i = 0; i < toGuess.length; i++) {
            answer[i] = " _ ";
    if (toGuess.charAt(i) === " ") {
            answer[i]="   ";
            alreadyGuessed++;
        }
    }
    printAnswer();
}
/*
 * Function call to display changes to the array.
 * Used by createAnswer() and hangman()
 */
function printAnswer(){
    var print = " ";
    for (var i = 0; i < answer.length; i++) {
        print = print.concat(answer[i].toUpperCase());
    }
    document.getElementById("updateScreen").innerText = " Name: " + print;
}
 
/*
 * Function call to display Lives and error messages. 
 * Used by createAnswer() and hangman()
 */
function printLives(text){
    document.getElementById("outputError").innerText =text + "  - Lives: " + lives;
}

/*
 * Function that searches inside the to be guessed word if the letter clicked is there
 * @returns bool 
 */
function existInWord(letter){
    var result = false;
    if(toGuess.indexOf(letter)> -1){
        result = true;
        for (var i = 0; i < toGuess.length; i++) {
                if (toGuess.charAt(i) === letter) {
                    answer[i]=letter.toUpperCase();
                    alreadyGuessed++;
                }
        }
    }
    return result;
}

/*
 * If you dont guess... you lose
 */
function displayAnswer(){
    if(start){
    answer = toGuess;
    lives = 0;
    printAnswer();
    checkScores();
    } 
}



