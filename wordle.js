
// Constants that we need throughout the program
const LETTERS = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

// Detect whether the enter key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submitGuess();
});

let currentRow = 0;  // A counter used to track which row we are on

function submitGuess() {
    const rows = document.querySelectorAll(".word");  // Find all word classes from divs

    console.log("There are", rows.length, "rows");
    
    // If our current row number is beyond the amount of rows we have, then they lost
    if (currentRow >= rows.length) {
        console.log("User ran out of guesses");
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

    console.log("User word is",guess)

    if (
        (guess.length == 6 && !WORDS_6_LETTERS.has(guess)) ||
        (guess.length == 5 && !WORDS_5_LETTERS.has(guess)) ||
        (guess.length == 4 && !WORDS_4_LETTERS.has(guess)) ||
        (guess.length == 3 && !WORDS_3_LETTERS.has(guess))) {
        isValid = false;
    }

    console.log(guess,"validity is",isValid);

    // currentRow++ will be used eventually
}