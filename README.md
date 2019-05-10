# Node-Word-Guess
This is the popular word guessing game "Hangman." This application is written in node.js.

To install it, please clone the repository and then run 'npm install' to install the node module dependencies.

To run the application, in terminal or your favorite command line environment, change to the directory where the application is installed and invoke from the command line 'node index.js.'

The game allows you to choose a difficulty level when attempting to guess a word. "Easy" corresponds to 8 allowed guess attempts before losing. Likewise, "Regular" allows up to five incorrect guesses before the user fails the challenge, whereas "Difficult" only provides three chances to guess wrongly.

Another noteworthy feature is the ability for the user to customize the list of words and hints which the application uses. The file wordlist.js contains an object with two arrays of strings, wordsArray and hintsArray. The user can change the list if desired. However, it is important to recognize that each hint in the hintsArray corresponds to a word in the wordsArray at the same index, and vice versa. Therefore the arrays must be equal in length or else an error will result.
