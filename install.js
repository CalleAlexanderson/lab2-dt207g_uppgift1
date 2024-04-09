const mysql = require("mysql");
require("dotenv").config();

//skapar en connection till databasen dt207glab2 
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

//tar bort tabellen work om den redan finns
connection.query(("DROP TABLE IF EXISTS work"), (err, result) => {
    if (err) throw err;
    console.log("Tabellen work raderad");
})

// skapar en tabbell för jobbplatserna 
connection.query(`CREATE TABLE work (
        ID Integer not null AUTO_INCREMENT,
        companyname varchar(255) not null,
        jobtitle varchar(255),
        location varchar(255),
        description varchar(255),
        PRIMARY KEY (ID))`
    , (err, result) => {
        if (err) throw err;

        console.log("table created: " + result);
    })

//kommandet för att lägga till kurser i tabellen work
const query = "INSERT INTO work (ID, companyname, jobtitle, location, description) VALUES ?"

// de kurser jag ska lägga till i tabellen course
let workplaces = [
    ['1', 'Axfood', 'Butiksmedarbetare', 'Kungenskurva', 'Plockteam och kassa arbete'],
    ['2', 'MCR', 'Butiksbemmaning', 'Stockholm', 'bemannar in i olika butiker inom kassa och plockteam']
];

// gör en query mot servern med query som kommandet och workplace
connection.query(query, [workplaces], (err, results) => {
    if (err) throw err;

    console.table(results)
});