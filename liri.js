// Variables to require files
var fs = require('fs');
var request = require('request'); 
var prettyjson = require('prettyjson'); 
var spotify = require('spotify'); // spotify npm
var keys = require('./keys.js'); // call twitter keys from keys.ja
var twitterKeys = keys.twitterKeys; // store twitter key in new var
var Twitter = require('twitter'); // twitter npm

// Variables from command line
var command = process.argv[2]; // options: movie, tweets, spotify
var argument = process.argv[3]; // searched item // must be in " "

// Case statement to run chosen function
function runLiri() {
    switch (command) {
        case "movie-this":
            omdbMovie();
            break;
        case "spotify-this-song":
            spotifySong();
            break;
        case "tweets":
            myTweets();
            break;
    } // close switch
} // close runLiri function 

// --------------------------------------------- MOVIE FUNCTION -----------------------------------------------------//

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
                    // Console log movie data to terminal
                console.log("--------------------------MOVIE INFO--------------------------")
                console.log(prettyjson.render(movieData, { keysColor: 'rainbow', stringColor: 'white' }));
                console.log("--------------------------------------------------------------")
            } else {
                console.log("The movie request failed"); // handle errors
            }
        }) // close request
} // close movies function

// ------------------------------------------- SPOTIFY FUNCTION ----------------------------------------------------//

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
        } else { // if there are no results
            // tell the user to choose a new song
            console.log('No results found. Try another song.');
        }
    })
} // close spotify function


// --------------------------------------------- TWITTER FUNCTION ---------------------------------------------------//

/// Scope:  Show last 20 tweets and when they were creaated in the terminal window

function myTweets() {

    var params = { screen_name: 'julieCase2017'}; // Twitter username

    var client = keys.twitterKeys; // Pull twitter keys from keys.js
    console.log(client);

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
       // If there is no error, print out tweets; Ex: @julieCase2017 : tweet at timestamp
        if (! error) { 
            for (var t = 0; t < tweets.length; t++) {
                // tell the params the results
                console.log("-------------------------- TWEETS --------------------------")
                console.log("@" + params.screen_name + " : " + tweets[t].text + " at " + +tweets[t].created_at);
                console.log("------------------------------------------------------------")
            }
        } else {
            console.log('Error loading tweets'); // Error handling
        }
    });
} // close myTweets function

// -------------------------------------------------- RUN LIRI JS ------------------------------------------------------//
//// Run liri
runLiri();
