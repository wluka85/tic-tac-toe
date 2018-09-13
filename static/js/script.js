import Board from './Board.js';

var board = new Board(9);
var sign = "";

board.drawBoard();

addEventListenerToBoard();
startGame();


function startGame() {
    sendBoardJSON(board.squareList);
    setInterval(function() {
        refreshBoard(board);
        handleGameOver(board);
    }, 1000);
    fetch('/api/get-sign', {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((data) => {
            sign = data;

        })
}


function addEventListenerToBoard() {

    let container = document.querySelectorAll('.field');
    let squareList = board.squareList;

    container.forEach(function(div, index) {
        div.addEventListener("click", function() {
            checkIfYourTurn(div, squareList);
        });
    })
}


function handleMove(div, squareList) {
    let positionStr = div.getAttribute('data-position');
    let positionArray = positionStr.split('.');
    let x = positionArray[0] - 1;
    let y = positionArray[1] - 1;
    if (board.isValidMove(x, y)) {
        console.log("jestem w ifie");
        div.innerHTML = sign;
        board.setSign(x, y, sign);
        sendBoardJSON(board.squareList);
        sendMadeMove();
    }
}


function sendBoardJSON(squareList) {
    fetch('/api/board', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(squareList)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.success);
        })
}

function refreshBoard(board) {
        let container = document.querySelectorAll('.field');

        fetch('/api/board', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("odświeżam");
                for (let i=0; i<board.squareList.length; i++) {
                    container[i].innerHTML = data[i].sign;
                    board.squareList[i].setSign(data[i].sign);
                }
            })
}


function checkIfYourTurn(div, squareList) {

    fetch('/api/check-turn', {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((data) => {

            console.log("Z serwera: " + data + "nasze: " + sign);
            if (data == sign) {
                handleMove(div, squareList)
            }
        })
}


function sendMadeMove() {
    fetch('/api/set-turn', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({sign: sign})
    })
        .then((response) => response.json())
        .then((data) => {
        })
}


function handleGameOver(board) {
    if (board.isWin(sign)) {
        window.location.href = "won-game";
    } else if (board.isLost(sign)) {
        window.location.href = "lost-game";
    }
}
