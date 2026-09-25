# ScrambL - A descendant of Wordle
Players are presented with a string of characters and attempt to find the hidden word or number sequence. Players will be informed when they find a correct character and whether it is in the correct position.
# Table of Contents
- Coming soon
# Project Overview
## Main Concept
1. Guess a random hidden 5 letter word with each guess being a real 5 letter word.
2. Each letter you guess is assigned to the following colour:

    2.1 Green - The guessed letter is in the correct place.

    2.2 Yellow - The guessed letter exists in the word, but is in the wrong place.

    2.3 No change - The guessed letter does not exist in the word.
3. You have 6 attempts to guess the correct word. If you fail to guess correctly after those 6 attempts, the game ends.
## Target Audience
Puzzle players of any age who enjoy a challenge / brain teasers would be the primary audience for this game.
## Requirements
### Functional Requirements
- 6 by 5 grid of letter input boxes.
- Single letter uppercase acceptance for each box.
- Word validation (word must exist).
- Letter colour feedback once word is guessed (explained in main concept).
- Limited to a set amount of guesses.
- Player should be able to start a new game.
### Non-functional Requirements
- Usability - Simple to learn and play.
- Accessibility - Good use of colour contrast.
- Performance - Page should load fast. Choosing and checking word against word list should be under ~2 seconds (uptrends.com, 2025)-
- Visual Design - Simple design, focused centre-aligned input boxes for each guess. Clear user feedback (green, yellow, and no colour change guesses, win / loss message) and instructions on how to play.
## Additional Features
### **ScrambL**
1. 6 letter word is chosen.
2. If the player guesses correctly, the word decreases in size by 1 letter, and is chosen using the letters of the previous word.
3. Example: design -> dings -> sing -> gin
## Design
- Coming soon
## Development
- Coming soon
# Testing
- Coming soon
# References
- Benveniste, Alexis, and Jackie Frere. “A Collection of the Best Wordle Tips and Tricks.” The New York Times, 10 Feb. 2022, https://www.nytimes.com/2022/02/10/crosswords/best-wordle-tips.html. Accessed 23 Sept. 2026.
- developer.mozilla.org. “HTML input element” MDN Web Docs, 10 Apr. 2025, https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input. Accessed 23 Sept. 2026.
- www.uptrends.com. “The Psychology of Web Performance.” uptrends.com, Apr. 2025, https://www.uptrends.com/blog/the-psychology-of-web-performance. Accessed 25 Sept. 2026.
- “HTML Input Tag.” www.w3schools.com, 2024, https://www.w3schools.com/tags/tag_input.asp. Accessed 24 Sept. 2026.
- “W3Schools Online HTML Editor.” www.w3schools.com, 2024, https://www.w3schools.com/html/tryit.asp?filename=tryhtml_styles_background-color. Accessed 25 Sept. 2026.
