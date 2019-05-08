var letterfunc = require("./Letter.js");

function Word(wordStr) {
	this.wordStrArr = wordStr.trim().toLowerCase().split("");
	console.log(this.wordStrArr);
	this.letterArray = [];
	for (x in this.wordStrArr) {
		this.letterArray.push(new letterfunc(this.wordStrArr[x]));
	}
	// console.log(this.letterArray); working
	
}

xwrd = new Word("yolo");