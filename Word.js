var letterfunc = require("./Letter.js");

module.exports = function Word(wordStr) {
	this.wordString = wordStr.trim().toLowerCase();
	this.wordStrArr = this.wordString.split("");
	this.letterArray = [];
	for (x in this.wordStrArr) {
		this.letterArray.push(new letterfunc(this.wordStrArr[x]));
	};
	this.displayWord = function() {
		return this.letterArray.map((x) => {return x.toString()}).join(" ");
	}
}

return module.exports;