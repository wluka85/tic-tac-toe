import Board from './Board.js';

class Main {
    static init() {
        let board = new Board(9);
        board.drawBoard();
        let button = document.getElementById("refresh");
        button.addEventListener("click", function() {
            board.refreshBoard();
        });
    }

}

Main.init();
