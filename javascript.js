let playerScore = 0;
let computerScore = 0;
let roundNum = 1;

// function random returns either rock, paper, or scissors
// create an array with choices
// create a random num variable that gets a random number 0 to 2 (indexes in choices)
// return the randomized number (index) in choices

function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    let randomNum = Math.floor(Math.random() * 3);
    return choices[randomNum];
}

// function to play 1 round of rps
// call another function to take the user's choice and make the first letter uppercase and the remaining string lowercase
// inputs: playerChoice (case insensitive), computerChoice
// outputs: string that declares the winner ("You Lost! Paper beats Rock")
// return: results (string)

function playRound(playerChoice, computerChoice) {
    playerChoice = fixCase(playerChoice);
    // tie
    // player wins: paper beats rock, rock beats scissors, scissors beats paper
    // else the player loses
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

function fixCase(playerChoice) {
    let firstLetter = playerChoice.slice(0, 1).toUpperCase();
    let restOfString = playerChoice.slice(1).toLowerCase();
    return firstLetter + restOfString;
}

// changes the picture based on the final score
function score() {
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

// run game, call other UI functions
let checkDone = false;

function playGame() {
    if (checkDone === true) return; // doesn't execute the below

    let playerChoice = this.id;
    let computerChoice = getComputerChoice();

    displayRound();
    displayResult(playerChoice, computerChoice);
    displayScore();

    if ((playerScore === 5 || computerScore === 5) && checkDone === false) { // not done yet
        displayEnd();
    }

    roundNum += 1;
}

// displays the round number
function displayRound() {
    let displayGameRound = document.querySelector('#gameRound');
    displayGameRound.textContent = `RPS Round #${roundNum}`;
}

// displays the result in the "scrollbar box" and sets each players' choice to the respective image
function displayResult(playerChoice, computerChoice) {
    let displayResult = document.querySelector('#gameResult');
    displayResult.innerHTML += `#${roundNum}: ` + `${playRound(playerChoice, computerChoice)}` + "<br>";

    if(playerChoice === "Rock") {
        document.getElementById('playerImg').src = 'Images/janken_gu.png';
    } else if(playerChoice === "Paper") {
        document.getElementById('playerImg').src = 'Images/janken_pa.png';
    } else {
        document.getElementById('playerImg').src = 'Images/janken_choki.png';
    }

    if(computerChoice === "Rock") {
        document.getElementById('compImg').src = 'Images/janken_gu.png';
    } else if(computerChoice === "Paper") {
        document.getElementById('compImg').src = 'Images/janken_pa.png';
    } else {
        document.getElementById('compImg').src = 'Images/janken_choki.png';
    }

}

// displays the score
function displayScore() {
    let displayPlayerScore = document.querySelector('#pScore');
    displayPlayerScore.textContent = `You: ${playerScore}`;

    let displayComputerScore = document.querySelector('#cScore');
    displayComputerScore.textContent = `Computer: ${computerScore}`;
}

// displays the winner text and prompts the user if they want to play again, prevents user from playing game (remove event listener)
// can flex using JavaScript
function displayEnd() {
    let displayWinner = document.querySelector('#winner');
    displayWinner.innerHTML = score();
    document.getElementById('finalEmoji').style.visibility = "visible";

    let gameComplete = document.querySelector('#gameComplete');
    gameComplete.innerHTML += "Game Over? ";

    let restart = document.createElement('button');
    restart.innerHTML = '<a href="index.html" style="color: white">Play Again!</a>';
    restart.classList.add('linkButton');
    gameComplete.appendChild(restart);

    document.getElementById('remove').remove(); // delete the ul

    this.removeEventListener('click', playGame);
    checkDone = true;
}

// buttons
let buttons = document.querySelectorAll('button');

// named function, for all buttons loop through each button to add an event listener to play the game (up until first to 5)
buttons.forEach((button) => {
    button.addEventListener('click', playGame);
})
