# ScrambL - A descendant of Wordle
Players are presented with a string of characters and attempt to find the hidden word or number sequence. Players will be informed when they find a correct character and whether it is in the correct position.
# Table of Contents
- Coming soon
# 1. Project Overview
## 1.1 Main Concept
1. Guess a random hidden 5 letter word with each guess being a real 5 letter word.
2. Each letter you guess is assigned to the following colour:

    2.1 Green - The guessed letter is in the correct place.

    2.2 Yellow - The guessed letter exists in the word, but is in the wrong place.

    2.3 No change - The guessed letter does not exist in the word.
3. You have 6 attempts to guess the correct word. If you fail to guess correctly after those 6 attempts, the game ends.
## 1.2 Additional Features - **Last letter**
1. 5 letter word is chosen, and must be guessed within 6 tries.
2. If the player guesses correctly, a new word is created from the last letter of the correct word.
3. The user continuously guesses until they get a word wrong. Their streak is recorded.
## 1.3 Target Audience
Puzzle players of any age who enjoy a challenge / brain teasers would be the primary audience for this game, however some words could be difficult to guess.
### 1.3.1 User Profile Example
- Discuss needs and expectations
## 1.4 Requirements
### 1.4.1 Functional Requirements
- 5 by 6 grid of letter input boxes.
- Single letter uppercase acceptance for each box.
- Word validation (a guess word must exist).
- Letter colour feedback once word is guessed (explained in main concept).
- Limited to a set number of guesses.
- Player should be able to start a new game (pressing enter).

### 1.4.2 Non-functional Requirements
#### 1.4.2.1 Usability
    - Simple to learn and play.
    - A streak score is updated and shown visually to the user.
    - The best streak is kept even when game is lost
    - After guessing correctly, a new word is chosen starting with the last letter of the previously guessed word
#### 1.4.2.2 Accessibility
- Good use of colour contrast (background to foreground).
- Dyslexia friendly fonts.
- Larger boxes and text inputs to assist people who have bad eyesight.
#### 1.4.2.3 Performance
- Fast page loading of ~2 seconds (uptrends.com, 2025).
- Fast word checking.
#### 1.4.2.1 Visual Design
- Simple, centre focused centre-aligned input boxes for each guess.
- Clear user feedback (green, yellow, and no colour change guesses, win / loss / incorrect word messages) and instructions on how to play.
- Letter box selection - Current box should be highlighted to show the user where they are typing.
- No bright coloured background as it could be distracting. The focus should be on guessing the word, so a darker background and brighter foreground should be used to emphasise this.
# 2. Design
## 2.1 Initial Design
The initial design will follow similar style to the official wordle by the New york times (2021) as described in my Main Concept title.
The main design will be built for desktop (see screenshot below).
<img src="images/main%20design.png" alt="Main Wordle Design"></img>
# 3. Development
- Coming soon
# 4. Testing
Numerous bugs and tests were performed during the development of ScrambL. Some tests were performed on older versions (6 letter wordle) but have since been accepted as fixes that can be applied to 5 letter words.

The first test was previously 6 letters long and had a different idea. This has since been reverted to 5 due to scope creep.

First test was to check if the word exists in the word list, and the minimum number of letters to accept is dependent on how many input boxes there are in the current row.

<img src="images/Prototype%20Validity%20Word%20Test%203.png" alt="Validity test of word - check if 6 letter input in 6 input boxes but word that does not exist is correct"></img>

The second test below shows that only 6 letter words are accepted, any other length is rejected.

<img src="images/Prototype%20Validity%20Word%20Test%202.png" alt="Validity test of word - check if any word that does not fit in 6 letter"></img>

Here is the updated version using 5 letter words, but only inputting 4 (or less for that matter) with the output log.

<img src="images/Validity%20Word%20Test%202%20-%205%20letter.png" alt="Validity test of word - check if a real word exists that is 6 letters long and is accepted"></img>

Checking word validity

<img src="images/Prototype%20Validity%20Word%20Test%201.png" alt="Validity test of word - check if a real word exists that is 6 letters long and is accepted"></img>

A gameplay example, but the word "AHEAD" only contains one E, yet guessing "SHEET" tells us there is another E within the word. This is because it just checks whether its included in the word, not also how many times.

