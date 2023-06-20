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
// inputs: playerSelection (case insensitive), computerSelection
// outputs: string that declares the winner ("You Lose! Paper beats Rock)
// return: results (string)

function playRound(playerSelection, computerSelection) {
    playerSelection = fixCase(playerSelection);
    // tie
    // player wins: paper beats rock, rock beats scissors, scissors beats paper
    // else the player loses
    if (playerSelection === computerSelection) {
        return `You Tied! ${playerSelection} (You) ties with ${computerSelection} (Computer)`;
    } else if ((playerSelection === "Paper" && computerSelection === "Rock") ||
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Scissors" && computerSelection === "Paper") 
    ) {
        playerScore += 1;
        return `You Won! ${playerSelection} (You) beats ${computerSelection} (Computer)`;
    } else {
        computerScore += 1;
        return `You Lose! ${computerSelection} (Computer) beats ${playerSelection} (You)`;
    }
}

function fixCase(playerSelection) {
    let firstLetter = playerSelection.slice(0, 1).toUpperCase();
    let restOfString = playerSelection.slice(1).toLowerCase();
    return firstLetter + restOfString;
}

function score() {
    if (playerScore === computerScore) {
        return "You tied!";
    } else if (playerScore > computerScore) {
        return "You are the winner!";
    } else {
        return "Computer is the winner!";
    }
}

let buttons = document.querySelectorAll('button');

// turn the function into a named function
// remove the event listener at round 5 and update the winner
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (roundNum === 5) {
            let displayWinner = document.querySelector('#winner');
            displayWinner.textContent = score();
            console.log("test");
        }

        let playerChoice = button.id;
        let computerChoice = getComputerChoice();

        // display game round
        let displayGameRound = document.querySelector('#gameRound');
        displayGameRound.textContent = `Round #${roundNum}`;

        // displays result
        let displayResult = document.querySelector('#result');
        displayResult.textContent = playRound(playerChoice, computerChoice);

        // displays score
        let displayPlayerScore = document.querySelector('#pScore');
        displayPlayerScore.textContent = `You: ${playerScore}`;

        let displayComputerScore = document.querySelector('#cScore');
        displayComputerScore.textContent = `Computer: ${computerScore}`;

        roundNum += 1;
    });
})
