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
        console.log("Ran out of guesses");
        // Will implement a visual message display here
        return;
    }

    const inputs = rows[currentRow].querySelectorAll(".letter");
    const letters = [];

    // Get each letter within each box
    for (let i = 0; i < inputs.length; i++) {
        console.log(letters[i]);
        letters.push(inputs[i]);  // Add letter to our letters
    }

    console.log(letters);

    // currentRow++ will be used eventually
}