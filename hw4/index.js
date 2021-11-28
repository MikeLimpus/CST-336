/**
 * Mike Limpus
 * Homework 4
 * 11/23/2021
 */

const Express = require("express");
const Faker = require("faker");
const app = Express();
app.set("view engine", "ejs");
app.use(Express.static("public"));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/windows', (req, res) => {
    res.render('windows', {"updated": fakeUpdate()});
});

app.get('/mac', (req, res) => {
    res.render('mac', {"updated": fakeUpdate()});
});

app.get('/gnu', (req, res) => {
    res.render('gnu', {"updated": fakeUpdate()});
});

function fakeUpdate() {
    let fakeAuthor = Faker.name.findName(); 
    let fakeDate = Faker.date.recent();
    return `Last Updated: ${fakeDate} by ${fakeAuthor}`;
};

// TODO Change this for repl.it
app.listen(3000, "localhost", () => {
    console.log('server started');
});

