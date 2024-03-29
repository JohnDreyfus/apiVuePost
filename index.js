const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json());

var sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db');


app.get('/posts', (req, res) => {
    db.all("SELECT * FROM posts", function(err, rows) {
        res.json(rows)
    });
})

app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM posts WHERE id = ?", [id], function(err, row) {
        res.json(row)
    });
})

app.post('/posts', (req, res) => {
    const {title, body} = req.body;
    db.run("INSERT INTO posts (title, body) VALUES (?,?)", [title, body], function(err) {
        res.json({id: this.lastID})
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})