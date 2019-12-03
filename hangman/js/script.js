//Global Variables
let WORD_BANK = ['committee', 'thinkable', 'hanging', 'sweater', 'window', 'wicked', 'humorous', 'amused', 'entertain', 'unsuitable'];
let DEFINITION_BANK = ["A group of people appointed for a specific function.",
'Able to be thought of or imagined; conceivable.',
'To be suspended in the air.',
'A knitted garment typically long sleeves, worn over the upper body',
'An opening in the wall made of glass or other transparent material, to see through.',
'Evil or morally wrong',
'A quality of being amusing or comic.',
'Finding something funny or entertaining',
'Provide (someone) with amusement or enjoyment.',
'To be unfit or inapproriate.'];
let LIVES = 7;
let buttonarray = [];
let wordarray = [];
let score = 0;
let CURRENT_WORD = getRandomWord(WORD_BANK, DEFINITION_BANK);
let CURRENT_DISPLAY_WORD = [];
let resetbutton = document.getElementById("reset");

//get a random word from WORD_BANK and returns the random word
function getRandomWord(word_arr, def_arr){
  let position = Math.floor(Math.random() * 10);
  let definition = def_arr[position];
  document.getElementById("definition_box").innerHTML = definition;
  return word_arr[position];
}

//returns the amount of times a letter appears in the word
function checkLetterOccurences(letter, word){
  let occurence = 0;
  for (let i = 0; i < word.length; i++){
    if (letter.toLowerCase() == word[i]){
      occurence++;
    }
  }
  return occurence;
}

//object constructor for the buttons
function button(letter) {
  let l_box = document.getElementById("letter_box");
  this.letter = letter;
  this.btn = document.createElement('BUTTON');
  l_box.appendChild(this.btn);	//Places letters inside div box with ID = "letter_box"
  this.btn.className = 'buttonschanger';
  this.btn.style.position = 'relative';
  this.btn.innerHTML = letter;
  this.btn.onclick = function(){
    this.style.visibility = 'hidden';
    testLetter(letter);
    changeScore(checkLetterOccurences(letter, CURRENT_WORD));
    end_condition(CURRENT_DISPLAY_WORD);
  };
}

//checks letter inside CURRENT_WORD
function testLetter(letter){
  for (let i = 0; i < CURRENT_WORD.length; i++){
    if (CURRENT_WORD[i] == letter.toLowerCase()){
      replaceLetter(letter, i);
    }
  }
}

//replaces letter inside CURRENT_DISPLAYED_WORD
function replaceLetter(letter, position){
  let new_word_arr = [];
  for (let i = 0; i < CURRENT_DISPLAY_WORD.length; i++){
    new_word_arr.push(CURRENT_DISPLAY_WORD[i]);
  }
  new_word_arr[position] = letter;
  CURRENT_DISPLAY_WORD = new_word_arr;
  displayWord(CURRENT_DISPLAY_WORD);
}

// Checks for win condition if word is in the bank
function end_condition(word_arr) {
  let word_str = (word_arr.join('')).toLowerCase();
  if (word_str == CURRENT_WORD){
    displayEndScore(score);
  }
}

//creates the buttons for user to click on
function createbutton() {
  for (let i = 0; i < 26; ++i) {
    let letter = String.fromCharCode(65 + i);
    let newbutton = new button(letter);
    buttonarray.push(newbutton);
  }
}

//resets the game to the original position
function resetGame(){
  for (let i = 0; i < buttonarray.length; i++){
    buttonarray[i].btn.style.visibility = 'visible';
  }
  score = 0;
  LIVES = 7;
  updateLivesDisplay();
  updateScoreDisplay();
  CURRENT_WORD = getRandomWord(WORD_BANK, DEFINITION_BANK);
  setDisplayWord(CURRENT_WORD);
  displayWord(CURRENT_DISPLAY_WORD);
  let letterbox = document.getElementById("letter_box");
  let scoreboard = document.getElementById("score_box");
  letterbox.style.display = "block";
  scoreboard.style.display = "none";
}

//changes global variable score and updates the score.
//if occurence == 0 then lives-- and score--, checks if 0 lives after
function changeScore(occurence){
  if (occurence != 0){
    score = score + occurence;
    updateScoreDisplay();
  }
  else {
    score--;
    LIVES--;
    updateScoreDisplay();
    updateLivesDisplay();
    checkLives(score);
  }
}

//prompts user for name, hides letterbox, displays name
function displayEndScore(score){
  let name = prompt("Please enter your name");
  while (name == ''){
    name = prompt("Please enter your name");
  }
  let scoreboard = document.getElementById("score_box");
  let letterbox = document.getElementById("letter_box");
  scoreboard.style.display = "block";
  letterbox.style.display = "none";
  if (LIVES == 0) {
    scoreboard.style.backgroundColor = "red";
    scoreboard.innerHTML = name + ", GAME OVER<br>Your score is " + score;
  }
  else {
    scoreboard.style.backgroundColor = "green";
    scoreboard.innerHTML = name + ", Congratulations!<br> Your score is " + score;
  }
}

//used to reset CURRENT_DISPLAY_WORD to all underscores and display only underscores where the wordbox is
function displayWord(word){
  let word_arr = [];
  for (let i = 0; i < word.length; i++){
    word_arr[i] = '_';
  }
  word_arr = word_arr.join(' ');
  let target = document.getElementById("word_box");
  let newp = document.createElement('p');
  newp.innerHTML = word_arr;
  target.appendChild(newp);
}

//sets the word_box when a letter is guessed correctly
function displayWord(display_word_arr){
  display_word_arr = display_word_arr.join(' ');
  let target = document.getElementById("word_box");
  target.innerHTML = display_word_arr;
}

//part of resetting displayed word to all underscores
function setDisplayWord(word){
  let word_arr = [];
  for (let i = 0; i < word.length; i++){
    word_arr[i] = '_';
  }
  CURRENT_DISPLAY_WORD = word_arr;
}

//updates lives when incorrect guess
function updateLivesDisplay(){
  let target = document.getElementById("lives");
  target.innerHTML = "Lives: " + LIVES;
}

//updates score when user guesses
function updateScoreDisplay(){
  let target = document.getElementById("score");
  target.innerHTML = "Score: " + score;
}

//Checks if the player's lives == 0, if it is 0 then the game ends
function checkLives(){
  if (LIVES == 0){
    displayEndScore(score);
  }
}
  createbutton();
setDisplayWord(CURRENT_WORD);
displayWord(CURRENT_DISPLAY_WORD);
resetbutton.onclick = resetGame;
