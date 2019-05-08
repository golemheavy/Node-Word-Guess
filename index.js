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
	this.lettersChecked = "";
}

/*
gamobj = new GameObject(5);
console.log(gamobj);
gamobj.currentWord = new word(gamobj.getRandomWord());
*/

/*
let x = 0;
for (x in gamobj.currentWord.letterArray) {
	console.log(gamobj.currentWord.letterArray[x] + ""); // this causes type coercian, which calls the overloaded toString function I defined for my Letter constructor. This causes the placeholder to read out instead of the defined letter, unless the letter has been guessed.
};
*/

/*
while (true) {
	
	let guesses = parseInt(prompt("How many guesses?"));
	if (guesses > 0 && guesses < 12) {let gamobj = new GameObject(guesses);}
	else console.log("please enter a value of guesses between 1 and 12");
}
*/
console.log("Please enter a number of guesses:");

const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);



let promise1 = new Promise(function(resolve, reject) {
	let entry = "";
	process.stdin.on('keypress', (str, key) => {
		if ("0123456789".includes(str)) {
			process.stdout.write(str);
			entry += str;
		}
		if ( key.sequence === '\u0003' || key.sequence === '\r' ) {  // stop reading stdin if control-c or return is pressed
			resolve(entry);
		}		
	});
}).then(function(val){
		console.log("\n");
		console.log(val + " guesses entered.");
		let guesses = Math.floor(parseFloat(val));
		if (guesses > 0 && guesses < 12) {
			let gamobj = new GameObject(guesses);
			gamobj.currentWord = new word(gamobj.getRandomWord());
			main(gamobj);
		}
		else console.log("please enter a value of guesses between 1 and 12");
		process.exit()
}).catch(function(error) {
	console.log(error);
	process.exit();
});

function main(gameObject) {
	console.log(gameObject.userGuessesRemaining + " guesses remaining.");
	console.log("Word to guess:");
	gameObject.currentWord.displayWord();
	console.log("Please press a key to guess a letter.");
	
	//const readline = require('readline');
	readline.emitKeypressEvents(process.stdin);
	process.stdin.setRawMode(true);
	
	let promise1 = new Promise(function(resolve, reject) {
		process.stdin.on('keypress', (str, key) => {
			pressedKey = str.trim().toLowerCase().splice(0,1);
			if ("abcdefghijklmnopqrstuvwxyz".includes(pressedKey)) {
				process.stdout.write(pressedKey);
				if (!gameObject.lettersChecked.includes(pressedKey)) {
					resolve(pressedKey);
				}
				else console.log(pressedKey + " has already been guessed.");
			}
			if ( key.sequence === '\u0003' || key.sequence === '\r' ) {  // stop reading stdin if control-c or return is pressed
				process.exit();
			}		
		});
	}).then(function(val){
	process.exit();
	gameObject.lettersChecked += val;
	let x = 0;
	for (x in gameObject.currentWord.letterArray) {
		gameObject.currentWord.letterArray[x].checkGuess(pressedKey);
	}
	console.log(gameObject.userGuessesRemaining + " guesses remaining.");
	console.log("Word to guess:");
	gameObject.currentWord.displayWord();
}).catch(function(error) {
	console.log(error);
	process.exit();
});
}