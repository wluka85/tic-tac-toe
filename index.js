const express = require('express')
const app = express()

app.get('/tic-tac-toe', (req, res) => res.sendFile('index.html', { root: '.' }));

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.use(express.static('static'));
