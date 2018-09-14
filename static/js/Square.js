export default class Square {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sign = '';
    }

    getElement() {
        let div = document.createElement('div');
        div.setAttribute('class', 'field');
        div.setAttribute('data-position', (this.x+1) + '.' + (this.y+1));
        this.setFillout(div);

        return div;
    }

    setFillout(div) {
        div.innerHTML = this.sign;
    }

    setSign(sign) {
        this.sign = sign;
    }

    getSign() {
        return this.sign;
    }
}
