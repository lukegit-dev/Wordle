from random import choice

WORDS = ["beans", "bread", "toast", "plank", "tears", "catch", "pines"]

chosenWord = ""

# Basic implementation before UI
def getRandomWord():
    return choice(WORDS)

def guessWord(word, lettersNotInWord):
    global chosenWord

    newWord = ""

    for i, correctLetter in enumerate(list(chosenWord)):
        letter = word[i]
        if letter == correctLetter:
            # print(f"{letter} is in word!")
            newWord += correctLetter
        elif letter in chosenWord:  # not in correct space but is in word
            newWord += "-"
            # print(f"{letter} in wrong place!")
        else:
            newWord += "_"
            lettersNotInWord += letter

    return newWord, lettersNotInWord

def main():
    global chosenWord

    chosenWord = getRandomWord()

    guessed = ""
    lettersNotInWord = ""
    
    while guessed != chosenWord:
        guessed, lettersNotInWord = guessWord(input("Enter a word you wish to guess: "), lettersNotInWord)
        print(f"Letters not in word: {lettersNotInWord}")
        print(f"Clues: {guessed}")

if __name__ == "__main__":
    main()