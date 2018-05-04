 //Global Variable
var score = 0;
var lives ;
var start = false;
var toGuess = "";//random Brand to guess
var answer =[]; //empty array
var brandName = ["pepsi", "procter and gamble", "unilever", "apple", "samsung", "susuki"];
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
var messages;
var alreadyGuessed;


function startGame(){
    document.getElementById("outputError").innerText= messages.instructions;
    availableLetters = [" ","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    lives = 10;
    alreadyGuessed=0;
    answer =[];
    randomBrand();
    createAnswer();
    start = true;
    document.getElementById("startGame").style.visibility = 'hidden';
    document.getElementById("title_header").style.visibility = 'hidden';


}

document.onkeyup = function(event) {
    var keyPressed = event.key;
    if(start)
    hangman(keyPressed.toLowerCase());
    
}
function checkScores(){
    if(alreadyGuessed == toGuess.length){
        printLives(messages.win);
        document.getElementById("startGame").style.visibility = 'visible';
        start=false; 
        score++;
    }
    if(lives === 0){
        printLives(messages.lose);
        document.getElementById("startGame").style.visibility = 'visible';
        start=false; 
        score--;
    }
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
    toGuess = brandName[Math.floor(Math.random() * brandName.length)];
    console.log(toGuess);
}
        
    //Call this function when start of new word
function createAnswer(){
    for (var i = 0; i < toGuess.length; i++) {
            answer[i] = " _ ";
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
    document.getElementById("outputError").innerText =text + " Lives: " + lives;
}


function existInWord(letter){
    var result = false;
    if(toGuess.indexOf(letter)> -1){
        result = true;
        for (var i = 0; i < toGuess.length; i++) {
                if (toGuess.charAt(i) === letter) {
                    answer[i]=letter;
                    alreadyGuessed++;
                }
        }
    }
    return result;
}

   //Whenever the user presses a key




