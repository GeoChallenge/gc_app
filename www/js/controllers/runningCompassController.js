angular.module('starter')

.controller('RunningCompassController', function($scope, $interval, $cordovaGeolocation, CurrentChallenge, $cordovaDeviceOrientation, $state) {
    console.log("hello from RunningCompassController");

    $scope.myHistory = function() {
        $state.go('app.runningMyHistory');
    };

    $scope.needleAngle = 10;
    $interval(function(){
        $scope.needleAngle = $scope.needleAngle + Math.floor(Math.random()*(5+5+1)-5);
    }, 3000);

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
            $scope.distance = CurrentChallenge.calcDifferenceToNextQuestion(lat, lon);
            if (position.coords.speed !== null) {
                $scope.speed = position.coords.speed;
            }

            if (position.coords.heading !== null) {

                $scope.heading = position.coords.heading;

                // calc ange between me and destination
                var nextDestAngle = CurrentChallenge.calcAngleToNextQuestion(lat, lon);
                $scope.needleAngle = (Math.floor(nextDestAngle + position.coords.heading)) % 360;
                console.log($scope.needleAngle);
            }
        }
    );
});
