require("dotenv").config();

var fs = require("fs");

var keys = require("./keys");

// include Spotify in app
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
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
        userRequest = userRequest + " " + argv[i];
    }

    else {
        userRequest += argv[i];
    }
}

//this decides which funciton to run based off of which command is typed.

function menu() {
    switch (liriCommand) {
        case "concert-this":
            concertThis();
            break;

        case "spotify-this-song":
            spotifyThis();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doThis();
            break;
    }
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
                console.log("-------------------------------------\n");
            }
        });
}

// spotify

function spotifyThis() {
    spotify.search({
        type: 'track',
        query: userRequest,

    },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            for (var i = 0; i < data.tracks.items.length; i++) {
                // console.log("Spotify: ", data.tracks.items[i])
                console.log("Artist: ", data.tracks.items[i].artists[0].name);
                console.log("Song Name: ", data.tracks.items[i].name);
                console.log("URL: ", data.tracks.items[i].preview_url);
                console.log("Album: ", data.tracks.items[i].album.name);
                console.log("-------------------------------------\n");


            }
        })
}

function movieThis() {
    var queryURL = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(
        function (response) {
            console.log("-------------------------------------\n");
            console.log("Title: ", response.data.Title);
            console.log("Release Year: ", response.data.Year);
            console.log("IMBD Rating: ", response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: ", response.data.Ratings[1].Value);
            console.log("Country: ", response.data.Country);
            console.log("Language: ", response.data.Language);
            console.log("Plot: ", response.data.Plot);
            console.log("Actors: ", response.data.Actors);
            console.log("\n-------------------------------------\n");
        }
    )
}

function doThis() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }

        var readMeInput = data.split(",");
        console.log(data);
        liriCommand = readMeInput[0];
        userRequest= readMeInput[1].replace(/"/g, '');
        menu();
    })
}

menu();