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

//this decides which funciton to run based off of which command is typed
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

// function that runs if 'concert-this' is typed in
function concertThis() {
    //set axios call url
    var concertURL = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp";
    //run axios call
    axios.get(concertURL).then(
        function (response) {

            if (response.data.length === 0) {
                console.log("\n-------------------------------------\n");
                console.log("This artist / band is not on tour");
                console.log("\n-------------------------------------\n");
            }
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
    if (!userRequest) {
        userRequest = "The Sign"
    }

    spotify.search({
        type: 'track',
        query: userRequest,
    },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            if (data.tracks.items.length === 0) {
                console.log("\n-------------------------------------\n");
                console.log("This song cannot be found, please try another song")
                console.log("\n-------------------------------------\n");
            }
            //separates the response array
            for (var i = 0; i < data.tracks.items.length; i++) {
                //log artist name
                console.log("Artist: ", data.tracks.items[i].artists[0].name);
                //log song name
                console.log("Song Name: ", data.tracks.items[i].name);
                //log url
                console.log("URL: ", data.tracks.items[i].preview_url);
                //log album name
                console.log("Album: ", data.tracks.items[i].album.name);
                console.log("\n-------------------------------------\n");
            }
        })
}
// ombd
function movieThis() {
    //url to search

    if (!userRequest) {
        userRequest = "Mr. Nobody"
    }

    var queryURL = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy";
    //axios call

    axios.get(queryURL).then(
        function (response) {
            if (response.data.Title != undefined) {           
            //log movie title
            console.log("Title: ", response.data.Title);
            //log release year
            console.log("Release Year: ", response.data.Year);
            //log imbd rating
            console.log("IMBD Rating: ", response.data.imdbRating);
            //log rotten tomatoes rating
            console.log("Rotten Tomatoes Rating: ", response.data.Ratings[1].Value);
            //log country
            console.log("Country: ", response.data.Country);
            //log language
            console.log("Language: ", response.data.Language);
            //log plot
            console.log("Plot: ", response.data.Plot);
            //log actors
            console.log("Actors: ", response.data.Actors);
            console.log("\n-------------------------------------\n");
        }

        else {
            console.log("\n-------------------------------------\n")
            console.log("Movie cannot be found, please try another movie");
            console.log("\n-------------------------------------\n");
        }

        }
    )
}

//reads the random.txt file
function doThis() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        //turn string into an array at the ,
        var readMeInput = data.split(",");
        // console.log(data);
        //change liricommand definition to index 0
        liriCommand = readMeInput[0];
        //change userrequest definition to index 1. replace "" with nothing
        userRequest = readMeInput[1].replace(/"/g, '');
        //call the switch function
        menu();
    })
}
//invoke switch function
menu();