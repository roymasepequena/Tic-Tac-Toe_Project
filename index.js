
const gameStatus = document.querySelector('.game-status-display');

let statusActive = true;

let currentPlayer = "X";

let gameBoard = ["","","","","","","","",""];

const winMessage = () => 'Player ' + currentPlayer + ' is the winner.';
const tieMessage = () => "It's a tie. Game over.";
const playerTurn = () => "It's Player " + currentPlayer + "'s turn."

gameStatus.innerHTML = playerTurn();

function currentCellPlayed(currentClickedCell){
   
    const clickedCell = currentClickedCell.target;

    const gameSpaceCell = parseInt(clickedCell.getAttribute('game-space'))

    if(gameBoard[gameSpaceCell] !== ''){
        
        alert('Sorry, that box has already been played.');
        return;
    }

    if(!statusActive){

        alert('Sorry, the game is over. Please start a new game.');
        return;
    }

    playedCell(clickedCell,gameSpaceCell);
    gameResult();
}

function playedCell(clickedCell,gameSpaceCell){
    
    gameBoard[gameSpaceCell] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function gameResult(){
    let gameWon = false;

    for (i = 0; i <= 7; i++){
        const resultCondtion = winCondition[i];

        let a = gameBoard[resultCondtion[0]];
        let b = gameBoard[resultCondtion[1]];
        let c = gameBoard[resultCondtion[2]];

        if (a==='' || b==='' || c===''){
            continue;
        }

        if (a===b && b===c){
            gameWon = true;
            break
        }
    }

    if (gameWon){
        gameStatus.innerHTML = winMessage();
        statusActive = false;
        return;
    }

    let gameTie = !gameBoard.includes("");

    if(gameTie){
    gameStatus.innerHTML = tieMessage();
    statusActive = false;
    return;
    }

    changePlayer();
}

function changePlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.innerHTML = playerTurn();
}

function newGame(){
    statusActive = true;
    currentPlayer = "X";
    gameBoard = ["","","","","","","","",""];
    gameStatus.innerHTML = playerTurn();
    document.querySelectorAll('.box').forEach(box => box.innerHTML = "");
}

document.querySelectorAll('.box').forEach(box => box.addEventListener('click', currentCellPlayed));
document.querySelector('#reset').addEventListener('click', newGame);