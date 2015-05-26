var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('twit');

var T = new Twit({
    consumer_key:         'iijEmWtYYa2KhIwUJVEAckCzF',
    consumer_secret:      'guIcpYuBm0d9EVu46pxaYw75rpeMpVmlKFl0B2ZTFxAHodZwGk',
    access_token:         '84807991-q1oHnEr7GOzdvIEEToDBK8U5jbWaIBGxPONzinHaK',
    access_token_secret:  '2l2YKtiWE8gpCXdrXEjhAJQG4JUP9Q45iPtRX2BgHu0UX'
});

// Load angular
app.use(express.static(__dirname + '/public'));
app.get('/', function (req , res) {
    res.sendFile('./public/index.html');
});
// define interactions with client
io.on('connection', function(socket){
    console.log('Socket connected!');
    //listen to client data
    socket.on('search', function(data){
        io.emit('search', data);
        console.log(data);

        //query twitter api with received data
        T.get('search/tweets', { q: data, count: 100 }, function(err, data, res) {
            if(err)
                throw err;
            else
            //send data to client
            io.emit('twitter response', data);
            console.log(data);
        });
    });
});

app.set('port', process.env.PORT || 3000);

http.listen(app.get('port'), function() {
    console.log('Server listening on port http://localhost:' + app.get('port'));
});
