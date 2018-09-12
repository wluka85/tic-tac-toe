import Board from './Board.js';

var board = new Board(9);
var sign = "O";
board.drawBoard();
var button = document.getElementById("refresh");
        button.addEventListener("click", function() {
            refreshBoard(board);
        });
addEventListenerToBoard();


function addEventListenerToBoard() {
    let container = document.querySelectorAll('.field');
    let squareList = board.squareList;

    container.forEach(function(div, index) {
        div.addEventListener("click", function() {
            handleMove(div);
            sendBoardJSON(squareList);
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
        isWin(sign)
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
            console.log(data);
        })
}

function refreshBoard(board) {
        let container = document.querySelectorAll('.field');

        fetch('/api/board', {
            method: 'GET'
        })  // set the path; the method is GET by default, but can be modified with a second parameter
            .then((response) => response.json())  // parse JSON format into JS object
            .then((data) => {
                console.log("tojeto");
                console.log(data);
                for (let i=0; i<board.squareList.length; i++) {
                    container[i].innerHTML = data[i].sign;
                }
            })


    }
