import Square from './Square.js';

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
                squareList.push(square);
                // container.appendChild(div);
            }
        }
        return squareList;
    };

    drawBoard() {
        let container = document.getElementById('board');

        this.squareList.forEach(function(square, index) {
            container.appendChild(square.getElement());
        })
    }

    
}