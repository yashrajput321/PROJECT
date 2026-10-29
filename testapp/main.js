// Get the key UI elements from the page.
const typingInput = document.querySelector('.typing-input');
const inputContainer = document.querySelector('.input');
const hintTag = document.querySelector('.hint span');
const guessLeft = document.querySelector('.guess-left span');
const wrongLetter = document.querySelector('.wrong-letter span');
const resetBtn = document.querySelector('.reset');
const resultCard = document.querySelector('.result-card');
const resultTitle = document.querySelector('.result-title');
const resultMessage = document.querySelector('.result-message');
const resultClose = document.querySelector('.result-close');

// Track the current word and game state.
let word = '';
let maxGuesses = 0;
let corrects = [];
let incorrects = [];
let isRoundFinished = false;

function showResultCard(title, message) {
    resultTitle.textContent = title;
    resultMessage.textContent = message;
    resultCard.classList.remove('hidden');
    typingInput.disabled = true;
}

function hideResultCard() {
    resultCard.classList.add('hidden');
    typingInput.disabled = false;
    typingInput.focus();
}

// Create one box for each letter in the secret word.
function renderWordBoxes() {
    inputContainer.innerHTML = '';

    for (let i = 0; i < word.length; i++) {
        const box = document.createElement('input');
        box.type = 'text';
        box.disabled = true;
        box.maxLength = 1;
        box.value = '';
        inputContainer.appendChild(box);
    }
}

// Refresh the remaining guesses and wrong-letter display.
function updateStatus() {
    guessLeft.textContent = maxGuesses;
    wrongLetter.textContent = incorrects.length ? incorrects.join(', ') : 'None';
}

// Pick a random word and reset the board for a new round.
function randomWord() {
    hideResultCard();
    isRoundFinished = false;
    const ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word.toLowerCase();
    maxGuesses = word.length >= 5 ? 8 : 6;
    corrects = [];
    incorrects = [];
    hintTag.textContent = ranItem.hint;
    renderWordBoxes();
    updateStatus();
    typingInput.value = '';
    typingInput.disabled = false;
    typingInput.focus();
}

// Handle each input letter from the player.
function handleGuess(e) {
    if (isRoundFinished) {
        e.target.value = '';
        return;
    }

    const key = e.target.value.toLowerCase();

    // Ignore empty or invalid input.
    if (!key || !/^[a-z]$/.test(key)) {
        e.target.value = '';
        return;
    }

    // Prevent duplicate guesses.
    if (corrects.includes(key) || incorrects.includes(key)) {
        e.target.value = '';
        return;
    }

    // If the letter is in the word, reveal it in the correct slots.
    if (word.includes(key)) {
        corrects.push(key);

        const boxes = inputContainer.querySelectorAll('input');
        boxes.forEach((box, index) => {
            if (word[index] === key) {
                box.value = key.toUpperCase();
            }
        });
    } else {
        // Otherwise, count it as a wrong guess.
        incorrects.push(key);
        maxGuesses--;
        updateStatus();
    }

    // Clear the input after each guess.
    e.target.value = '';

    // Check whether the word is fully solved.
    const allFilled = [...inputContainer.querySelectorAll('input')].every((box) => box.value !== '');

    if (allFilled) {
        isRoundFinished = true;
        setTimeout(() => {
            showResultCard('You Won!', `Congrats! You found the word ${word.toUpperCase()}.`);
        }, 100);
        return;
    }

    // Check if the player has used all guesses.
    if (maxGuesses < 1) {
        isRoundFinished = true;
        setTimeout(() => {
            showResultCard('Game Over', `The word was ${word.toUpperCase()}. Better luck next time!`);
            const boxes = inputContainer.querySelectorAll('input');
            boxes.forEach((box, index) => {
                box.value = word[index].toUpperCase();
            });
        }, 100);
    }
}

// Wire up the controls and start the first round.
resetBtn.addEventListener('click', randomWord);
resultClose.addEventListener('click', () => {
    hideResultCard();
    randomWord();
});
typingInput.addEventListener('input', handleGuess);
inputContainer.addEventListener('click', () => typingInput.focus());
document.addEventListener('keydown', () => typingInput.focus());

randomWord();