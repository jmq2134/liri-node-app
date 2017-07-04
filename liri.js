// Variables
var fs = require('fs');
var os = require('os');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('spotify-web-api-node');
var prettyjson = require('prettyjson');
var keys = require('./keys.js');

var first_argv = process.argv[2];
var second_argv = process.argv[3];

// Case statement to run chosen function

function liriRun(cmd, param) {
    case "tweets":
        myTweets();
        break;
    case "movies":
        omdbMovie();
        break;
    case "spotify":
        spotifySong(param);
        break;
    case "error":
        console.log("Command not found");
}



//// MOVIE FUNCTION

// Scope: Use OMDB to find the following movie info
     // Title of the movie.
     // Year the movie came out.
     // IMDB Rating of the movie.
     // Country where the movie was produced.
     // Language of the movie.
     // Plot of the movie.
     // Actors in the movie.
     // Rotten Tomatoes URL.

function omdbMovie(movie) {

    // Handle multiple word movie titles
    if (thisArguments.length > 3) {
        thisArguments = thisArguments.splice(2, thisArguments.length);

        thisArguments = thisArguments.reduce(function(carry, next) {
            return carry + " " + next;
        });
        title = thisArguments; // Condensed movie name 
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?apiKey=40e9cece&t=" + title + "&y=&plot=short&r=json";


    // Then create a request to the queryUrl
    request(queryUrl, function(error, response, body) {
        // If the request is successful
        if (!error) {
            if (response.statusCode === 200) {
                var responseObject = JSON.parse(body);

                var movieData = {
                        "Title" : JSON.parse(body).Title,
                        "Release" : JSON.parse(body).Released,
                        "Rating" : JSON.parse(body).imdbRating,
                        "Country" : JSON.parse(body).Country,
                        "Language": JSON.parse(body).Language,
                        "Plot" : JSON.parse(body).Plot,
                        "Actors" : JSON.parse(body).Actors,
                        "RottenUrl" : JSON.parse(body).tomatoURL
                }

                console.log("-------------MOVIE INFO-------------")
                console.log(prettyjson(movieData));
                console.log("------------------------------------")

            }
        } else {
            console.log("The request failed");
        }
    })


}
