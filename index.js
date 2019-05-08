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
console.log(gamobj.currentWord.letterArray);
