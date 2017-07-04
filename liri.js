// Variables
var fs = require('fs');
var request = require('request');
// var Twitter = require('twitter');
// var Spotify = require('spotify-web-api-node');
var prettyjson = require('prettyjson');
var keys = require('./keys.js');

var command = process.argv[2]; // options: movie, tweets, spotify
var argument = process.argv[3]; // searched item
var output = '';

// Case statement to run chosen function

function runLiri() {
    switch (command) {

        case "movie":
            omdbMovie();
            break;
            // case "tweets":
            //     myTweets();
            //     break;
            // case "spotify":
            //     spotifySong(param);
            //     break;
        case "error":
            console.log("Command not found");
    } // close switch
} // close liriRun function 



//// MOVIE FUNCTION

/// Scope: Use OMDB to find the following movie info
// Title of the movie.
// Year the movie came out.
// IMDB Rating of the movie.
// Country where the movie was produced.
// Language of the movie.
// Plot of the movie.
// Actors in the movie.
// Rotten Tomatoes URL.

function omdbMovie() {

    // If no movie name is passed as an argument, default to Mr. Nobody
    if (argument == null) {
        argument = "Mr. Nobody";
    }

    // Query url with argument 
    var queryUrl = "http://www.omdbapi.com/?apiKey=40e9cece&t=" + argument + "&y=&plot=full&tomatoes=true&r=json";

    // Then create a request to the queryUrl
    request(queryUrl, function(error, response, body) {
            // If the request is successful
            if (!error && response.statusCode == 200) {
                var movieData = {
                        "Title": JSON.parse(body).Title,
                        "Release": JSON.parse(body).Released,
                        "Rating": JSON.parse(body).imdbRating,
                        "Country": JSON.parse(body).Country,
                        "Language": JSON.parse(body).Language,
                        "Plot": JSON.parse(body).Plot,
                        "Actors": JSON.parse(body).Actors,
                        "RottenUrl": JSON.parse(body).tomatoURL
                    }
                // Console log movie data
                console.log("--------------------------MOVIE INFO--------------------------")
                console.log(prettyjson.render(movieData, { keysColor: 'red', stringColor: 'white' }));
                console.log("--------------------------------------------------------------")
            }
            // Handle errors
            else {
                console.log("The request failed");
            } 
        }) // close request
} // close movies function

runLiri();
