//Global Variable
var score = 0;
var lives ;
var start = false;
var toGuess = "";//random Brand to guess
var answer =[]; //empty array
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
var letterClicked = ["."];
var alreadyGuessed;
var brandName = [{name:"elmer fudd", image:"47.jpeg"},{name:"buttercup", image:"46.png"},{name:"squidward tentacles", image:"45.jpeg"},
{name:"sylvester", image:"1.jpg"},{name:"homer simpson", image:"2.jpg"},{name:"mickey mouse", image:"3.jpg"},{name:"rocky", image:"4.jpg"},{name:"wile e coyote", image:"5.jpg"},
,{name:"spongebob", image:"6.jpg"},{name:"eric cartman", image:"7.jpg"},{name:"daffy duck", image:"8.jpg"},{name:"porky pig", image:"9.jpg"},{name:"brian", image:"19.jpg"},{name:"betty boop", image:"12.jpg"},
{name:"pongo", image:"32.jpg"},{name:"casper", image:"28.jpg"},{name:"bender", image:"38.jpg"},{name:"pepe le pew", image:"37.jpg"}, {name:"baloo", image:"18.jpg"},{name:"velma", image:"10.jpg"},
{name:"optimus prime", image:"11.jpg"},{name:"ren", image:"13.jpg"}];
var audio = new Audio('assets/audio/looney_tunes.mp3');


function startGame(){
    document.getElementById("top").style.visibility= 'visible';
    document.getElementById("outputError").innerText= messages.instructions;
    availableLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    lives = 10;
    alreadyGuessed=0;
    answer =[];
    randomBrand();
    createAnswer();
    start = true;
    document.getElementById("startGame").style.visibility = 'hidden';
    document.getElementById("title_header").style.visibility = 'hidden';
    audio.pause();
}

document.onkeyup = function(event) {
    var keyPressed = event.key;
    if(start)
    hangman(keyPressed.toLowerCase());
    
}
function checkScores(){
    if(alreadyGuessed == toGuess.length){
        printLives(messages.win);
        resetElements();
        start=false; 
        score++;
        audio.play();

    }
    if(lives === 0){
        printLives(messages.lose);
        resetElements();
        start=false; 
        score--;
        audio.play();
    }
    document.getElementById("scoreupdate").innerText= score;
}

function resetElements(){
    document.getElementById("startGame").style.visibility = 'visible';
    document.getElementById("imageGuess").style.visibility = 'hidden';
    document.getElementById("title_header").innerText= 'Do you want to play again?';
    document.getElementById("title_header").style.visibility = 'visible';
    document.getElementById("top").style.visibility= 'hidden';
}

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
            }
    }else if(letterClicked.indexOf(letter)!==-1){
        lives--;
        printLives(messages.guessed);   
    }else{
        lives--;
        printLives(messages.validLetter);
    }
    checkScores();

}

    //Call this function when start of new word
function randomBrand(){
    var selection = Math.floor(Math.random() * brandName.length);
    toGuess = brandName[selection].name;
    document.getElementById("imageGuess").src = "assets/images/" + brandName[selection].image;
    document.getElementById("imageGuess").style.visibility = 'visible';
    console.log(toGuess);
}
        
    //Call this function when start of new word
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

function printAnswer(){
    var print = " ";
    for (var i = 0; i < answer.length; i++) {
        print = print.concat(answer[i]);
    }
    document.getElementById("updateScreen").innerText = print;
}

function printLives(text){
    document.getElementById("outputError").innerText =text + "  - Lives: " + lives;
}


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

   //Whenever the user presses a key




