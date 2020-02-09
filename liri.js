// require("dotenv").config();

var keys = require("./keys");

// var spotify = new Spotify(keys.spotify);
var axios = require("axios")

// include moment in app
var moment = require('moment');

// set definition of process.argv
var argv = process.argv;
var liriCommand = process.argv[2];
var userRequest = "";

//this handles if the user request is longer than 1 word
for (var i = 3; i < argv.length; i++) {
    if (i > 3) {
        userRequest = userRequest + "" + argv[i];
    }

    else {
        userRequest += argv[i];
    }
}

//this decides which funciton to run based off of which command is typed.
switch (liriCommand) {
    case "concert-this":
        concertThis();
        break;
}


// function that runs if 'concert-this' is typed in.
function concertThis() {
    //set axios call url
    var concertURL = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp";
    //run axios call
    axios.get(concertURL).then(
        function (response) {
            //loop through results to display all upcoming concert information
            for (var i = 0; i < response.data.length; i++) {
                //set variable so don't have to type response.data[i] over and over.
                concertInfo = response.data[i];
                //console log venue name
                console.log("Venue: " + concertInfo.venue.name);
                //log city
                console.log("Location: " + concertInfo.venue.city);
                //log concert date
                console.log("Date: " + moment(concertInfo.datetime).format("MM/DD/YYYY"));
            }
        });
}


