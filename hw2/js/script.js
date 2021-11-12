$(document).ready(function() {
    // Globals 
    var name = [];
    /*
     * Take a comma sepertated list of names and return an array of names  
     */
    function getText(text) {
        namesList = [];
        text.trim();
        let temp = "";
        for (let i = 0; i < text.length; ++i) {
            char = text.charAt(i);
            if (char != ',') {
                temp += char;
            }
            else {
                namesList.push(temp);
                temp = "";
            }
        }
        // Need to do this one more time at the end of the loop
        namesList.push(temp);
        temp = "";
        return namesList;
    }

    // Randomize and distrubute the teams 
    function randomizeTeams() {
        var allNames = document.getElementById("names").value;
        name = getText(allNames); // Use the text parsing function to make an array
        let temp = name; // Make a temp array in order to reference the names later, if needed
        temp.sort(() => Math.random() - 0.5); // Randomize the array 
        return temp;
    }

    

    function makeLists() {
        // Clear lists first to avoid double input
        $("#teams").html('<div id="team1"> <ul id="list1"></ul></div><div id="team2"><ul id="list2"></ul></div>');
        $("#error").html('');
        let temp = randomizeTeams();
        if (temp == "") {
            $("#error").html("No names inputted");
            $("#error").attr("class", "bg-danger text-white");
        } 

        else {
            let switcher = true;
            $("#team1").prepend("<h2> Team 1 </h2>");
            $("#team1").attr("class", "mb-3 text-primary");
            $("#team2").prepend("<h2> Team 2 </h2>");
            $("#team2").attr("class", "mb-3 text-danger");
            for (let i = 0; i < temp.length; i++) {
                if (switcher) {
                    $("#list1").append(`<li> ${temp[i]} </li>`);
                    switcher = false;
                }
                else {
                    $("#list2").append(`<li> ${temp[i]} </li>`);
                    switcher = true;
                }
            }
            $("#names").val('');
        }
    }
    $("#enter").click(makeLists); // An event listener for the input button 

    // Finally, load a dynamic image for the image footer 
    var logoURL = "https://www.pinclipart.com/picdir/big/22-227663_cal-california-state-university-monterey-bay-logo-clipart.png";
    document.getElementById("logo").src = logoURL;
});