const e = require("express");
const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = require("./dbPool");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

app.post("/author/new", async function (req, res) {
    let fName = req.body.fName;
    let lName = req.body.lName;
    let birthDate = req.body.birthDate;
    let deathDate = req.body.deathDate;
    let sex = req.body.sex;
    let profession = req.body.profession;
    let country = req.body.country;
    let portraitLink = req.body.portraitLink;
    let biography = req.body.biography;
    // if no portrait added, use a placeholder image
    if (portraitLink == "") {
        portraitLink = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    }
    // 
    let sql = `
        INSERT INTO q_authors 
        (firstName, lastName, dob, dod, sex, profession, country, portrait, biography) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`
    let params = [fName, lName, birthDate, deathDate, sex, profession, country, portraitLink, biography];
    let rows = await executeSQL(sql, params);
    res.render("newAuthor", { "message": "Author added!" });
});

app.get("/author/edit", async (req, res) => {
    let authorId = req.query.authorId;

    let sql = `
        SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') dobISO
        FROM q_authors
        WHERE authorId = ${authorId};
    `;
    let rows = await executeSQL(sql);
    res.render("editAuthor", { "authorInfo": rows });
});

app.post("/author/edit", async function (req, res) {
    let sql = `UPDATE q_authors
                SET firstName = ?,
                lastName = ?,
                dob = ?,
                sex = ?,
                profession = ?,
                country = ?, 
                portrait = ?,
                biography = ? 
                WHERE authorId =  ?`;
    // if no portrait added, use a placeholder image
    if (req.body.portraitLink == "") {
        portraitLink = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    }
    else { 
        portraitLink = req.body.portraitLink
    }
    let params = [req.body.fName,
    req.body.lName, req.body.dob, req.body.sex, req.body.profession,
        req.body.country, portraitLink, req.body.biography, req.body.authorId]; 
    let rows = await executeSQL(sql, params);
    sql = `SELECT *,
        DATE_FORMAT(dob, '%Y-%m-%d') dobISO FROM q_authors
        WHERE authorId= ${req.body.authorId}`;
    rows = await executeSQL(sql);
    res.render("editAuthor", { "authorInfo": rows, "message": "Author Updated!" });
});

app.get("/author/delete", async (req, res) => {
    let sql = `
        DELETE 
        FROM q_authors 
        WHERE authorId = ${req.query.authorId}
    `;
    let rows = await executeSQL(sql);
    res.redirect("/authors");
});

app.get("/authors", async (req, res) => {
    let sql = `
        SELECT *
        FROM q_authors
        ORDER BY lastName;`;
    let rows = await executeSQL(sql);
    res.render("authorList", { "authors": rows });
});

app.get('/quotes', async (req, res) => {
    let sql = `
        SELECT *
        FROM q_quotes, q_authors
        WHERE q_quotes.authorId = q_authors.authorId
        ORDER BY q_authors.lastName;
    `;
    let rows = await executeSQL(sql);
    res.render("quoteList", {"quotes": rows});
});

app.get("/quote/delete", async (req, res) => {
    let sql = `
        DELETE FROM q_quotes WHERE quoteId = ${req.query.quoteId};
    `;
    let rows = await executeSQL(sql);
    res.redirect("/quotes");
});

app.get("/quote/edit", async (req, res) => {
    
});

app.post("/quote/edit", async (req, res) => {
    let sql = `
        UPDATE q_quotes 
        SET quote = ?,
            category = ?, 
            likes = ?
        WHERE quoteId = ?;
    `;
    let params = [req.body.quote, req.body]
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

