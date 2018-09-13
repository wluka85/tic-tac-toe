import Board from './Board.js';

var board = new Board(9);
var sign = "";


board.drawBoard();

// var button = document.getElementById("refresh");
// button.addEventListener("click", function() {
//     refreshBoard(board);
// });
addEventListenerToBoard();

var buttonStartGame = document.getElementById("start-game");
buttonStartGame.addEventListener("click", function() {
    startGame();


});


function startGame() {
    sendBoardJSON(board.squareList);
    setInterval(function() {refreshBoard(board)}, 1000);
    fetch('/api/get-sign', {
        method: 'GET'
    })  // set the path; the method is GET by default, but can be modified with a second parameter
        .then((response) => response.json())  // parse JSON format into JS object
        .then((data) => {
            sign = data;

            if (sign === "X") {
                document.getElementById("board").setAttribute('class', 'disabled');
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
            checkIfYourTurn(div, squareList);

            // if (checkIfYourTurn(div, squareList)) {
            //     console.log("wszedłem do pierwszego w ifie");
            //     //handleMove(div, squareList);
            // }
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
        // board.isWin(sign);
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
        })  // set the path; the method is GET by default, but can be modified with a second parameter
            .then((response) => response.json())  // parse JSON format into JS object
            .then((data) => {
                console.log("odświeżam");
                for (let i=0; i<board.squareList.length; i++) {
                    container[i].innerHTML = data[i].sign;
                    if (board.squareList[i].getSign() != data[i].sign) {
                        board.squareList[i].setSign(data[i].sign);
                        document.getElementById("board").setAttribute('class', '');
                    }

                }
                
            })


    }


function checkIfYourTurn(div, squareList) {

    fetch('/api/check-turn', {
        method: 'GET'
    })  // set the path; the method is GET by default, but can be modified with a second parameter
        .then((response) => response.json())  // parse JSON format into JS object
        .then((data) => {

            console.log("Z serwera: " + data + "nasze: " + sign);
            if (data == sign) {
                //turn = true;

                handleMove(div, squareList)
            }
            // else {
            //     turn = false;
            // }
        })

        //console.log(turn);

    //return turn;
}

function sendMadeMove() {
    fetch('/api/set-turn', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({sign: sign})
    })
        .then((response) => response.json())
        .then((data) => {

            if (data.success === "true") {
                document.getElementById("board").setAttribute('class', 'disabled');
            }
        })
}
