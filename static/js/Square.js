class Square {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sign = '';
    }

    getElement() {
        let div = document.createElement('div');
        div.setAttribute('class', 'field');
        div.setAttribute('data-position', (this.x+1) + '.' + (this.y+1));
        // div.addEventListener("click", function(){
        //     console.log(div.getAttribute('data-position'));
        //
        //
        // });
        this.setFillout(div);
        // div.addEventListener('click', this.testAjax);

        return div;
    }

    setFillout(div) {
        div.innerHTML = this.sign;
    }

    setSign(sign) {
        this.sign = sign;
    }

    // testAjax() {
    //     let httpRequest = new XMLHttpRequest();
    //     httpRequest.open('GET', '/api/set-sign');
    //     httpRequest.onload = function() {
    //         if (httpRequest.status === 200) {
    //             console.log('User\'s name is ' + httpRequest.responseText);
    //         }
    //         else {
    //             console.log('Request failed.  Returned status of ' + httpRequest.status);
    //         }
    //     };
    //     httpRequest.send();        
    // }
    
}
