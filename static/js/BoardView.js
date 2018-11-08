import Square from "/js/Square.js";

export default class BoardView {

    deleteDiv() {
        let fieldArray = document.querySelectorAll('.field');
        let parent = document.getElementById('board');

        for (let i=0; i<fieldArray.length; i++) {
            parent.removeChild(fieldArray[i]);
        }
    }

    drawBoard(squareList) {
        let container = document.getElementById('board');
        for (let i = 0; i < squareList.length; i++) {
            let div = this.getElement(squareList[i]);
            container.appendChild(div);
        }
    }

    refreshBoard(squareList) {
            let container = document.querySelectorAll('.field');

            for (let i=0; i<squareList.length; i++) {
                container[i].innerHTML = squareList[i].sign;
            }
            document.getElementById("board").setAttribute('class', '');
            document.body.style.backgroundColor = "white";
            // document.body.classList.remove("grayed");
    }

    getElement(square) {
        console.log(square.x);
        let div = document.createElement('div');
        div.setAttribute('class', 'field');
        div.setAttribute('data-position', (square.x+1) + '.' + (square.y+1));
        this.setFillout(div);

        return div;
    }

    setFillout(div) {
        div.innerHTML = '';
    }
}
