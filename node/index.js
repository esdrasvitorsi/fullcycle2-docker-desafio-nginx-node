const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

let sql = `CREATE TABLE IF NOT EXISTS people(name VARCHAR(255))`
connection.query(sql)

sql = `INSERT INTO people(name) values('Esdras')`
connection.query(sql)

app.get('/', (req, res) => {
    let responseMsg = '<h1>Full Cycle Rocks!</h1>';
    const query = 'SELECT * FROM people';
    connection.query(query, function (err, result, fields) {
        if (err) throw err;
        for (const entry of result) {
            responseMsg =  responseMsg + `<h3>${entry.name}</h3>`
        }
        res.send(responseMsg)
    });
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})