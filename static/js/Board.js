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
                squareList.push(square);
                // container.appendChild(div);
            }
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
        this.deleteDiv();
        let container = document.getElementById('board');
        //let squareArray = this.squareList;
        let that = this;
        this.squareList.forEach(function(square, index) {
            let div = square.getElement();
            container.appendChild(div);
            div.addEventListener("click", function(){
                let positionStr = div.getAttribute('data-position');
                let positionArray = positionStr.split('.');
                square.setSign('X');
                // console.log(square);
                // console.log(squareArray);
                // div.innerHTML = 'X';
                square.setFillout(div);

                that.sendBoardJSON();
                // console.log(positionArray);
                // console.log(squareArray);

                // squareArray.
            });
        })
    }

    sendBoardJSON() {
        fetch('/api/board', {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(this)
        })  // set the path; the method is GET by default, but can be modified with a second parameter  
            .then((response) => response.json())  // parse JSON format into JS object  
            .then((data) => {  
                console.log(data);  
            })
    }

    refreshBoard() {
        let that = this;
        console.log(that);

        fetch('/api/board', {
            method: 'GET'
        })  // set the path; the method is GET by default, but can be modified with a second parameter  
            .then((response) => response.json())  // parse JSON format into JS object  
            .then((data) => {  
                //console.log(this);
                for (let i=0; i<that.squareList.length; i++) {
                    that.squareList[i].setSign(data.squareList[i].sign);
                }
                that.drawBoard();
            })


    }



}
