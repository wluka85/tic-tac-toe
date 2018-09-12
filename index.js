const express = require('express')
const app = express();
app.use(express.json());


app.set('board', {});
app.set('count', 0);

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

app.get('/api/sign', (req, res) => {
    let count = app.get("count");
    app.set("count", count++);
    // ...
    res.json({})
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.use(express.static('static'));
