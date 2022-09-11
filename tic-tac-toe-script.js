const x = `<i class="fa-solid fa-x"></i>`;
const o = `<i class="fa-regular fa-circle"></i>`;
const playingGrid = document.querySelector('.playing-grid')
const vsOption = document.querySelector('#player-type-drop-down').value;

// Gameboard module
let Gameboard = (() => {
    let gridSquares = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ]

    let createPlayingGrid = () => {
        for (let i = 0; i < gridSquares.length; i++) {
            let square = document.createElement('div');
            square.classList.add('square', gridSquares[i]);
            playingGrid.appendChild(square);
        }
    }

    let getSquare = (index) => {
        return gridSquares[index];
    }

    return { createPlayingGrid, getSquare }
})();

// Factory function to produce players
const Player = (number, type, mark) => {
    let getNumber = () => number;
    let getType = () => type;
    let getMark = () => mark;

    return { getNumber, getType, getMark };
}

// Game module
let Game = (() => {
    // "Global variables" for the Game module
    Gameboard.createPlayingGrid();
    let playerOne = Player(1, 'player', x);
    let playerTwo = Player(2, vsOption, o);
    let turns = 1;
    let gameEnded = false;
    let getStartingPlayer = () => {
        let players = [playerOne, playerTwo]
        return players[Math.floor(Math.random() * players.length)];
    }
    let currentPlayer = getStartingPlayer();


    // Function to play each turn of the game, check if game ended or not, and proceed to next turn
    playGame = (e) => {
        let squareClicked = e.target;
        let squareEmpty = squareClicked.classList.contains('square') && squareClicked.innerHTML === '';
        if (squareEmpty) {
            // Place Mark
            squareClicked.innerHTML = currentPlayer.getMark();
            squareClicked.setAttribute('id', currentPlayer.getNumber());
            // Check if the game has ended or not
            hasGameEnded(squareClicked);
            // Change Player
            if (currentPlayer === playerOne) currentPlayer = playerTwo;
            else currentPlayer = playerOne;
            // Next Turn
            // turns++;
            console.log(turns++);
        }
    }

    // Function to check if game has ended or not
    let hasGameEnded = () => {
        if (turns >= 9) {
            gameEnded = true;
        }
    }

    playingGrid.addEventListener('click', playGame);
})();