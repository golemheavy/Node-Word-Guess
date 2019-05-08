var letterfunc = require("./Letter.js");

module.exports = function Word(wordStr) {
	this.wordStrArr = wordStr.trim().toLowerCase().split("");
	this.letterArray = [];
	for (x in this.wordStrArr) {
		this.letterArray.push(new letterfunc(this.wordStrArr[x]));
	};
	this.displayWord = function() {
		console.log((this.letterArray.map((x) => {return x.toString();})).join(" "));
	}
}

return module.exports;