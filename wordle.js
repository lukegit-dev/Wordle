
// Constants that we need throughout the program
const LETTERS = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

// Detect whether the enter key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submitGuess();
});

let currentRow = 0;  // A counter used to track which row we are on
let currentWord = [];
let currentStreak = 0;
let topStreak = 0;

function setCurrentWord() {
    const rows = document.querySelectorAll(".word");  // Find all word classes from divs

    console.log("There are", rows.length, "rows");
    
    if (rows.length === 6) {
        // the [...WORDS_6_LETTERS] sets the set to an array
        currentWord = [...WORDS_5_LETTERS][Math.floor(Math.random() * [...WORDS_5_LETTERS].length)];  // Randomly choose a word from 6 letter word list
        console.log(currentWord);
        
    }

    let lettersInWord = currentWord.split("");

    console.log(lettersInWord);
}
// check if elements are loaded BEFORE checking for rows; otherwise it will display as zero rows.
document.addEventListener("DOMContentLoaded", () => {
    setCurrentWord()
})

function submitGuess() {
    const rows = document.querySelectorAll(".word");  // Find all word classes from divs

    console.log("There are", rows.length, "rows");
    
    // If our current row number is beyond the amount of rows we have, then they lost
    if (currentRow >= rows.length) {
        topStreak = currentStreak;
        currentStreak = 0;  // reset users current streak to zero
        console.log("User ran out of guesses. Top streak:",topStreak);
        // Will implement a visual message display here
        return;
    }

    const inputs = rows[currentRow].querySelectorAll(".letter");
    const letters = [];

    let isValid = true;

    // Get each letter within each box
    for (let i = 0; i < inputs.length; i++) {
        const letter = inputs[i].value.toUpperCase();  // Read letter from input

        // If our letter is not blank and is a letter from A-Z
        if (letter !== "" && LETTERS.has(letter)) {
            letters.push(letter);  // Add letter to our letters
        } else {
            console.log("Invalid word! Not filled.")
            isValid = false;  // Blank character
            break;
        }
    }

    const guess = letters.join("").toUpperCase();  // Construct our word from letters

    console.log("User word is", guess)

    if (guess.length == 5 && !WORDS_5_LETTERS.has(guess)) {
        isValid = false;
    }

    let allCorrect = 0;

    console.log(guess,"validity is", isValid);

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
            console.log("YOU WON!");
            // Go through each word from currentRow and letters in them, set them all to read only and unselectable
            for (let x = currentRow+1; x < rows.length; x++) {
                const inputBoxes = rows[x].querySelectorAll(".letter");
                for (let y = 0; y < inputBoxes.length; y++) {
                    inputBoxes[y].setAttribute("readonly", true);
                    inputBoxes[y].style = "pointer-events: none";
                }
            }
        }

        currentRow++;
    }
}