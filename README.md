# Node-Word-Guess
This is the popular word guessing game "Hangman." This application is written in node.js.

To install it, please clone the repository and then run `npm install` to install the node module dependencies.

To run the application, in terminal or your favorite command line environment, change to the directory where the application is installed and invoke `node index.js` from the command line.

![screenshot](./images/difficultylevels.PNG)

The game allows the user to choose a difficulty level when attempting to guess a word. "Easy" corresponds to eight allowed guess attempts before the game is lost. Likewise, "Regular" allows up to five incorrect guesses before the user fails the challenge, whereas "Difficult" only provides three chances to guess wrongly.

Once the user chooses a difficulty level, a word is randomly selected from the wordList object in the wordlist.js file and the user is allowed to enter letters to try against the word. Before letters are correctly guessed, the letters are displayed masked.

![screenshot](./images/correct.PNG)

If the user guesses a letter that is in the mystery word, the letter is revealed in the mystery word. If the user guesses a letter which is not in the word, the game indicates this with a message, and decrements the number of guesses remaining.

![screenshot](./images/hint.PNG)

If you would like to see a hint, enter '!' instead of a letter, and a hint will appear.

The game is won if the user completes the hidden word before exhausting the remaining chances to guess. But if the user exhausts all chances to guess before completely revealing the hidden word, the game is lost.

At the end of every game, regardless of whether the user won or lost, the user will be asked to play again.

Another noteworthy feature is the ability for the user to customize the list of words and hints which the application uses. The file wordlist.js contains an object with two arrays of strings, wordsArray and hintsArray. The user can change the list if desired. However, it is important to recognize that each hint in the hintsArray corresponds to a word in the wordsArray at the same index, and vice versa. Therefore the arrays must be equal in length or else an error will result.
