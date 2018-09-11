import Board from './Board.js';

var board = new Board(9);
var sign = "O";
board.drawBoard();
addEventListenerToBoard();


function addEventListenerToBoard() {
    let container = document.querySelectorAll('.field');
    let squareArray = board.squareList;

    container.forEach(function(div, index) {
        div.addEventListener("click", function() {
            handleMove(div);
            sendBoardJSON();
        });
    })
}


function handleMove(div) {
    let positionStr = div.getAttribute('data-position');
    let positionArray = positionStr.split('.');
    let x = positionArray[0] - 1;
    let y = positionArray[1] - 1;
    if (board.isValidMove(x, y)) {
        div.innerHTML = sign;
        board.setSign(x, y, sign);
    }
}


function sendBoardJSON(squareList) {
    console.log(board.squareList);
}
