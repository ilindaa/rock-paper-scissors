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

// function to play a 5-round game
// inputs: num of rounds in the game
// outputs: the winner and game score
// call another function to keep score (global), report a winner or loser at the end
function game(num) {
    for(let i = 1; i <= num; i++) {
        let playerChoice = prompt('Please enter "Rock", "Paper", or "Scissors"');
        console.log(`Round ${roundNum}`);
        console.log(playRound(playerChoice, getComputerChoice()));
        roundNum += 1;
    }
    score();
}

function score() {
    if (playerScore === computerScore) {
        console.log("You tied!");
    } else if (playerScore > computerScore) {
        console.log("You are the winner!");
    } else {
        console.log("Computer is the winner!");
    }
    console.log(`You: ${playerScore}, Computer: ${computerScore}`);
}

// call the function to play a 5-round game
game(5);