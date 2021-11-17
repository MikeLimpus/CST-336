$(document).ready(function() {

var posterURL = "";         // Link to anime key art
var animeTitle = "";        // Name of anime 
var animeDesc = "";         // Descripition of anime
var animeURL = "";          // Link to anime
const firstAnimeDate = "1970";
const currentYear = new Date().getFullYear();

$("#submit").on("click", populateHTML);

function populateHTML() {
    // Clear HTML in result
    $("#results").html("");
    let rating = $("#rating option:selected").attr('id');
    let year = $("#year").val();
    /* 
    Validate the input: year field may be empty, but it must represent a 
    valid year in which an anime could have been released, which will 
    be the range 1970 through the current year, for the sake of simplicity
    */
    if (year == "") {
        year = "None"
    }
    // Check if the year is valid 
    if (year > currentYear || year < firstAnimeDate) {
        error();
    }
    else {
        roll(rating, year);
        $("#results").append(`<div class="subheader"> ${animeTitle} </div>`);
        $("#results").append(`<img id="resultImage" src=${posterURL}></img>`);
        $("#results").append(`<div class="result"> ${animeDesc}  </div>`);
        $("#results").append(`<div class="info"> Source: <a href="${animeURL}">${animeURL}</a> <hr>`);
    }
    $("#info").attr("class", "info");
}
async function roll(rating, year) {
    let url;
    if (year == "None") {
        url = `https://kitsu.io/api/edge/anime?filter[ageRating]=${rating}`;
    }
    else {
        url = `https://kitsu.io/api/edge/anime?filter[seasonYear]=${year}&filter[ageRating]=${rating}`;
    }
    let response = await fetch(url);
    let data = await response.json();
    let i = Math.floor(Math.random() * data.data.length);
    animeTitle = data.data[i].attributes.canonicalTitle;
    posterURL = data.data[i].attributes.posterImage.original;
    animeDesc = data.data[i].attributes.description;
    if (animeDesc == "null") {
        animeDesc = "No description provided..."
    }
    animeURL = `https://kitsu.io/anime/${data.data[i].attributes.slug}`
}

function error() {
    $("#results").append(`<div class="error"> Error! Date invalid. Hint: The first year this site supports came out in ${firstAnimeDate} and the most recent in ${currentYear}</div>`)
}
});
