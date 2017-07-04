// Variables
var fs = require('fs');
var request = require('request');
// var Twitter = require('twitter');
var spotify = require('spotify');
var prettyjson = require('prettyjson');
var keys = require('./keys.js');

var command = process.argv[2]; // options: movie, tweets, spotify
var argument = process.argv[3]; // searched item
var output = '';

// Case statement to run chosen function

function runLiri() {
    switch (command) {
        case "movie-this":
            omdbMovie();
            break;
        case "spotify-this-song":
            spotifySong();
            break;
            // case "tweets":
            //     myTweets();
            //     break;
        case "error":
            console.log("Command not found");
    } // close switch
} // close liriRun function 


// --------------------------------------------------------------------------------------------------//
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
                var data = JSON.parse(body);
                var movieData = {
                        "Title": data.Title,
                        "Release": data.Released,
                        "Rating": data.imdbRating,
                        "Country": data.Country,
                        "Language": data.Language,
                        "Plot": data.Plot,
                        "Actors": data.Actors,
                        "RottenUrl": data.tomatoURL
                    }
                // Console log movie data
                console.log("--------------------------MOVIE INFO--------------------------")
                console.log(prettyjson.render(movieData, { keysColor: 'red', stringColor: 'white' }));
                console.log("--------------------------------------------------------------")
            }
            else {
                console.log("The request failed"); // handle errors
            }
        }) // close request
} // close movies function

// --------------------------------------------------------------------------------------------------//
//// Spotify function

/// Scope:  Use the spotify api to find the following data
// Artist
// Song Name
// Preview link of song from Spotify
// Album the song is from 

function spotifySong() {

    // If no movie name is passed as an argument, default to This Sign by Ace of Base
    if (argument == null) {
        argument = 'The Sign by Ace of Base';
    }
    console.log(argument);
    spotify.search({ type: 'track', query: argument }, function(err, results) {
        // if there is an error console log it
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // if there are results
        if (results.tracks.items[0].artists[0].name) {
            // tell the user the results
            console.log("--------------------------SONG INFO--------------------------")
            console.log('Artist Name: ' + results.tracks.items[0].artists[0].name);
            console.log('Song Name: ' + results.tracks.items[0].name);
            console.log('Spotify URL: ' + results.tracks.items[0].artists[0].external_urls.spotify);
            console.log('Album Name: ' + results.tracks.items[0].album.name);
            console.log("--------------------------------------------------------------")
            // if there are no results
        } else {
            // tell the user to choose a new song
            console.log('We did not find any results for that song.');
        }
    })
} // close spotify function





runLiri();
