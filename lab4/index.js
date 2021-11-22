const express = require('express');
const fetch = require("node-fetch");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// Route to /, send html to there
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/mercury', async (req, res) => {
    let url = "https://api.unsplash.com/photos/random/?client_id=V1mLTMJEi2XYOowhz1COdQCGixdx64l-WcUVOSJb-Oc&featured=true&query=planet-mercury"
    let response = await fetch(url);
    let data = await response.json();
    let image = data.urls.small;
    res.render('mercury', {"mercuryUrl":image});
});

app.get('/venus', async (req, res) => {
    let url = "https://api.unsplash.com/photos/random/?client_id=V1mLTMJEi2XYOowhz1COdQCGixdx64l-WcUVOSJb-Oc&featured=true&query=planet-venus"
    let response = await fetch(url);
    let data = await response.json();
    let image = data.urls.small;
    res.render('venus', {"venusUrl":image});
});

app.get('/earth', async (req, res) => {
    let url = "https://api.unsplash.com/photos/random/?client_id=V1mLTMJEi2XYOowhz1COdQCGixdx64l-WcUVOSJb-Oc&featured=true&query=planet-earth"
    let response = await fetch(url);
    let data = await response.json();
    let image = data.urls.small;
    res.render('earth', {"earthUrl":image});
});

app.get('/mars', async (req, res) => {
    let url = "https://api.unsplash.com/photos/random/?client_id=V1mLTMJEi2XYOowhz1COdQCGixdx64l-WcUVOSJb-Oc&featured=true&query=planet-mars"
    let response = await fetch(url);
    let data = await response.json();
    let image = data.urls.small;
    res.render('mars', {"marsUrl":image});
});

app.get('/jupiter', async (req, res) => {
    let url = "https://api.unsplash.com/photos/random/?client_id=V1mLTMJEi2XYOowhz1COdQCGixdx64l-WcUVOSJb-Oc&featured=true&query=planet-jupiter"
    let response = await fetch(url);
    let data = await response.json();
    let image = data.urls.small;
    res.render('jupiter', {"jupiterUrl":image});
});

app.get('/saturn', async (req, res) => {
    let url = "https://api.unsplash.com/photos/random/?client_id=V1mLTMJEi2XYOowhz1COdQCGixdx64l-WcUVOSJb-Oc&featured=true&query=planet-saturn"
    let response = await fetch(url);
    let data = await response.json();
    let image = data.urls.small;
    res.render('saturn', {"saturnUrl":image});
});

app.get('/uranus', async (req, res) => {
    let url = "https://api.unsplash.com/photos/random/?client_id=V1mLTMJEi2XYOowhz1COdQCGixdx64l-WcUVOSJb-Oc&featured=true&query=planet-uranus"
    let response = await fetch(url);
    let data = await response.json();
    let image = data.urls.small;
    res.render('uranus', {"uranusUrl":image});
});

app.get('/neptune', async (req, res) => {
    let url = "https://api.unsplash.com/photos/random/?client_id=V1mLTMJEi2XYOowhz1COdQCGixdx64l-WcUVOSJb-Oc&featured=true&query=planet-neptune"
    let response = await fetch(url);
    let data = await response.json();
    let image = data.urls.small;
    res.render('neptune', {"neptuneUrl":image});
});

app.listen(3000, "localhost", () => {
    console.log('server started');
});

