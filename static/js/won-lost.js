var divWonLost = document.getElementById('won-lost');

initAnimate();

divWonLost.addEventListener('click', function() {
    console.log("dfsdfsdfssd");
    window.location.href = "tic-tac-toe";
});

function initAnimate() {
    var animateButton = function(e) {

        e.preventDefault;
        //reset animation
        e.target.classList.remove('animate');

        e.target.classList.add('animate');
        setTimeout(function(){
            e.target.classList.remove('animate');
        },700);
        delay();
    };

    var bubblyButtons = document.getElementsByClassName("bubbly-button");

    for (var i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].addEventListener('click', animateButton, false);


    }


}

function delay () {
    setTimeout( function() { window.location = 'start-game' }, 500 );
}
