var express  = require('express');
var app      = express();
var http     = require('http').Server(app);
var io       = require('socket.io')(http);
var Twit     = require('twit');
var mongoose = require('mongoose');

var T = new Twit({
    consumer_key: 'iijEmWtYYa2KhIwUJVEAckCzF',
    consumer_secret: 'guIcpYuBm0d9EVu46pxaYw75rpeMpVmlKFl0B2ZTFxAHodZwGk',
    access_token: '84807991-q1oHnEr7GOzdvIEEToDBK8U5jbWaIBGxPONzinHaK',
    access_token_secret: '2l2YKtiWE8gpCXdrXEjhAJQG4JUP9Q45iPtRX2BgHu0UX'
});

// Connect to mongodb
mongoose.connect('mongodb://db_user_main:aiveJ5oth6Hoh@ds037272.mongolab.com:37272/heroku_app37283369', function (err) {
    if (err)
        throw err;
    else
        console.log('Connected to Mongodb');

});

// Mongodb Model
var Tweet = mongoose.model('tweet', {
    text: String
});

// Load angular
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile('./public/index.html');
});
// define interactions with client
io.on('connection', function (socket) {
    console.log('Socket connected!');
    // Get data from collection tweets
    Tweet.find(function (err, tweets) {
        if (err)
            throw err;
        else
            io.emit('db', tweets);
    });
    //listen to client data
    socket.on('search', function (data) {
        //save received data to mongodb
        var tweet = new Tweet({text: data});
        tweet.save(function (err) {
            if (err)
                throw err;
            else
            //send data to mongodb
                io.emit('search', data);
            console.log('Saved to mongodb: ' + data);
        }).then(function () {
            // When new search saved send data back to refresh Recent Searches
            Tweet.find(function (err, tweets) {
                if (err)
                    throw err;
                else
                    io.emit('db', tweets);
            });
        });

        //query twitter api with received data
        T.get('search/tweets', {q: data, count: 100}, function (err, data, res) {
            if (err)
                throw err;
            else
            //send data to client
                io.emit('twitter response', data);
            console.log(data);
        });
    });
});

app.set('port', process.env.PORT || 3000);

http.listen(app.get('port'), function () {
    console.log('Server listening on port http://localhost:' + app.get('port'));
});
