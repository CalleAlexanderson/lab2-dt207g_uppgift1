const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
})

connection.connect((err) => {
    if (err) {
        console.log("connect failed: " + err);
        return;
    }
    console.log("connected to mysql");
});

app.get("/api", (req, res) => {
    res.json({message: "welcome to my api"});
});

app.get("/api/worplaces", (req, res) =>{
    connection.query(`SELECT * FROM work;`, (err, results) =>{
        if (err) {
            res.status(500).json({error: "något gick fel: " + err})
            return;
        }

        if (results.length === 0) {
            res.status(200).json({message: "no users found"})
        } else {
            res.json(results)
        }
    })
});

app.post("/api/worplaces", (req, res) =>{
    res.json({message: "users added"});
});

app.put("/api/worplaces/:id", (req, res) =>{
    res.json({message: "user updated: " + req.params.id});
});

app.delete("/api/worplaces/:id", (req, res) =>{
    res.json({message: "user deleted: " + req.params.id});
});

app.listen(port, ()=>{
    console.log("servern körs på port: " + port);
})