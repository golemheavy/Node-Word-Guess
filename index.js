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

console.log("Please enter a number of guesses:");

inquirer.prompt([
  {
    name: "guesses",
    message: "How many guesses would you like to have?"
  }
]).then(function(answers) {
	console.log(answers);
});