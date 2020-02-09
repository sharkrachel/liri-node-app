// require("dotenv").config();

var keys = require("./keys");

// var spotify = new Spotify(keys.spotify);
var axios = require("axios")

// set index 2 definition

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

//bands in town

var concertURL = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp";

axios.get(concertURL).then(
    function(response) {
        concertInfo = response.data[i];
        console.log("Venue: " + concertInfo.venue.name);
        console.log("Location: " + concertInfo.venue.city);
        console.log("Date: " + concertInfo.datetime);
    });



