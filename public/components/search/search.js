angular.module('twitter')
    .controller('SearchController', function($scope, Socket) {
        // Send SearchTerm to the Server Socket
        $('form').submit(function(){
            $scope.loading = true;
            Socket.emit('search', $('#searchTerm').val());
            return false;
        });
        // Listening input, append search term to recent searches
        Socket.on('search', function(data){
            $('#searchMessages').append($('<li>').text(data));

        });

        // Listening for server Socket response
        Socket.on('twitter response', function (data) {
            $scope.loading = false;
            // if statuses returns empty array set noresults to show
            if (data.statuses.length === 0){
                 $scope.noresults = true;
            } else {
                 $scope.noresults = false;
            }
            console.log(data);
            $scope.twitts = data;
        });
});
