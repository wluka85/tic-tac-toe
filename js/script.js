// const gameBoard = new Board(9);
// document.getElementById("board").innerHTML = gameBoard;

// var putSign = function() {
// console.log("jestem");
// }


// var getCoordinate = function(event) {
//     var child = event.target;
//     console.log(child);
// }

// var square = document.querySelector('#board');
// square.addEventListener('click', getCoordinate);


class Main {
    static init() {
        let board = new Board(25);
        board.drawBoard();
    }    
}

Main.init();