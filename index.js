const inquirer = require("inquirer");
const chalk = require('chalk');

const word = require("./Word.js");
const wordList = require("./wordlist.js"); // read in the word list from file

const bigRed = chalk.bold.red;  // define some constants for using chalk with console.log and other methods
const bigGreen = chalk.bold.green;
const bigOrange = chalk.bold.keyword('orange');

const wordListObj = { 
	wordlist : wordList.wordsArray, // set the word list
	hintlist : wordList.hintsArray, // set the hint list
	getRandomWordIndex : function() {
		return Math.floor(Math.random() * this.wordlist.length);
	},
	getRandomWord : function() {
		let x = this.getRandomWordIndex();
		return {word: this.wordlist[x], hint: this.hintlist[x]};
	}
}

function promptForNewGame() {

	inquirer.prompt([
	{
		type	: 'confirm',
		name	: 'playAgain',
		message	: 'Would you like to play again?',
	}
	]).then(function(answers) {
		if (answers.playAgain) {
			console.log("\nNext Word!");
			console.log("\n-----------------------------\n");
			newGame();
		}
		else return console.log("\nThank you for playing.\n");
	});
}

function GameObject(guesses) {

	this.userGuessesRemaining = guesses;
	this.over = false;
	this.lettersChecked = "";
	this.currentWord = new word(wordListObj.getRandomWord()); // set the current word and hint
}

function newGame() {
	inquirer.prompt([
	{
		type	: 'list',
		name	: 'difficulty',
		message	: 'What level of difficulty would you enjoy?',
		choices	: ['Easy', 'Regular', 'Difficult'],
		filter	: function(val) {return val.toLowerCase();}
	}
	]).then(function(answers) {
		switch (answers.difficulty) {
			case "easy"		: console.log("easy mode -- 8 guesses"); main(new GameObject(8)); break;
			case "regular"	: console.log("regular mode -- 5 guesses"); main(new GameObject(5)); break;
			case "difficult": console.log("difficult mode -- 3 guesses"); main(new GameObject(3)); break;
			default			: console.log(bigRed("Error, something strange happened.")); break; // this branch should never happen
		}
	});
}

function main(gameObject) {

	console.log("\nGuesses Remaining:\t" + bigOrange(gameObject.userGuessesRemaining));
	console.log("\nLetters Already Guessed:\t" + (function(){if(gameObject.lettersChecked.length === 0) return "(none)"; else return chalk.inverse(gameObject.lettersChecked.toUpperCase().split("").join(" "));})());
	console.log("\ncurrent word:\t" + gameObject.currentWord.displayWord() + "\n");
	inquirer.prompt([
	{
		type	: 'input',
		name	: 'guessedLetter',
		message	: 'Please Guess a letter. (enter "!" for hint, Ctrl-C to quit)',
		validate: function validateLetter(guessedLetter) {
			return (guessedLetter.length === 1 && "!abcdefghijklmnopqrstuvwxyz".includes(guessedLetter.toLowerCase())) || 'Please enter a single letter';
		},
		filter: function(val) {
			return val.toLowerCase();
		}
	}
	]).then(function(answers) {
		let x = 0;
		let addedLetter = false;
		if (answers.guessedLetter === "!") { // show hint
			console.log(chalk.bold("\n\n\tHint:\t") + bigOrange(gameObject.currentWord.hintString) + "\n");
		}
		else if (!gameObject.lettersChecked.includes(answers.guessedLetter.toLowerCase())) {
			gameObject.lettersChecked += answers.guessedLetter.toLowerCase(); // add the entered letter to the letters already guessed array
			for (x in gameObject.currentWord.letterArray) {
				if (gameObject.currentWord.letterArray[x].checkGuess(answers.guessedLetter)) addedLetter = true;
			}
			if (addedLetter === false) {
				console.log(bigRed("\nIncorrect guess!"));
				gameObject.userGuessesRemaining--;
				if (gameObject.userGuessesRemaining < 1) {
					gameObject.over = true;
					console.log("\nGame Over!");
					console.log("\nYour word was:\t " + bigOrange(gameObject.currentWord.wordString.toUpperCase()) + "\n");
					promptForNewGame();
				}
			}
			else if (!(gameObject.currentWord.letterArray.filter((letter) => {if (!letter.guessed) return letter}).length > 0)) { // then no letters remain unguessed. Win condition satisfied
				gameObject.over = true;
				console.log("\nYou guessed the word!");
				console.log("\nYour word was:\t " + bigOrange(gameObject.currentWord.wordString.toUpperCase()));
				console.log(bigGreen("\nBravo! Well done.\n"));
				promptForNewGame();
			}
			else console.log(bigGreen("\nCorrect guess! Good job."));
		}
		else console.log("\nPlease enter a new letter you haven't previously guessed.");
		if (gameObject.userGuessesRemaining > 0 && gameObject.over !== true) main(gameObject); // keep accepting letters if game isn't over
	});
}

console.log("\nWelcome to " + bigOrange("Word Guess."));
console.log("\nChoose a level of difficulty to begin.\n");
newGame();