$(document).ready(function() {

var posterURL = "";         // Link to anime key art
var animeTitle = "";        // Name of anime 
var animeDesc = "";         // Descripition of anime
var animeURL = "";          // Link to anime
var rating = "G";
var year = "None";          // Having the year as an empty string triggers an invalid date because "" == 0 lol 
// For the sake of this project, the earliest anime checked will be 1970 
const firstAnimeDate = "1970";
const currentYear = new Date().getFullYear();
// event listeners
$("#rating").on("change", function() {
  rating = $("#rating option:selected").attr('id');
  console.log(rating);
});
$("#year").on("change", function() {
  year = $("#year").val();
})
$("#form").on("submit", roll);

async function roll() {
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
    posterURL = data.data[i].attributes.posterImage.medium;
    animeDesc = data.data[i].attributes.description;
    /* Some of the results return as null, hard to check if it is a string or
    true null so check for both for now */
    if (animeDesc == "null" || animeDesc == null) {
        animeDesc = "No description provided..."
    }
    animeURL = `https://kitsu.io/anime/${data.data[i].attributes.slug}`
    populateHTML();
}

function populateHTML() {
    // Clear HTML in result
    $("#results").html("");
    rating = $("#rating option:selected").attr('id');
    year = $("#year").val();
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
        if (animeTitle == "Delete") {
        // Kitsu API has some placeholder entries titled "Delete" that need to be trimmed out
          roll(); 
        }
        $("#results").append(`<div class="subheader"> ${animeTitle} </div>`);
        $("#results").append(`<img id="resultImage" src=${posterURL}></img>`);
        $("#results").append(`<div class="result"> ${animeDesc}  </div>`);
        $("#results").append(`<div class="info"> Source: <a href="${animeURL}">${animeURL}</a> <hr>`);
    }
    $("#info").attr("class", "info");
}


function error() {
    $("#results").append(`<div class="error"> Error! Date invalid. Hint: The first year this site supports is ${firstAnimeDate} and the most recent is ${currentYear}</div>`)
}
});