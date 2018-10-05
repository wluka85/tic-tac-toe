var Board = require('./BoardExpress.js');
var Player = require('./PlayerExpress.js');

module.exports = class GameExpress {

    constructor(quantity) {
        this.board = new Board(quantity);
        this.playerList = new Array();
        this.turnSign = 'O';
    }

    setPlayer(id) {
        if (this.playerList.length == 0) {
            this.playerList.push(new Player(id, 'O'));
        } else if (this.playerList.length == 1) {
            this.playerList.push(new Player(id, 'X'));
        }
    }

    checkPlayerId(id) {
        for (let i = 0; i < this.playerList.length; i++) {
            if (this.playerList[i].id == id) {
                return true;
            }
        }

        return false;
    }

    getPlayerSign(id) {
        for (let i = 0; i < this.playerList.length; i++) {
            if (this.playerList[i].id == id) {
                return this.playerList[i].sign;
            }
        }
    }

    isAvailableGame() {
        return this.playerList.length < 2;
    }

    checkWhoseTurn(sign) {
        return sign == this.turnSign;
    }

    setTurnSign(playerSign) {
        if (playerSign == "X") {
            this.turnSign = "O";
        } else {
            this.turnSign = "X";
        }
    }

    isValidMove(x, y) {
        return this.board.isValidMove(x, y);
    }

    handleMove(x, y, sign) {
        this.board.setSign(x, y, sign);
    }

    getSquareList() {
        return this.board.squareList;
    }
}
