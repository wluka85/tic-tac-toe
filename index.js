const express = require('express')
const app = express();
app.use(express.json());
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var uuidV4 = require('uuid/v4');

var Board = require('./static/js/BoardExpress.js');
var Game = require('./static/js/GameExpress.js');
var IdGenerator = require('./static/js/IdGeneratorExpress.js');
var User = require('./static/js/UserExpress.js');

var gameList = new Array();
var idGenerator = new IdGenerator();
var userList = new Array();

app.set('GameIdentifier', {});

app.get('/api/get-sign', (req, res) => {
    let cookie = req.cookies;
    let userIndex = getUserIndex(cookie.userName);
    let user = userList[userIndex];

    let id = idGenerator.getId();
    user.addGame(id);

    let sign ='';
    let index = getIndexAvailableGame();
    if (index < 0) {
        let game = new Game(9);
        game.setPlayer(id);
        sign = game.getPlayerSign(id);
        gameList.push(game);

    } else {
        gameList[index].setPlayer(id);
        sign = gameList[index].getPlayerSign(id);
    }

    app.set('GameIdentifier', {sign, id});
    res.json(app.get('GameIdentifier'));
});

app.post('/api/handle-turn', (req, res) => {
    let playerSign = req.body.playerSign;
    let playerId = req.body.playerId;
    let coordinateX = req.body.coordinateX;
    let coordinateY = req.body.coordinateY;
    let gameIndex = getIndexOfGame(Number.parseInt(playerId));
    let success = false;
    let squareList;
    if (gameList[gameIndex].checkWhoseTurn(playerSign) && gameList[gameIndex].isValidMove(coordinateX, coordinateY, playerSign)) {
        gameList[gameIndex].handleMove(coordinateX, coordinateY, playerSign);
        squareList = gameList[gameIndex].getSquareList();
        gameList[gameIndex].setTurnSign(playerSign);
        success = true;
    }

    res.json({success : success, squareList: squareList});
});

app.post('/api/get-square-list', (req, res) => {
    let playerId = req.body.playerId;
    let playerSign = req.body.playerSign;
    let gameIndex = getIndexOfGame(Number.parseInt(playerId));
    let success = false;
    let squareList;
    if (gameIndex >= 0) {
        squareList = gameList[gameIndex].getSquareList();
        success = gameList[gameIndex].checkWhoseTurn(playerSign);;
    }

    res.json({success: success, squareList: squareList});
});

app.post('/api/check-game-over', (req, res) => {
    let playerId = req.body.playerId;
    let playerSign = req.body.playerSign;
    let gameIndex = getIndexOfGame(Number.parseInt(playerId));
    let gameResult;
    let user = getUserByGame(Number.parseInt(playerId));
    if (gameList[gameIndex].board.isWin(playerSign)) {
        user.addScores(1);
        gameResult = 'won';
    } else if (gameList[gameIndex].board.isLost(playerSign)) {
        user.addScores(-1);
        gameResult = 'lost';
    } else if (gameList[gameIndex].board.isDraw()) {
        gameResult = 'draw';
    }
    res.json({result: gameResult});
});

app.post('/api/check-user-name', (req, res) => {
    let userName = req.body.userName;
    let success = false;
    if (getUserIndex(userName) < 0) {
        let uuid = uuidV4();
        let user = new User(userName, uuid);
        userList.push(user);
        res.cookie('userName', userName);
        res.cookie('uuid', uuid);
        success = true;
    }

    res.json({success: success});
});

app.get('/api/get-scores', (req, res) => {
    res.json({userList: userList});
});

app.get('/', (req, res) => res.sendFile('start-user.html', { root: '.' }));

app.get('/api/check-cookie', (req, res) => {
    let cookie = req.cookies;
    let userIndex = getUserIndex(cookie.userName);
    let success = false;

    if (userIndex > -1 && userList[userIndex].uuid === cookie.uuid) {
        success = true;
    }
    res.json({success: success});
});



app.get('/tic-tac-toe', (req, res) => res.sendFile('start.html', { root: '.' }));

app.get('/start-game', (req, res) => res.sendFile('index.html', { root: '.' }));

app.get('/won-game', (req, res) => res.sendFile('won.html', { root: '.' }));

app.get('/lost-game', (req, res) => res.sendFile('lost.html', { root: '.' }));

app.get('/user-scores', (req, res) => res.sendFile('scores.html', { root: '.' }));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.use(express.static('static'));


function getIndexAvailableGame() {
    for (let i = 0; i < gameList.length; i++) {
        if (gameList[i].isAvailableGame()) {
            return i;
        }
    }

    return -1;
}

function getIndexOfGame(playerId) {
    for (let i = 0; i < gameList.length; i++) {
        if (gameList[i].checkPlayerId(playerId)) {
            return i;
        }
    }

    return -1;
}

function getUserIndex(userName) {
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].userName === userName) {
            return i;
        }
    }

    return -1;
}

function getUserByGame(playerId) {
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].checkifContainsPlayerId(playerId)) {
            return userList[i];

        }
    }

    return null;
}
