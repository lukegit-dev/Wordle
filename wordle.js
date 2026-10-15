
// Constants that we need throughout the program
const LETTERS = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

let currentRow = 0;  // A counter used to track which row we are on
let currentWord = [];
let currentStreak = 0;
let topStreak = 0;
let gameOver = false;
let messageDiv = null;
let gamesPlayed = 0;

function setCurrentWord() {
    messageDiv.textContent = "Streak: "+currentStreak+" | Best Streak: "+topStreak;
    const rows = document.querySelectorAll(".word");  // Find all word classes from divs
    
    if (rows.length === 6) {
        currentWord = [...WORDS_5_LETTERS][Math.floor(Math.random() * [...WORDS_5_LETTERS].length)];  // Randomly choose a word from 5 letter word list
        console.log("Chosen word is", currentWord);  // Output correct word for testing and validations
    }
}

function inputFocusNavigation() {
    const rows = document.querySelectorAll(".word");  // Get all rows of words

    rows.forEach((row) => {  // Loop through each row of rows
        const inputs = row.querySelectorAll(".letter");

        inputs.forEach((input, index) => {  // Loop through each letter box
            input.addEventListener("input", () => {  // If a letter is typed into the letter input box
                // If user typed a character and the index is still within the minimum range 
                if (input.value.length >= 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();  // Move to the next letter box
                }
            });

            input.addEventListener("keydown", (e) => {  // If a key is pressed
                // If the backspace key is pressed, current box is empty, and index is within the max range
                if (e.key === "Backspace" && input.value.length === 0 && index > 0) {
                    inputs[index - 1].focus();  // Move to the previous letter box
                }
            });
        });
    });
}

// Detect whether the enter key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (gameOver) {
            console.log("Game over", topStreak);
            const rows = document.querySelectorAll(".word");
            rows[0].querySelector(".letter").focus();  // Focus on the very start on game being reset
            // Go through each word from currentRow and letters in them, set them all to read only and unselectable
            for (let x = 0; x < rows.length; x++) {
                const inputBoxes = rows[x].querySelectorAll(".letter");
                for (let y = 0; y < inputBoxes.length; y++) {
                    inputBoxes[y].value = "";  // Clear the input box
                    inputBoxes[y].style.backgroundColor = "rgb(180, 180, 180)";  // change colour back to default
                    // turn off read only and unselectable
                    inputBoxes[y].removeAttribute("readonly");
                    inputBoxes[y].style = "pointer-events: auto";
                }
            }

            setCurrentWord();

            gameOver = false;
        } else {
            submitGuess();
        }
    }
});


// check if elements are loaded BEFORE checking for rows; otherwise it will display as zero rows.
document.addEventListener("DOMContentLoaded", () => {
    messageDiv = document.getElementById("message");

    setCurrentWord();
    inputFocusNavigation();
});

function submitGuess() {
    messageDiv.textContent = "Streak: "+currentStreak+" | Best Streak: "+topStreak;

    const rows = document.querySelectorAll(".word");  // Find all word classes from divs
    const inputs = rows[currentRow].querySelectorAll(".letter");
    const letters = [];

    let isValid = true;  // Assume word is valid until proven otherwise

    // Get each letter within each box
    for (let i = 0; i < inputs.length; i++) {
        const letter = inputs[i].value.toUpperCase();  // Read letter from input

        // If our letter is not blank and is a letter from A-Z
        if (letter !== "" && LETTERS.has(letter)) {
            letters.push(letter);  // Add letter to our letters
        } else {
            messageDiv.textContent = "Word "+letters.join("")+" is not valid!";
            console.log("Invalid word! Not filled.");
            isValid = false;  // Any blank character, invalid word
            break;
        }
    }

    const guess = letters.join("").toUpperCase();  // Construct our word from letters

    console.log("User guessed '"+guess+"'");

    if (guess.length == 5 && !WORDS_5_LETTERS.has(guess)) {
        isValid = false;
    }

    let allCorrect = 0;

    if (isValid) {
        // Loop through each letter
        for (let i = 0; i < inputs.length; i++) {
            const userLetter = inputs[i].value.toUpperCase();
            const wordLetter = currentWord[i];
            
            // Add attribute to input; set to read only and unselectable;
            inputs[i].setAttribute("readonly", true);
            inputs[i].style = "pointer-events: none";

            if (userLetter === wordLetter) {  // if their word letter is in the same position as the chosen current word letter
                allCorrect++;  // Track how man letters are correct
                inputs[i].style.backgroundColor = "rgb(0, 220, 0)";  // Green background
            } else if (currentWord.includes(userLetter)) {   // Word included but wrong position
                inputs[i].style.backgroundColor = "rgb(220, 220, 0)";  // Yellow background
            } else {  // not in word
                inputs[i].style.backgroundColor = "rgb(255, 255, 255)";  // White background
            }
        }

        if (allCorrect === inputs.length) {
            currentStreak += 1;
            
            // Go through each word from currentRow and letters in them, set them all to read only and unselectable
            for (let x = currentRow+1; x < rows.length; x++) {
                const inputBoxes = rows[x].querySelectorAll(".letter");
                for (let y = 0; y < inputBoxes.length; y++) {
                    inputBoxes[y].setAttribute("readonly", true);
                    inputBoxes[y].style = "pointer-events: none";
                }
            }

            messageDiv.textContent = "You won! The word is "+currentWord+". Streak: "+currentStreak+" | Best Streak: "+topStreak+"";

            gameOver = true;  // Game is over, choose a different word
            currentRow = 0;  // Reset current row to zero - the new will start on the first row, not at the end of the previous row you won on

            console.log("User won! Word was "+currentWord+". Best streak:",topStreak,"Current streak:",currentStreak);

            return;
        }

        currentRow++;
    } else {
        console.log("Word is not valid!", guess);
        messageDiv.textContent = "Word "+guess+" is not a word in the dictionary!";
    }

    // If our current row number is beyond the amount of rows we have, then they lost
    if (currentRow >= rows.length) {
        messageDiv.textContent = "You ran out of guesses! Streak: "+currentStreak+" | Best Streak: "+topStreak;
        currentRow = 0;
        currentStreak = 0;  // Reset users current streak to zero
        gameOver = true;  // Set game state to game over
        console.log("User ran out of guesses. Best streak:",topStreak,"Current streak:",currentStreak);
        return;
    }
}