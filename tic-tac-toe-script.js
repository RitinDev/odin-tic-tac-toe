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
    Gameboard.createPlayingGrid();

    let turns = 1;
    let playerOne = Player(1, 'player', x);
    let PlayerTwo = Player(2, vsOption, o);
    let gameEnded = false;

    let playTurn = () => {
        let player = choosePlayer();
        if (player === playerOne) {
            chooseSquareHuman(playerOne);
        } else {
            chooseSquareHuman(PlayerTwo);
        }
    }

    let chooseSquareHuman = (player) => {
        playingGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('square') && e.target.innerHTML === '') {
                e.target.innerHTML = player.getMark();
                validSquareChosen = true;
                turns++;
            }
            playTurn.call(this, e);
        }, { once: true });

    }

    let choosePlayer = () => {
        if (turns % 2 != 0) return playerOne;
        return PlayerTwo;
    }

    let nextTurn = () => {
        turns++;
    }


    if (!gameEnded) playTurn();
})();