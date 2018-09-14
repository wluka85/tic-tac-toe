import Square from "/js/Square.js";

export default class Board {

    constructor(quantity) {
        this.win = false;
        this.quantity = quantity;
        this.squareList = this.prepareBoard();
        //console.log(this.squareList);
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

    deleteDiv() {
        let fieldArray = document.querySelectorAll('.field');
        let parent = document.getElementById('board');

        for (let i=0; i<fieldArray.length; i++) {
            parent.removeChild(fieldArray[i]);
        }
    }

    drawBoard() {
        let container = document.getElementById('board');
        let squareArray = this.squareList;
        this.squareList.forEach(function(square, index) {
            let div = square.getElement();
            container.appendChild(div);
        })
    }

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
        this.signCounterHorizontal(sign);
        this.signCounterVertical(sign);
        this.signCounterAcross(sign);

        return this.win;
    }

    isLost(sign) {
        if (sign == "X") {
            sign = "O";
        } else {
            sign = "X";
        }

        this.signCounterHorizontal(sign);
        this.signCounterVertical(sign);
        this.signCounterAcross(sign);

        return this.win;
    }

    signCounterVertical(sign) {
        let counter1 = 0;
        let counter2 = 0;
        let counter3 = 0;
        this.squareList.forEach(function(square, index) {
            if(square.x == 0 && square.sign == sign){
                counter1++;
                console.log("counter1++");
            }
            if(square.x == 1 && square.sign == sign){
                counter2++;
                console.log("counter2++");
            }
            if(square.x == 2 && square.sign == sign){
                counter3++;
                console.log("counter3++");
            }
        });
        if(counter1 == 3 || counter2 == 3 || counter3 == 3){
            this.win = true;
            console.log("wygrales gosciu vertical!");
        }
    }

    signCounterHorizontal(sign) {
        let counter1 = 0;
        let counter2 = 0;
        let counter3 = 0;
        this.squareList.forEach(function(square, index) {
            if(square.y == 0 && square.sign == sign){
                counter1++;
                console.log("counter1++");
            }
            if(square.y == 1 && square.sign == sign){
                counter2++;
                console.log("counter2++");
            }
            if(square.y == 2 && square.sign == sign){
                counter3++;
                console.log("counter3++");
            }
        });
        if(counter1 == 3 || counter2 == 3 || counter3 == 3){
            this.win = true;
            console.log("wygrales gosciu Horizontal!");
        }
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
        if(counter1 == 3 || counter2 == 3){
            this.win = true;
            console.log("wygrales gosciu Across!");
        }
    }

}       
