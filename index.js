const express = require('express')
const app = express();
app.use(express.json());

app.set('sign', "");
app.set('turnSign', '');


app.set('board', {});
app.set('count', 0);

app.get('/api/get-sign', (req, res) => {
    if (app.get('sign').length == 0 || app.get('sign') == "X") {
        app.set('sign', "O");
    } else {
        app.set('sign', "X");
    }
    app.set('turnSign', 'O');

    console.log("Gracz 1 get: " + app.get('sign'));
    console.log("Zaczyna: " + app.get('turnSign'));

    res.json(app.get('sign'));
});

app.get('/api/check-turn', (req, res) => {
    res.json(app.get('turnSign'));
});

app.post('/api/set-turn', (req, res) => {
    let sign = req.body.sign;
    console.log(sign);
    if (sign == "X") {
        app.set('turnSign', "O");
    } else {
        app.set('turnSign', "X");
    }
    console.log("Następny ruch: " + app.get('turnSign'));
});


app.get('/tic-tac-toe', (req, res) => res.sendFile('index.html', { root: '.' }));

app.post('/api/board', (req, res) => {
    let board = req.body;
    // const mockJson = '{"quantity":9,"squareList":[{"x":0,"y":0,"sign":"X"},{"x":1,"y":0,"sign":""},{"x":2,"y":0,"sign":""},{"x":0,"y":1,"sign":""},{"x":1,"y":1,"sign":"X"},{"x":2,"y":1,"sign":"X"},{"x":0,"y":2,"sign":""},{"x":1,"y":2,"sign":""},{"x":2,"y":2,"sign":""}]}';
    // board = JSON.parse(mockJson);

    app.set('board', board);
    res.json({success : 'true'})
});

app.get('/api/board', (req, res) => {
    res.json(app.get('board'))
});




app.post('/api/turn', (req, res) => {
    let sign = req.body;
    // const mockJson = '{"quantity":9,"squareList":[{"x":0,"y":0,"sign":"X"},{"x":1,"y":0,"sign":""},{"x":2,"y":0,"sign":""},{"x":0,"y":1,"sign":""},{"x":1,"y":1,"sign":"X"},{"x":2,"y":1,"sign":"X"},{"x":0,"y":2,"sign":""},{"x":1,"y":2,"sign":""},{"x":2,"y":2,"sign":""}]}';
    // board = JSON.parse(mockJson);

    app.set('sign', sign);
    res.json({success : 'true'})
});

app.get('/api/turn', (req, res) => {
    let sign = JSON.stringify("X")
    app.set('sign', sign);
    res.json(app.get('sign'))
});






app.get('/api/sign', (req, res) => {
    let count = app.get("count");
    app.set("count", count++);
    // ...
    res.json({})
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.use(express.static('static'));
