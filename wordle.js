alert("Welcome to ScrambL!\n\nTo guess a word, type it out and press enter.\n\nYellow letter means its in the word but in the wrong place. White letter means its not in the word. Green letter means you have it in the right place.\n\nIf you guess a word correctly, the next word will start with the last letter of the previous word.\n\nGood luck!")
// Constants that we need throughout the program
const LETTERS = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

let currentRow = 0;  // A counter used to track which row we are on
let selectedWord = [];
let currentStreak = 0;
let topStreak = 0;
let gameOver = false;
let messageDiv = null;
let gamesPlayed = 0;
let lastLetter = "";

function setselectedWord() {
    messageDiv.textContent = "Streak: "+currentStreak+" | Best Streak: "+topStreak;
    const rows = document.querySelectorAll(".word");  // Find all word classes from divs

    let WORDS_5_LETTERS_LIST = null;
    
    if (rows.length === 6) {
        switch (lastLetter) {
            // Depending on the letter, select a random word from a word list starting with the last letter as the first
            case "A":
                WORDS_5_LETTERS_LIST = A_WORDS_5_LETTERS;
                break;
            case "B":
                WORDS_5_LETTERS_LIST = B_WORDS_5_LETTERS;
                break;
            case "C":
                WORDS_5_LETTERS_LIST = C_WORDS_5_LETTERS;
                break;
            case "D":
                WORDS_5_LETTERS_LIST = D_WORDS_5_LETTERS;
                break;
            case "E":
                WORDS_5_LETTERS_LIST = E_WORDS_5_LETTERS;
                break;
            case "F":
                WORDS_5_LETTERS_LIST = F_WORDS_5_LETTERS;
                break;
            case "G":
                WORDS_5_LETTERS_LIST = G_WORDS_5_LETTERS;
                break;
            case "H":
                WORDS_5_LETTERS_LIST = H_WORDS_5_LETTERS;
                break;
            case "I":
                WORDS_5_LETTERS_LIST = I_WORDS_5_LETTERS;
                break;
            case "J":
                WORDS_5_LETTERS_LIST = J_WORDS_5_LETTERS;
                break;
            case "K":
                WORDS_5_LETTERS_LIST = K_WORDS_5_LETTERS;
                break;
            case "L":
                WORDS_5_LETTERS_LIST = L_WORDS_5_LETTERS;
                break;
            case "M":
                WORDS_5_LETTERS_LIST = M_WORDS_5_LETTERS;
                break;
            case "N":
                WORDS_5_LETTERS_LIST = N_WORDS_5_LETTERS;
                break;
            case "O":
                WORDS_5_LETTERS_LIST = O_WORDS_5_LETTERS;
                break;
            case "P":
                WORDS_5_LETTERS_LIST = P_WORDS_5_LETTERS;
                break;
            case "Q":
                WORDS_5_LETTERS_LIST = Q_WORDS_5_LETTERS;
                break;
            case "R":
                WORDS_5_LETTERS_LIST = R_WORDS_5_LETTERS;
                break;
            case "S":
                WORDS_5_LETTERS_LIST = S_WORDS_5_LETTERS;
                break;
            case "T":
                WORDS_5_LETTERS_LIST = T_WORDS_5_LETTERS;
                break;
            case "U":
                WORDS_5_LETTERS_LIST = U_WORDS_5_LETTERS;
                break;
            case "V":
                WORDS_5_LETTERS_LIST = V_WORDS_5_LETTERS;
                break;
            case "W":
                WORDS_5_LETTERS_LIST = W_WORDS_5_LETTERS;
                break;
            case "X":
                WORDS_5_LETTERS_LIST = X_WORDS_5_LETTERS;
                break;
            case "Y":
                WORDS_5_LETTERS_LIST = Y_WORDS_5_LETTERS;
                break;
            case "Z":
                WORDS_5_LETTERS_LIST = Z_WORDS_5_LETTERS;
                break;
            default:
                WORDS_5_LETTERS_LIST = WORDS_5_LETTERS;
                break;
        }

        selectedWord = [...WORDS_5_LETTERS_LIST][Math.floor(Math.random() * [...WORDS_5_LETTERS_LIST].length)];

        console.log("Chosen word is", selectedWord);  // Output correct word for testing and validations
    }
}

function inputFocusNavigation() {
    const rows = document.querySelectorAll(".word");  // Get all rows of words

    rows[0].querySelectorAll(".letter")[0].focus();

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

function invalidateNonLetterInputs() {
    const letterInputs = document.querySelectorAll('.letter');
    
    letterInputs.forEach(input => {  // Loop through each input box
    
    input.addEventListener('input', (e) => {  // When user enters into the letter input box
        // Check for non letters and replace them with nothing (only allow letters to be inputted)
        e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
    });
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {  // Detect whether the enter key is pressed
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

            setselectedWord();

            gameOver = false;
        } else {
            submitGuess();
        }
    }
});

// check if elements are loaded BEFORE checking for rows; otherwise it will display as zero rows.
document.addEventListener("DOMContentLoaded", () => {
    messageDiv = document.getElementById("message");

    setselectedWord();
    inputFocusNavigation();
    invalidateNonLetterInputs();
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
            const wordLetter = selectedWord[i];
            
            // Add attribute to input; set to read only and unselectable;
            inputs[i].setAttribute("readonly", true);
            inputs[i].style = "pointer-events: none";

            if (userLetter === wordLetter) {  // if their word letter is in the same position as the chosen current word letter
                allCorrect++;  // Track how man letters are correct
                inputs[i].style.backgroundColor = "rgb(0, 230, 0)";  // Green background
            } else if (selectedWord.includes(userLetter)) {   // Word included but wrong position
                inputs[i].style.backgroundColor = "rgb(230, 230, 0)";  // Yellow background
            } else {  // not in word
                inputs[i].style.backgroundColor = "rgb(255, 255, 255)";  // White background
            }
        }

        if (allCorrect === inputs.length) {
            currentStreak += 1;
            lastLetter = selectedWord[4];
            
            // Go through each word from currentRow and letters in them, set them all to read only and unselectable
            for (let x = currentRow+1; x < rows.length; x++) {
                const inputBoxes = rows[x].querySelectorAll(".letter");
                for (let y = 0; y < inputBoxes.length; y++) {
                    inputBoxes[y].setAttribute("readonly", true);
                    inputBoxes[y].style = "pointer-events: none";
                }
            }

            messageDiv.textContent = "You won! Streak: "+currentStreak+" | Best Streak: "+topStreak;

            gameOver = true;  // Game is over, choose a different word
            currentRow = 0;  // Reset current row to zero - the new will start on the first row, not at the end of the previous row you won on

            console.log("User won! Word was "+selectedWord+". Best streak:",topStreak,"Current streak:",currentStreak);

            return;
        }

        currentRow++;
    } else {  // Invalid word
        messageDiv.textContent = "Word is invalid / not in the dictionary!";
        console.log("Word '"+guess+"' is not valid!");
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

    if (isValid) {
        rows[currentRow].querySelector(".letter").focus();  // Focus on the first letter of the next row
    }
}