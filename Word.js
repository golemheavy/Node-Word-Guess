const letter = require("./Letter.js");

//module.exports = function Word(wordStr) {
module.exports = function Word(wordObj) {
	this.wordString = wordObj.word.trim().toLowerCase();
	this.wordStrArr = this.wordString.split("");
	this.letterArray = [];
	for (x in this.wordStrArr) {
		this.letterArray.push(new letter(this.wordStrArr[x]));
	};
	this.displayWord = function() {
		return this.letterArray.map((x) => {return x.toString()}).join(" ");
	}
	this.hintString = wordObj.hint.trim().toLowerCase();
}

return module.exports;