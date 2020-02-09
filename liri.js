require("dotenv").config();

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var axios = require("axios")

// set index 2 definition

var argv = process.argv;
var liriCommand = process.argv[2];
var userRequest = " ";

for (var i = 3; i < argv.length; i++) {
    if (i > 3) {
        formattedUserRequest = userRequest + " " + argv[i];
    }

    else {
        formattedUserRequest += argv[i];
    }
}

