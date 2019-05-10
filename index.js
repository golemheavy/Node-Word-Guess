var word = require("./Word.js");
var inquirer = require("inquirer");
var wordList = require("./wordlist.js"); // read in the word list from file

var wordListObj = { 
	wordlist : wordList.wordsArray,
	hintlist : wordList.hintsArray,
	getRandomWordIndex : function() {
		return Math.floor(Math.random() * this.wordlist.length);
	},
	getRandomWord : function() {
		var x = this.getRandomWordIndex();
		return {word: this.wordlist[x], hint: this.hintlist[x]};
	}
}
	
function GameObject(guesses) {

	this.userGuessesRemaining = guesses;
	this.over = false;
	this.lettersChecked = "";
	this.currentWord = new word(wordListObj.getRandomWord());
}

console.log("Welcome to Word Guess.");
console.log("Choose a level of difficulty to begin.");

function newGame() {
	inquirer.prompt([
	{
		type: 'list',
		name: 'difficulty',
		message: 'What level of difficulty would you enjoy?',
		choices: ['Easy', 'Regular', 'Difficult'],
		filter: function(val) {
			return val.toLowerCase();
		}
	}
	]).then(function(answers) {
		switch (answers.difficulty) {
			case "easy": console.log("easy mode -- 8 guesses"); main(new GameObject(8)); break;
			case "regular": console.log("regular mode -- 5 guesses"); main(new GameObject(5)); break;
			case "difficult": console.log("difficult mode -- 3 guesses"); main(new GameObject(3)); break;
			default: console.log("Error, something strange happened."); break;
		}
	});
}

function main(gameObject) {
	if (gameObject.userGuessesRemaining > 0 && gameObject.over !== true) {
		console.log("Guesses Remaining:\t" + gameObject.userGuessesRemaining);
		console.log("Letters Already Guessed:\t" + (function(){if(gameObject.lettersChecked.length === 0) return "(none)"; else return gameObject.lettersChecked;})());
		console.log("current word:\t" + gameObject.currentWord.displayWord());
		inquirer.prompt([
		{
			type: 'input',
			name: 'guessedLetter',
			message: 'Please Guess a letter. (enter "!" for hint, Ctrl-C to quit)',
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
			if (answers.guessedLetter === "!") { // show hint and break out
				console.log("\n\tHint:\t" + gameObject.currentWord.hintString + "\n");
			}
			else if (!gameObject.lettersChecked.includes(answers.guessedLetter.toLowerCase())) {
				gameObject.lettersChecked += answers.guessedLetter.toLowerCase();
				for (x in gameObject.currentWord.letterArray) {
					if (gameObject.currentWord.letterArray[x].checkGuess(answers.guessedLetter)) addedLetter = true;
				}
				if (addedLetter === false) {
					console.log("Incorrect guess!");
					gameObject.userGuessesRemaining--;
					if (gameObject.userGuessesRemaining < 1) {
						gameObject.over = true;
						console.log("Game Over!");
						console.log("Your word was:\t " + gameObject.currentWord.wordString);
						inquirer.prompt([
						{
							type: 'confirm',
							name: 'playAgain',
							message: 'Would you like to play again?',
						}
						]).then(function(answers) {
							if (answers.playAgain) newGame();
							else return console.log("Thank you for playing.");
						});
					}
				}
				else if (!(gameObject.currentWord.letterArray.filter((letter) => {if (!letter.guessed) return letter}).length > 0)) { // then no letters remain unguessed. Win condition satisfied
					gameObject.over = true;
					console.log("You guessed the word!");
					console.log("Your word was:\t " + gameObject.currentWord.wordString);
					console.log("Bravo! Well done.");
					inquirer.prompt([
					{
						type: 'confirm',
						name: 'playAgain',
						message: 'Would you like to play again?',
					}
					]).then(function(answers) {
						if (answers.playAgain) {
							console.log("Next Word!");
							console.log("-----------------------------");
							newGame();
						}
						else return console.log("Thank you for playing.");
					});
				}
				else console.log("Correct guess! Good job.");
			}
			else console.log("Please enter a new letter you haven't previously guessed.");
			main(gameObject)
		});
	}
}

newGame();