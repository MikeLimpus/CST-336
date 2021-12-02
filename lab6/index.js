const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = require("./dbPool");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

//routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get("/dbTest", async function (req, res) {
    let sql = "SELECT CURDATE()";
    let rows = await executeSQL(sql);
    res.send(rows);
});//dbTest

app.get('/author/new', (req, res) => {
    res.render("newAuthor");
});

app.post('/author/new', async (res, req) => {
    let fName = req.body.fName;
    let lName = req.body.lName;
    let birthDate = req.body.birthDate;
    let sql = "INSERT INTO q_authors (firstName, lastName, dob) VALUES (?,?,?);";
    let params = [fName, lName, birthDate];
    let rows = await executeSQL(sql, params);
    res.render('newAuthor', {"message": "Author added!"});
});
//functions
async function executeSQL(sql, params) {
    return new Promise(function (resolve, reject) {
        pool.query(sql, params, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}//executeSQL

// start server for local linux box
// https://stackoverflow.com/questions/14515954/how-to-properly-close-node-express-server
var server = app.listen(process.env.PORT || 5000, "10.0.0.136");
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close((err) => {
        console.log('Http server closed.');
        process.exit(err ? 1 : 0);
    });
});

// Start server for repl.it
// app.listen(3000, () => {
//     console.log("Expresss server running...")
//     } )

