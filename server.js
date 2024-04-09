const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

// skapar connection med databasen
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

// hämtar allt i work tabellen från databasen
app.get("/api/workplaces", (req, res) => {
    connection.query(`SELECT * FROM work;`, (err, results) => {
        if (err) {
            res.status(500).json({ error: "något gick fel: " + err }) // om en error händer skickar den tillbaka error koden 500
            return;
        }

        if (results.length === 0) { // kollar om work tabellen är tom
            res.status(200).json({ message: "no workplaces found" })
        } else {
            res.json(results)
        }
    })
});

// skapar nya jobbposter i work tabellen
app.post("/api/workplaces", (req, res) => {

    const queryStmt = "INSERT INTO work (companyname, jobtitle, location, description) VALUES ?"
    // tar de värden som skickats med i body på fetch anropet 
    let companyname = req.body.companyname
    let jobtitle = req.body.jobtitle
    let location = req.body.location
    let description = req.body.description

    // skapar värdena till den nya jobbposten
    let newWork = [
        [companyname,jobtitle,location,description]
    ]

    connection.query(queryStmt, [newWork], (err, results) => {
        if (err) throw err;

        console.table(results)
    });

    // skickar tillbaka detta meddelande till fetch anropet
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
    // skapar den parameter som skickas med i query genom att ta en parameter från url som används vid fetch anropet
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