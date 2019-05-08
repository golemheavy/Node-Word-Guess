module.exports = function Letter(letterVal ) {
	this.letterVal = letterVal.toString().trim().slice(0,1).toLowerCase();
	this.guessed = false;
	this.returnLetter = function() {
		if (this.guessed === true) return this.letterVal;
		else return "_";
	}
	this.checkGuess = function(l) {
		console.log(l.charAt(0));
		console.log(this.letterVal);
		if (this.guessed === false && l.trim().charAt(0).toLowerCase() === this.letterVal) this.guessed = true;
	}
}

//let xlet = new Letter("c");
return module.exports;