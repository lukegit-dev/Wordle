
// Constants that we need throughout the program
const LETTERS = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

let currentRow = 0;  // A counter used to track which row we are on
let currentWord = [];
let currentStreak = 0;
let topStreak = 0;
let gameOver = false;

function setCurrentWord() {
    const rows = document.querySelectorAll(".word");  // Find all word classes from divs

    console.log("There are", rows.length, "rows");
    
    if (rows.length === 6) {
        currentWord = [...WORDS_5_LETTERS][Math.floor(Math.random() * [...WORDS_5_LETTERS].length)];  // Randomly choose a word from 5 letter word list
        console.log("Chosen word is", currentWord);  // Output correct word for testing and validations
    }

    let lettersInWord = currentWord.split("");  // Split word into letters and store in an array

    const allInputs = document.querySelectorAll(".word input");  // Get all input boxes from the word divs

    allInputs.forEach((input, index) => {  // Loop through each letter box
        input.addEventListener("input", () => {  // If a letter is typed into the letter input box
            // If user typed a character and the index is still within the minimum range 
            if (input.value.length >= 1 && index < allInputs.length - 1) {
                allInputs[index + 1].focus();  // Move to the next letter box
            }
        });

        input.addEventListener("keydown", (e) => {  // If a key is pressed
            // If the backspace key is pressed, current box is empty, and index is within the max range
            if (e.key === "Backspace" && input.value.length === 0 && index > 0) {
                allInputs[index - 1].focus();  // Move to the previous letter box
            }
        });
    });
}

// Detect whether the enter key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (gameOver) {
            console.log("Game over", topStreak);
            const rows = document.querySelectorAll(".word");
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
    setCurrentWord()
});

function submitGuess() {
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
            console.log("Invalid word! Not filled.");
            isValid = false;  // Any blank character, invalid word
            break;
        }
    }

    const guess = letters.join("").toUpperCase();  // Construct our word from letters

    console.log("User guessed word '", guess, "'");

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

            currentRow = 0;  // Reset current row to zero - the new will start on the first row, not at the end of the previous row you won on

            // Focus back onto the first input box of the first row

            inputs[0].focus();

            gameOver = true;

            alert("YOU WON WITH A STREAK OF "+currentStreak);

            return;

            // Press enter to reset / restart the game
        }

        currentRow++;
    } else {
        console.log("Word is not valid!", guess)
    }

    // If our current row number is beyond the amount of rows we have, then they lost
    if (currentRow >= rows.length) {
        currentStreak = 0;  // reset users current streak to zero
        gameOver = true;  // Set game state to game over
        console.log("User ran out of guesses. Top streak:",topStreak);
        alert("You lost! Your top streak was "+topStreak);
        // Will implement a visual message display here
        return;
    }
}