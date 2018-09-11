import Board from './Board.js';

class Main {
    static init() {
        let board = new Board(9);
        board.drawBoard();
    }    
}

Main.init();