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
        div.innerHTML = this.sign;

        // div.addEventListener('click', this.testAjax);

        return div;
    }

    setSign(sign) {
        this.sign = sign;
    }

    // testAjax() {
    //     let xhr = new XMLHttpRequest();
    //     xhr.open('GET', '/api/set-sign');
    //     xhr.onload = function() {
    //         if (xhr.status === 200) {
    //             console.log('User\'s name is ' + xhr.responseText);
    //         }
    //         else {
    //             console.log('Request failed.  Returned status of ' + xhr.status);
    //         }
    //     };
    //     xhr.send();        
    // }
    
}
