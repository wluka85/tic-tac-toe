module.exports = class Square {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sign = '';
    }

    setSign(sign) {
        this.sign = sign;
    }

    getSign() {
        return this.sign;
    }
}
