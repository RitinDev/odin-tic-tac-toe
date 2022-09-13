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
        let squareSelector = `div.playing-grid > div.square.\\3${index}`;
        return document.querySelector(squareSelector);
    }

    let clearBoard = () => {
        let squares = playingGrid.querySelectorAll('.square');
        squares.forEach(square => {
            square.innerHTML = '';
            square.removeAttribute('id');
            square.style.backgroundColor = '';
        });
    }

    return { createPlayingGrid, getSquare, clearBoard }
})();

// Factory function to produce players
const Player = (number, type, mark, winner = false) => {
    let getNumber = () => number;
    let getType = () => type;
    let getMark = () => mark;

    return { getNumber, getType, getMark, winner };
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
            hasGameEnded();
            // Change Player
            if (currentPlayer === playerOne) currentPlayer = playerTwo;
            else currentPlayer = playerOne;
            // Next Turn
            turns++;
            // console.log(turns++);
        }
    }

    // Function to check if game has ended or not
    let hasGameEnded = () => {
        checkWinHorizontal();
        checkWinVertical();
        checkWinDiagonal();
        if (turns >= 9) gameEnded = true;

        if (gameEnded) {
            playingGrid.removeEventListener('click', playGame);
            console.log('Game Over!');
            setTimeout(() => {
                resetGame();
            }, 2500);
        };
    }

    let checkWinHelper = (squareOne, squareTwo, squareThree) => {
        if (!squareOne.id) return false;
        if (!squareTwo.id) return false;
        if (!squareThree.id) return false;
        return (squareOne.id === squareTwo.id && squareOne.id === squareThree.id);
    }

    const zero = Gameboard.getSquare(0);
    const one = Gameboard.getSquare(1);
    const two = Gameboard.getSquare(2);
    const three = Gameboard.getSquare(3);
    const four = Gameboard.getSquare(4);
    const five = Gameboard.getSquare(5);
    const six = Gameboard.getSquare(6);
    const seven = Gameboard.getSquare(7);
    const eight = Gameboard.getSquare(8);
    const winningTileColor = 'var(--selection-yellow)';

    let checkWinHorizontal = () => {
        if (checkWinHelper(zero, one, two)) {
            let temp = [zero, one, two];
            temp.forEach(square => square.style.backgroundColor = winningTileColor);
            currentPlayer.winner = true;
            gameEnded = true;
        } else if (checkWinHelper(three, four, five)) {
            let temp = [three, four, five];
            temp.forEach(square => square.style.backgroundColor = winningTileColor);
            currentPlayer.winner = true;
            gameEnded = true;
        } else if (checkWinHelper(six, seven, eight)) {
            let temp = [six, seven, eight];
            temp.forEach(square => square.style.backgroundColor = winningTileColor);
            currentPlayer.winner = true;
            gameEnded = true;
        }
    }

    let checkWinVertical = () => {
        if (checkWinHelper(zero, three, six)) {
            let temp = [zero, three, six];
            temp.forEach(square => square.style.backgroundColor = winningTileColor);
            currentPlayer.winner = true;
            gameEnded = true;
        } else if (checkWinHelper(one, four, seven)) {
            let temp = [one, four, seven];
            temp.forEach(square => square.style.backgroundColor = winningTileColor);
            currentPlayer.winner = true;
            gameEnded = true;
        } else if (checkWinHelper(two, five, eight)) {
            let temp = [two, five, eight];
            temp.forEach(square => square.style.backgroundColor = winningTileColor);
            currentPlayer.winner = true;
            gameEnded = true;
        }
    }

    let checkWinDiagonal = () => {
        if (checkWinHelper(zero, four, eight)) {
            let temp = [zero, four, eight];
            temp.forEach(square => square.style.backgroundColor = winningTileColor);
            currentPlayer.winner = true;
            gameEnded = true;
        } else if (checkWinHelper(two, four, six)) {
            let temp = [two, four, six];
            temp.forEach(square => square.style.backgroundColor = winningTileColor);
            currentPlayer.winner = true;
            gameEnded = true;
        }
    }

    let resetGame = () => {
        Gameboard.clearBoard();
        gameEnded = false;
        turns = 1;
        currentPlayer = getStartingPlayer();
        playingGrid.addEventListener('click', playGame);
    }

    playingGrid.addEventListener('click', playGame);
})();