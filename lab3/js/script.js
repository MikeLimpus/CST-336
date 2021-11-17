// Displaying City from API after typing a zip code
// The event handler from the lab spec was not working, 
// I changed it to a click handler for the sake of my sanity
$(document).ready(function() {
    var usernameAvailable = false;
    $("#zip").on("change", async function() { 
        // alert($("#zip").val());
        let zipCode = $("#zip").val();
        let url = `https://itcdland.csumb.edu/~milara/ajax/cityInfoByZip?zip=${zipCode}`;
        let response = await fetch(url);
        let data = await response.json();
        $("#city").html(data.city);
        $("#lat").html(data.latitude);
        $("#long").html(data.longitude);
        if(data == false) {
            $("#city").html("Invalid Zip");
            $("#city").attr("class", "error")
        }
        console.log(data);
    });// zip

    async function loadStates() {
        let stateUrl = `https://cst336.herokuapp.com/projects/api/state_abbrAPI.php`
        let responseState = await fetch(stateUrl);
        let dataState = await responseState.json();
        $("#state").html("<option> Select State </option>");
        for (let i = 0; i < dataState.length; i++) {
            $("#state").append(`<option value="${dataState[i].usps.toLowerCase()}">${dataState[i].state}</option>`)
        }
    }
    loadStates();

    $("#state").on("change", async function() {
        let state = $("#state").val();
        let url = `https://itcdland.csumb.edu/~milara/ajax/countyList.php?state=${state}` 
        let response = await fetch(url);
        let data = await response.json();
        console.log("got here"); 
        $("#county").html("<option> Select one </option>");
        for (let i = 0; i < data.length; i++) {
            $("#county").append(`<option> ${data[i].county} </option>`);
        }
    });// state
    // Usernames 
    $("#username").on("change", async function() {
        let username = $("#username").val();
        let url = `https://cst336.herokuapp.com/projects/api/usernamesAPI.php?username=${username}`;
        let response = await fetch(url);
        let data = await response.json();
        
        if(data.available) {
            $("#usernameError").html("Username available");
            $("#usernameError").css("color", "green");
            usernameAvailable = true;
        }
        else {
            $("#usernameError").html("Username unavailable");
            $("#usernameError").css("color", "red");
            usernameAvailable = false;
        }
    });// username
    $("#signupForm").on("submit", function(event) {
        // alert("Submitting form...");
        if(!isFormValid()) {
            event.preventDefault();
        }
    });
    function isFormValid() {
        isValid = true;
        if (!usernameAvailable) {
            isValid = false;
        }
        if ($("#username").val().length == 0) {
            isValid = false;
            $("#usernameError").html("Username is required");
        }
        if ($("#password").val() != $("#passwordAgain").val()) {
            $("#passwordAgainError").html("Password Mismatch!");
            isValid = false;
        }
        if ($("#password").val().length < 6) {
            $("#passwordError").html("Password must be at least 6 characters");
        }
        return isValid;
    }
});