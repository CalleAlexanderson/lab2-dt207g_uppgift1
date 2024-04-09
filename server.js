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
    res.json({ message: "welcome to my api" });
});

app.get("/api/workplaces", (req, res) => {
    connection.query(`SELECT * FROM work;`, (err, results) => {
        if (err) {
            res.status(500).json({ error: "något gick fel: " + err })
            return;
        }

        if (results.length === 0) {
            res.status(200).json({ message: "no workplaces found" })
        } else {
            res.json(results)
        }
    })
});

app.post("/api/workplaces", (req, res) => {

    const queryStmt = "INSERT INTO work (companyname, jobtitle, location, description) VALUES ?"
    let companyname = req.body.companyname
    let jobtitle = req.body.jobtitle
    let location = req.body.location
    let description = req.body.description

    let newWork = [
        [companyname,jobtitle,location,description]
    ]

    connection.query(queryStmt, [newWork], (err, results) => {
        if (err) throw err;

        console.table(results)
    });

    res.json({
        message: "workplace added",
        companyname: req.body.companyname,
        jobtitle: req.body.jobtitle,
        location: req.body.location,
        description: req.body.description
    });
});

// app.put("/api/workplaces/:id", (req, res) => {
//     const queryStmt = "UPDATE work WHERE ID = ?"
//     res.json({ message: "user updated: " + req.params.id });
// });

app.delete("/api/workplaces/:id", (req, res) => {
    let id = req.params.id;
    connection.query("delete from work where ID = ?", id, (err) => {
        if (err) {
            console.log(err.message);
        }
    })
    res.json({ message: "workplace with ID " + req.params.id + " deleted"});
});

app.listen(port, () => {
    console.log("servern körs på port: " + port);
})