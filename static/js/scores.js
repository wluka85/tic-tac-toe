var userList;



setInterval(function() {
    getUserList();

}, 2000);

setInterval(function() {
    drawTable();

}, 2000);

function drawTable() {
    let scoresTable = document.getElementById('scores');
    scoresTable.innerHTML = '';
    scoresTable.appendChild(getTableHeader('id', 'user name', 'scores'));
    console.log(userList)
    for (let i = 0; i < userList.length; i++) {

        scoresTable.appendChild(addScoreRow(i+1, userList[i].userName, userList[i].scores));
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

function getTableHeader(id, userName, scores) {
    let tr = document.createElement('tr');
    tr.setAttribute('class', 'row');
    let td0 = document.createElement('th');
    td0.innerHTML = id;
    let td1 = document.createElement('th');
    td1.innerHTML = userName;
    let td2 = document.createElement('th');
    td2.innerHTML = scores;
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
}

function addScoreRow(id, userName, scores) {
    let tr = document.createElement('tr');
    tr.setAttribute('class', 'row');
    let td0 = document.createElement('td');
    td0.innerHTML = id;
    let td1 = document.createElement('td');
    td1.innerHTML = userName;
    let td2 = document.createElement('td');
    td2.innerHTML = scores;
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
}
