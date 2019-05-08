var letterfunc = require("./Letter.js");

module.exports = function Word(wordStr) {
	this.wordStrArr = wordStr.trim().toLowerCase().split("");
	this.letterArray = [];
	for (x in this.wordStrArr) {
		this.letterArray.push(new letterfunc(this.wordStrArr[x]));
	}
	// console.log(this.letterArray); working
	
}

//xwrd = new Word("yolo");
return module.exports;