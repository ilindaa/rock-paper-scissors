/* Note: I kept the code for "tie" just in case I want to change the game's
 * winning condition: so instead of best of 5, something like 10 games where there
 * could be "tie" rounds and a "tie" game at the end -> see playGame() */

let playerScore = 0;
let computerScore = 0;
// Round number
let roundNum = 1;
// Best of how many games
let bestOf = 5;

/* Use a random function to return either rock, paper, or scissors
 * Create an array with choices
 * Create a random num variable that gets a random number 0 to 2 (indexes in choices)
 * Return the randomized number (index) in choices */
function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    let randomNum = Math.floor(Math.random() * 3);
    return choices[randomNum];
}

/* Function to play 1 round of RPS - winner gets 1 point added to their total score (no points in a draw)
 * Inputs: playerChoice, computerChoice
 * Outputs: string that declares the winner ("You Lost! Paper beats Rock")
 * Return: results (string) */
function playRound(playerChoice, computerChoice) {
    /* Tie
     * Player wins: paper beats rock, rock beats scissors, scissors beats paper
     * Else the player loses */
    if (playerChoice === computerChoice) {
        return `You Tied! ${playerChoice} (You) ties with ${computerChoice} (Computer)`;
    } else if ((playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Scissors" && computerChoice === "Paper") 
    ) {
        playerScore += 1;
        return `You Won! ${playerChoice} (You) beats ${computerChoice} (Computer)`;
    } else {
        computerScore += 1;
        return `You Lost! ${computerChoice} (Computer) beats ${playerChoice} (You)`;
    }
}

// Player clicks a choice button to start the game, playGame calls other functions
function playGame() {
    // If the player or computer's points are equal to the bestOf, return nothing
    // Could change this condition to if roundNum >= 10 -> see top
    if (playerScore === bestOf || computerScore === bestOf) return;

    // Change the image height of each player's choice
    if (roundNum === 1) {
        changeImgHeight();
    }

    let playerChoice = this.id;
    let computerChoice = getComputerChoice();

    // Display round number
    displayRound();
    // Display who won the round in the scrollbar box, sets the image for who chose what
    displayResult(playerChoice, computerChoice);
    // Displays the score
    displayScore();
    // Increase the round number by 1 (played # of games)
    roundNum += 1;

    if (playerScore === bestOf || computerScore === bestOf) {
        displayEnd();
    }
}

// DISPLAY 

// Displays the round number
function displayRound() {
    let displayGameRound = document.getElementById('gameRound');
    displayGameRound.textContent = `RPS Round #${roundNum}`;
}

// Displays the result in the "scrollbar box" and sets each players' choice to the respective image
function displayResult(playerChoice, computerChoice) {
    let displayResult = document.getElementById('gameResult');
    displayResult.innerText += `#${roundNum}: ${playRound(playerChoice, computerChoice)}\n`;
    displayResult.scrollTop = displayResult.scrollHeight;

    if (playerChoice === "Rock") {
        document.getElementById('playerImg').src = 'Images/janken_gu.png';
    } else if (playerChoice === "Paper") {
        document.getElementById('playerImg').src = 'Images/janken_pa.png';
    } else {
        document.getElementById('playerImg').src = 'Images/janken_choki.png';
    }

    if (computerChoice === "Rock") {
        document.getElementById('compImg').src = 'Images/janken_gu.png';
    } else if (computerChoice === "Paper") {
        document.getElementById('compImg').src = 'Images/janken_pa.png';
    } else {
        document.getElementById('compImg').src = 'Images/janken_choki.png';
    }
}

// Displays the score
function displayScore() {
    let displayPlayerScore = document.getElementById('pScore');
    displayPlayerScore.textContent = `You: ${playerScore}`;

    let displayComputerScore = document.getElementById('cScore');
    displayComputerScore.textContent = `Computer: ${computerScore}`;
}

// END OF GAME
// Changes the picture based on the final score
function finalScore() {
    if (playerScore === computerScore) {
        document.getElementById('playerImg').src = 'Images/janken.png';
        document.getElementById('compImg').src = 'Images/janken.png';
        document.getElementById('finalEmoji').src = 'Images/mark_manpu16_ochiba.png';
        return "You tied!";
    } else if (playerScore > computerScore) {
        document.getElementById('playerImg').src = 'Images/pose_win_girl.png';
        document.getElementById('compImg').src = 'Images/pose_lose_boy.png';
        document.getElementById('finalEmoji').src = 'Images/undoukai_trophy_gold.png';
        return "You are the winner!";
    } else {
        document.getElementById('playerImg').src = 'Images/pose_lose_girl.png';
        document.getElementById('compImg').src = 'Images/pose_win_boy.png';
        document.getElementById('finalEmoji').src = 'Images/computer_laptop.png';
        return "Computer is the winner!";
    }
}

// Displays the winner text and prompts the user if they want to play again, prevents user from playing game (remove event listener)
// Can flex using JavaScript
function displayEnd() {
    let displayWinner = document.getElementById('winner');
    displayWinner.innerText = finalScore();
    document.getElementById('finalEmoji').style.visibility = 'visible';

    // Hides the instructions, unhides the game over and play again button
    document.getElementById('instructions').style.visibility = 'hidden';
    document.getElementById('gameComplete').style.visibility = 'visible';

    // Remove event listeners
    removeEventListeners();
}

// Removes the event listeners after the game is over
function removeEventListeners() {
    let buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.removeEventListener('click', playGame);
    })
}

// Start a new game
function startNewGame() {
    // Reset the display everytime a new game is started (regardless of first game or not)
    resetDisplay();

    let buttons = document.querySelectorAll('button');

    // Named function, for all buttons loop through each button to add an event listener to play the game (up until first to 5)
    buttons.forEach((button) => {
        button.addEventListener('click', playGame);
    })
}

// Changes the image's height
function changeImgHeight() {
    let playerImg = document.getElementById('playerImg');
    let compImg = document.getElementById('compImg');
    
    // Remove the higher height class
    playerImg.classList.remove('bothStart');
    compImg.classList.remove('bothStart');

    // Both choice images have a shorter height class, add the shorter height class
    playerImg.classList.add('bothChoice');
    compImg.classList.add('bothChoice');
}

// Resets the game's display
function resetDisplay() {
    // Resets the display and player and computer images
    document.getElementById('gameRound').textContent = 'Rock Paper Scissors (RPS)';
    document.getElementById('instructions').style.visibility = 'visible';

    let playerImg = document.getElementById('playerImg');
    let compImg = document.getElementById('compImg');

    playerImg.src = "Images/aisatsu_kodomo_zenshin_girl.png";
    compImg.src = "Images/aisatsu_kodomo_zenshin_boy.png";

    // Remove the shorter height class in case it's not the first game
    playerImg.classList.remove('bothChoice');
    compImg.classList.remove('bothChoice');

    // Starting player images have higher height, add the higher height class
    playerImg.classList.add('bothStart');
    compImg.classList.add('bothStart');

    // Hides the winner text stuff
    document.getElementById('winner').innerText = '';
    document.getElementById('finalEmoji').style.visibility = 'hidden';
    document.getElementById('gameResult').innerText = '';

    // Hides the game over and play again
    document.getElementById('gameComplete').style.visibility = 'hidden';

    // Resets the game scores and displays the reset scores
    playerScore = 0;
    computerScore = 0;
    roundNum = 1;
    displayScore();
}

// Run this when the page loads
startNewGame();