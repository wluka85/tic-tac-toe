var Square = require('./SquareExpress.js');

module.exports = class BoardExpress {

    constructor(quantity) {
        this.win = false;
        this.quantity = quantity;
        this.squareList = this.prepareBoard();
    }


    prepareBoard() {

        let squareList = [];

        for (let y=0; y<Math.sqrt(this.quantity); y++) {
            for (let x=0; x<Math.sqrt(this.quantity); x++) {
                let square = new Square(x, y);
                squareList.push(square);            }
        }
        return squareList;
    };

    setSign(x, y, sign) {
        this.squareList.forEach(function(square, index) {
            if(square.x == x && square.y == y) {
                square.setSign(sign);
            }
        })
    }

    isValidMove(x, y) {
        let flag = false;
        this.squareList.forEach(function(square, index) {
            if(square.x == x && square.y == y) {
                flag = square.sign.length == 0;
            }
        });

        return flag;
    }

    isWin(sign) {
        return this.signCounterHorizontal(sign) ||
                this.signCounterVertical(sign) ||
                this.signCounterAcross(sign);
    }

    isLost(sign) {
        if (sign == "X") {
            sign = "O";
        } else {
            sign = "X";
        }

        return this.signCounterHorizontal(sign) ||
                this.signCounterVertical(sign) ||
                this.signCounterAcross(sign);
    }

    signCounterVertical(sign) {
        let counter1 = 0;
        let counter2 = 0;
        let counter3 = 0;
        this.squareList.forEach(function(square, index) {
            if(square.x == 0 && square.sign == sign){
                counter1++;
            }
            if(square.x == 1 && square.sign == sign){
                counter2++;
            }
            if(square.x == 2 && square.sign == sign){
                counter3++;
            }
        });
        return counter1 == 3 || counter2 == 3 || counter3 == 3
    }

    signCounterHorizontal(sign) {
        let counter1 = 0;
        let counter2 = 0;
        let counter3 = 0;
        this.squareList.forEach(function(square, index) {
            if(square.y == 0 && square.sign == sign){
                counter1++;
            }
            if(square.y == 1 && square.sign == sign){
                counter2++;
            }
            if(square.y == 2 && square.sign == sign){
                counter3++;
            }
        });
        return counter1 == 3 || counter2 == 3 || counter3 == 3
    }

    signCounterAcross(sign) {
        let counter1 = 0;
        let counter2 = 0;
        this.squareList.forEach(function(square, index) {
            if(square.x == square.y && square.sign == sign){
                counter1++;
            }
            if(square.x + square.y == 2 && square.sign == sign){
                counter2++;
            }
        });
        return counter1 == 3 || counter2 == 3
    }

    isDraw() {
        let counter = 0;
        this.squareList.forEach(function(square, index) {
            if(square.sign == "O" || square.sign == "X"){
                counter++;
            }
        });

        return counter == 9;

    }



}