<img src="images/Contains%20One%20Letter%20Bug.png" alt="Gameplay example with double letter bug"></img>

A bug after guessing the correct word, guessing was never reset to the first row, nor was the focus box.

<img src="images/Word%20After%20Words%20Bug.png" alt="A bug after guessing the correct word, guessing was never reset to the first row, nor was the focus box."></img>
# 5. Evaluation
## 5.1. Meeting the Requirements
### 5.1.1 Overall Success
Overall, this game has accurately met its requirements by re-creating wordle with a different spin on it. Feedback is given visually as a text heading at the top so the user knows when the game is won, lost, or if they have an incorrect word (not in word list). Extra feature was added to pick the last letter of the guessed word and use it at the start of the new chosen word for the user to guess.
### 5.1.2 Strengths
- Visual feedback - Letter colours after guessing a word are shown, letting the user know if a letter is in the correct position, not correct but wrong place, and not in the word. Message feedback is given if the word guessed is incorrect, and if you won or lost the game.
- Simple design - This puts the focus on guessing the word. A darker background allows the user to focus more on the foreground (word guessing).
- Larger letter boxes and dyslexia friendly fonts gives a wider audience range a chance to participate.
### 5.1.3 Weaknesses
- Lack of word selection - Choosing the previous words' last letter to start off the next word limits word choice. For example:
    - Many words can end with letter S, which may be a common starting letter theme.
    - Specific letters could be very rare and not picked, like ending with Z or X
- Currently there is no way to reset a word without losing your streak
## 5.2. Reflection
### 5.2.1 Development Process, decisions, challenges and problems faced
Building ScrambL incrementally allows me to find bugs and log my development process better. Developing this, I first created a Python mockup version which worked only in console to prototype my main solution, as I was more familiar with this programming language, figuring out how I would go about doing this for JavaScript. Following this, I followed through with reading up on JavaScript using varying sources such as freeCodeCamp, stackoverflow, and w3schools.

When prototyping the main idea, I created the letter boxes first; 6 of them, as my idea was to initially have 6, and guessing each word would reduce it lower to 5 letter word, then 4, and 3. I reverted this change as my idea was too difficult to implement and due to the time constraint I had for this project.

Through learning about event handling (when a user enters letters into each box), and how to validate the inputs, I collected a large 5 letter word list.
- Development process & individual performance, key decisions, challenges / problems, strengths and weaknesses, area for improvement (mobile support)
## 5.3. Development Considerations
- Prototypes vs main version
## To include
- Used input boxes
# 6. References
- Benveniste, Alexis, and Jackie Frere. “A Collection of the Best Wordle Tips and Tricks.” The New York Times, 10 Feb. 2022, https://www.nytimes.com/2022/02/10/crosswords/best-wordle-tips.html. Accessed 23 Sept. 2026.
- developer.mozilla.org. “HTML input element” MDN Web Docs, 10 Apr. 2025, https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input. Accessed 23 Sept. 2026.
- figma.com (2023). Blue-gray color: Hex code, palettes & meaning. Figma. Available at: https://www.figma.com/colors/blue-gray/ [Accessed 25 Oct. 2026].
- “HTML Input Tag.” www.w3schools.com, 2024, https://www.w3schools.com/tags/tag_input.asp. Accessed 24 Sept. 2026.
- New york times (2021). Wordle - a daily word game. www.nytimes.com. Available at: https://www.nytimes.com/games/wordle/index.html [Accessed 21 Oct. 2026].
- Stack Overflow (2017). What is the JavaScript version of sleep()? Stack Overflow. Available at: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep [Accessed 7 Oct. 2026].
- “Word List By Length” 20 Jul. 2017, https://github.com/MagicOctopusUrn/wordListsByLength. Accessed 25 Sept. 2026.
- W3Schools (n.d.). JavaScript switch statement. www.w3schools.com. Available at: https://www.w3schools.com/js/js_switch.asp [Accessed 21 Oct. 2026].
- “W3Schools Online HTML Editor” www.w3schools.com, 2024, https://www.w3schools.com/html/tryit.asp?filename=tryhtml_styles_background-color. Accessed 25 Sept. 2026.
- Uptrends.com. “The Psychology of Web Performance.” uptrends.com, Apr. 2025, https://www.uptrends.com/blog/the-psychology-of-web-performance. Accessed 25 Sept. 2026