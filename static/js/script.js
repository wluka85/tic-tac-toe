import Board from './Board.js';
import BoardView from './BoardView.js';

var board = new Board(9);
var boardView = new BoardView();
var sign = "";
var id;

boardView.drawBoard(board.squareList);
addEventListenerToBoard();
startGame();


function startGame() {
    setInterval(function() {
        refreshBoardView();
        handleGameOver();
    }, 1000);
    fetch('/api/get-sign', {
        method: 'GET',
        credentials: 'include'
    })
        .then((response) => response.json())
        .then((data) => {
            sign = data.sign;
            id = data.id;

            if (sign === 'X') {
                document.getElementById("board").setAttribute('class', 'disabled');
                document.body.style.backgroundColor = "#bcc5d4";
                document.body.classList.add("grayed");
            } else {
                document.getElementById("board").setAttribute('class', '');

            }
        })
}


function addEventListenerToBoard() {

    let container = document.querySelectorAll('.field');
    let squareList = board.squareList;

    container.forEach(function(div, index) {
        div.addEventListener("click", function() {
            handleTurn(div);
        });
    })
}


function handleTurn(div) {
    let positionStr = div.getAttribute('data-position');
    let positionArray = positionStr.split('.');
    let x = positionArray[0] - 1;
    let y = positionArray[1] - 1;
    fetch('/api/handle-turn', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({playerSign: sign, playerId: id, coordinateX: x, coordinateY: y})
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success === true) {
                boardView.refreshBoard(data.squareList);
                document.getElementById("board").setAttribute('class', 'disabled');
                document.body.style.backgroundColor = "#bcc5d4";
                document.body.classList.add("grayed");
            }
        })
}


function refreshBoardView() {
        let container = document.querySelectorAll('.field');

        fetch('/api/get-square-list', {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({playerId: id, playerSign: sign})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.squareList);
                if (data.success === true) {
                    boardView.refreshBoard(data.squareList);
                }
            })
}

function drawBoardView() {
        let container = document.querySelectorAll('.field');

        fetch('/api/get-square-list', {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({playerId: id})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.squareList);
                if (data.success === true) {
                    boardView.drawBoard(data.squareList);
                }
            })
}


function handleGameOver() {
    fetch('/api/check-game-over', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({playerSign: sign, playerId: id})
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data.result);
            if (data.result == 'won') {
                console.log('jestem w wygranej');
                window.location.href = "won-game";

            } else if (data.result == 'lost') {
                window.location.href = "lost-game";

            } else if (data.result == 'draw') {
                setTimeout(function() {
                    window.location.href = "tic-tac-toe";
                }, 2000);
            }
        })
}
