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

for (var i = 3; i < argv.length; i++) {
    if (i > 3) {
        userRequest = userRequest + "" + argv[i];
    }

    else {
        userRequest += argv[i];
    }
}

switch (liriCommand) {
    case "concert-this":
    concertThis();
    break;
}

//bands in town

function concertThis(){
var concertURL = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp";

axios.get(concertURL).then(
    function(response) {
        concertInfo = response.data[i];
        console.log("Venue: " + concertInfo.venue.name);
        console.log("Location: " + concertInfo.venue.city);
        console.log("Date: " + moment(concertInfo.datetime).format("MM/DD/YYYY"));
    });
}


