var userList;

getUserList();


setInterval(function() {
    location.reload();
    drawTable();

}, 1000);

function drawTable() {
    let scoresTable = document.getElementById('scores');
    // let rowList = document.getElementByClassName('row');
    // for (let i = rowList.length - 1; 0 <= i; i--){
    //     if (rowList[i] && rowList[i].parentElement)
    //     rowList[i].parentElement.removeChild(rowList[i]);
    // }
    for (let i = 0; i < userList.length; i++) {

        scoresTable.appendChild(addScoreRow(userList[i].userName, userList[i].scores));
    }
}

function getUserList() {
    fetch('/api/get-scores', {
        method: 'GET',
        credentials: 'include'
        })
        .then((response) => response.json())
        .then((data) => {
            userList = data.userList;
    })

}

function addScoreRow(userName, scores) {
    let tr = document.createElement('tr');
    tr.setAttribute('class', 'row');
    let td1 = document.createElement('th');
    td1.innerHTML = userName;
    let td2 = document.createElement('th');
    td2.innerHTML = scores;
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
}
