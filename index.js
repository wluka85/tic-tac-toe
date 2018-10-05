const express = require('express')
const app = express();
app.use(express.json());
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var Board = require('./static/js/BoardExpress.js');
var Game = require('./static/js/GameExpress.js');
var IdGenerator = require('./static/js/IdGeneratorExpress.js');

var gameList = new Array();
var idGenerator = new IdGenerator();

app.set('sign', "");
app.set('turnSign', '');


app.set('board', {});
app.set('count', 0);
app.set('GameIdentifier', {});

app.get('/api/get-sign', (req, res) => {
    let id = idGenerator.getId();
    let sign ='';
    let index = getIndexAvailableGame();
    console.log('index of avaiable game: ' + index);
    if (index < 0) {
        let game = new Game(9);
        game.setPlayer(id);
        sign = game.getPlayerSign(id);
        gameList.push(game);

    } else {
        gameList[index].setPlayer(id);
        sign = gameList[index].getPlayerSign(id);
    }

    console.log('This is player id: ' + id + ' sign: ' + sign);

    app.set('turnSign', 'O');
    app.set('GameIdentifier', {sign, id});
    res.json(app.get('GameIdentifier'));
});

// app.get('/api/check-turn', (req, res) => {
//     let playerId = req.get('playerId');
//     let playerSign = req.get('playerSign');
//     let gameIndex = getIndexOfGame(Number.parseInt(playerId));
//
//     console.log('This is player id: ' + playerId + 'and his sign: ' + playerSign);
//
//     app.set('turnSign', gameList[gameIndex].turnSign);
//     res.json(app.get('turnSign'));
// });

// app.post('/api/set-turn', (req, res) => {
//     let playerSign = req.body.playerSign;
//     let playerId = req.body.playerId;
//     let gameIndex = getIndexOfGame(Number.parseInt(playerId));
//     gameList[gameIndex].setTurnSign(playerSign);
//     res.json({success : 'true'})
// });

app.post('/api/handle-turn', (req, res) => {
    let playerSign = req.body.playerSign;
    let playerId = req.body.playerId;
    let coordinateX = req.body.coordinateX;
    let coordinateY = req.body.coordinateY;
    let gameIndex = getIndexOfGame(Number.parseInt(playerId));
    let success = false;
    let squareList;
    console.log(gameIndex);
    // console.log('Player Sign: ' + playerSign + ' whose turn: ' + gameList[gameIndex].checkWhoseTurn(playerSign));
    if (gameList[gameIndex].checkWhoseTurn(playerSign) && gameList[gameIndex].isValidMove(coordinateX, coordinateY, playerSign)) {
        gameList[gameIndex].handleMove(coordinateX, coordinateY, playerSign);
        squareList = gameList[gameIndex].getSquareList();
        gameList[gameIndex].setTurnSign(playerSign);
        success = true;
    }

    res.json({success : success, squareList: squareList})
});

app.post('/api/get-square-list', (req, res) => {
    let playerId = req.body.playerId;
    // console.log('Player: '+ playerId + 'try handle turn.');
    let gameIndex = getIndexOfGame(Number.parseInt(playerId));
    // console.log('This is game index which you are playing: ' + gameIndex);
    let success = false;
    let squareList;
    if (gameIndex > 0) {
        squareList = gameList[gameIndex].getSquareList();
        success = true;
    }



    res.json({success: success, squareList: squareList})
});

app.post('/api/check-game-over', (req, res) => {
    let playerId = req.body.playerId;
    let playerSign = req.body.playerSign;
    let gameIndex = getIndexOfGame(Number.parseInt(playerId));
    let gameResult;
    if (gameList[gameIndex].board.isWin(playerSign)) {
        gameResult = 'won';
    } else if (gameList[gameIndex].board.isLost(playerSign)) {
        gameResult = 'lost';
    } else if (gameList[gameIndex].board.isDraw()) {
        gameResult = 'draw';
    }
    // console.log('Player: ' + playerId + ' Sign: ' + playerSign + ' Game index: ' + gameIndex + 'result: ' + gameResult);
    res.json({result: gameResult});
});



app.get('/tic-tac-toe', (req, res) => res.sendFile('start.html', { root: '.' }));

app.get('/start-game', (req, res) => res.sendFile('index.html', { root: '.' }));

app.get('/won-game', (req, res) => res.sendFile('won.html', { root: '.' }));

app.get('/lost-game', (req, res) => res.sendFile('lost.html', { root: '.' }));

// app.post('/api/board', (req, res) => {
//     let board = req.body;
//
//     app.set('board', board);
//     res.json({success : 'true'})
// });
//
// app.get('/api/board', (req, res) => {
//     res.json(app.get('board'))
// });
//
//
//
//
// app.post('/api/turn', (req, res) => {
//     let sign = req.body;
//
//     app.set('sign', sign);
//     res.json({success : 'true'})
// });
//
// app.get('/api/turn', (req, res) => {
//     let sign = JSON.stringify("X")
//     app.set('sign', sign);
//     res.json(app.get('sign'))
// });






// app.get('/api/sign', (req, res) => {
//     let count = app.get("count");
//     app.set("count", count++);
//     // ...
//     res.json({})
// });

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.use(express.static('static'));


function getIndexAvailableGame() {
    for (let i = 0; i < gameList.length; i++) {
        console.log(gameList[i].isAvailableGame())
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
