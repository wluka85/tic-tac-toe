import Square from "/js/Square.js";

export default class Board {

    constructor(quantity) {
        this.quantity = quantity;
        this.squareList = this.prepareBoard();
        console.log(this.squareList);
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
        var flag = false;
        this.squareList.forEach(function(square, index) {
            if(square.x == x && square.y == y) {
                flag = square.sign.length == 0;
            }
        });

        return flag;
    }
}
