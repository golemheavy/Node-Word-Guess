var word = require("./Word.js");
var inquirer = require("inquirer");

var wordListObj = {
	wordlist : [
		"signatory",
		"ecumenical",
		"dormitory",
		"smorgasboard",
		"peripatetic",
		"antidisestablishmentarianism",
		"merovingian",
		"alpine"
	],
	getRandomWord : function() {
		return this.wordlist[Math.floor(Math.random() * this.wordlist.length)];
	}
}
	
function GameObject(guesses) {

	this.userGuessesRemaining = guesses;
	this.lettersChecked = "";
	this.currentWord = new word(wordListObj.getRandomWord());
}

console.log("Welcome to Word Guess.");
console.log("Choose a level of difficulty to begin.");

inquirer.prompt([
	{
		type: 'list',
		name: 'difficulty',
		message: 'What level of difficulty would you enjoy?',
		choices: ['easy', 'regular', 'difficult'],
		filter: function(val) {
			return val.toLowerCase();
		}
	}
]).then(function(answers) {
	switch (answers.difficulty) {
		case "easy": console.log("easy mode -- 8 guesses"); gamobj = new GameObject(8); break;
		case "regular": console.log("regular mode -- 5 guesses"); gamobj = new GameObject(5); break;
		case "difficult": console.log("difficult mode -- 3 guesses"); gamobj = new GameObject(3); break;
		default: console.log("Error, something strange happened."); break;
	}
	main(gamobj);
});


function main(gameObject) {
	console.log("current word:\t" + gameObject.currentWord.displayWord());
inquirer.prompt([
	{
		type: 'input',
		name: 'guessedLetter',
		message: 'Please Guess a letter.',
		validate: function validateLetter(guessedLetter) {
			return (guessedLetter.length === 1 && "abcdefghijklmnopqrstuvwxyz".includes(guessedLetter.toLowerCase())) || 'Please enter a single letter';
		}
		//filter: change to toLowerString value
	}
]).then(function(answers) {
	let x = 0;
	let addedLetter = false;
	if (!gameObject.lettersChecked.includes(answers.guessedLetter.toLowerCase())) {
		gameObject.lettersChecked += answers.guessedLetter.toLowerCase();
		for (x in gameObject.currentWord.letterArray) {
			if (gameObject.currentWord.letterArray[x].checkGuess(answers.guessedLetter)) addedLetter = true;
		}
		if (addedLetter === false) {
			gameObject.userGuessesRemaining --;
			if (gameObject.userGuessesRemaining < 1) return console.log("Game Over! Thank you for playing.");  // need to ask them if they want to play again
		}
	}
	else console.log("Please enter a new letter you haven't previously guessed.");
	main(gameObject)
});
	
}