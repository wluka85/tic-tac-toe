import Square from "/js/Square.js";


function sendBoardJSON(squareList) {
    console.log(squareList);
}

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
        let squareArray = this.squareList;
        this.squareList.forEach(function(square, index) {
            let div = square.getElement();
            container.appendChild(div);
            div.addEventListener("click", function(){
                let positionStr = div.getAttribute('data-position');
                let positionArray = positionStr.split('.');
                square.setSign('X');
                // console.log(square);
                // console.log(squareArray);
                div.innerHTML = 'X';
                sendBoardJSON(squareArray);
                // console.log(positionArray);
                // console.log(squareArray);

                // squareArray.
            });
        })
    }


}
