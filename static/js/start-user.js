var userInputElement = document.getElementById('user-input');
var buttonSubmit = document.getElementById('button-submit');
buttonSubmit.addEventListener("click", function() {
    let userName = userInputElement.value;

    checkIfAvaiableUserName(userName);

});

redirectIfCookieExist();

function redirectIfCookieExist() {
        fetch('/api/check-cookie', {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({'content-type': 'application/json'}),

        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success === true)
                {
                    window.location.href = "tic-tac-toe";
                }
            });
}


function checkIfAvaiableUserName(userName) {
    fetch('/api/check-user-name', {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({userName: userName})
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.success === true) {
                console.log('tutaj');
                window.location.href = "tic-tac-toe";
            } else {
                // document.getElementById('user-input').setAttribute("style", "color: red;");

            }
        });
}
