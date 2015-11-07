angular.module('starter')

.controller('RunningCompassController', function($scope, $interval, $cordovaGeolocation, CurrentChallenge) {
    console.log("hello from RunningCompassController");

    var watchOptions = {
        timeout : 30000,
        enableHighAccuracy: true,
        maximumAge: 1
    };

    $cordovaGeolocation.watchPosition(watchOptions).promise.then(
        null,
        function(err) {
            console.log(err);
        },
        function(position) {
            var lat  = position.coords.latitude;
            var lon = position.coords.longitude;
            console.log(position);
            $scope.distance = CurrentChallenge.calcDifferenceToNextQuestion(lat, lon);
            if (position.coords.speed !== null) {
                $scope.speed = position.coords.speed;
            }

            if (position.coords.heading !== null) {
                $scope.heading = position.coords.heading;

                // calc ange between me and destination
                var nextDestAngle = CurrentChallenge.calcAngleToNextQuestion(lat, lon);
                $scope.needleAngle = Math.floor(nextDestAngle + heading);
            }
            $scope.heading = position.coords.heading;
        }
    );


});
