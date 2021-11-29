const express = require('express');
const pool = require("./dbPool.js");
const app = express();
 
app.set("view engine", "ejs");
app.use(express.static("public"));
 
//routes

app.get("/", async (req, res) => {
    let sql = `
        SELECT authorId, firstName, lastName
        FROM q_authors
        ORDER BY lastName;
    `;
    let rows = await executeSQL(sql);
    let categoriesSQL = `
        SELECT DISTINCT category
        FROM q_quotes;
    `; 
    let categories = await executeSQL(categoriesSQL);
    res.render("index", {"authors": rows, "categories": categories});
});//root

app.get("/dbTest", async (req, res) => {
    let sql = `
        SELECT * 
        FROM q_quotes;`;
    let rows = await executeSQL(sql);
    res.send(rows);
});//dbTest
 
app.get("/searchByKeyword", async (req, res) => {
    let userKeyword = req.query.keyword;
    console.log(userKeyword);
    let sql = `
        SELECT quote, authorId, firstName, lastName
        FROM q_quotes
        NATURAL JOIN q_authors
        WHERE quote LIKE ?;
    `;
    let params = [`%${userKeyword}%`];
    let rows = await executeSQL(sql, params);
    res.render("results", {"quotes": rows});
});//searchByKeyword

app.get('/searchByAuthor', async (req, res) => {
    let userAuthorId = req.query.authorId;
    let sql = `
        SELECT quote, authorId, firstName, lastName
        FROM q_quotes
        NATURAL JOIN q_authors
        WHERE authorId = ?;
    `;
    let params = [userAuthorId];
    let rows = await executeSQL(sql, params);
    res.render("results", {"quotes": rows});
});

app.get('/searchByCategory', async (req, res) => {
    let userCategory = req.query.category; 
    let sql = `
        SELECT quote, q_quotes.authorId, firstName, lastName 
        FROM q_quotes, q_authors 
        WHERE category = ?
        AND q_quotes.authorId = q_authors.authorId;
    `;
    let params = [userCategory];
    let rows = await executeSQL(sql, params);
    res.render("results", {"quotes": rows});
});

app.get('/searchByLikes', async (req, res) => {
    let lowerLikes = req.query.lowerLikes;
    let upperLikes = req.query.upperLikes;
    let sql = `
        SELECT quote, q_quotes.authorId, firstName, lastName 
        FROM q_quotes, q_authors
        WHERE likes > ? AND likes < ?
        AND q_quotes.authorId = q_authors.authorId;
    `
    let params = [lowerLikes, upperLikes];
    let rows = await executeSQL(sql, params);
    res.render("results", {"quotes": rows});
});
app.get('/api/author/:id', async (req, res) => { 
    let authorId = req.params.id;
    let sql = `
        SELECT *
        FROM q_authors
        WHERE authorId = ? `;
    let rows = await executeSQL(sql, [authorId]); 
    res.send(rows);
});


//functions
async function executeSQL(sql, params){
    return new Promise (function (resolve, reject) {
        pool.query(sql, params, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

//start server
app.listen(30000, "10.0.0.136", () => {
    console.log("Express server running...")
});
