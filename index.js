var word = require("./Word.js");

function GameObject(guesses) {
	this.wordlist = [
		"signatory",
		"ecumenical",
		"dormitory",
		"smorgasboard",
		"peripatetic",
		"antidisestablishmentarianism",
		"merovingian",
		"alpine"
	];
	this.getRandomWord = function() {
		return this.wordlist[Math.floor(Math.random() * this.wordlist.length)];
	};
	this.userGuessesRemaining = guesses;
}

gamobj = new GameObject(5);
console.log(gamobj);
gamobj.currentWord = new word(gamobj.getRandomWord());

let x = 0;
for (x in gamobj.currentWord.letterArray) {
	console.log(gamobj.currentWord.letterArray[x] + ""); // this causes type coercian, which calls the overloaded toString function I defined for my Letter constructor. This causes the placeholder to read out instead of the defined letter, unless the letter has been guessed.
};



