angular.module('starter')

.controller('RunningCompassController', function(
    $scope,
    $interval,
    $cordovaGeolocation,
    CurrentChallenge,
    $cordovaDeviceOrientation,
    $state,
    $ionicPopup,
    $ionicHistory
) {
    console.log("hello from RunningCompassController");

    $scope.myHistory = function() {
        $state.go('app.runningMyHistory');
    };

    $scope.jokers = function() {
        $state.go('app.runningJokers');
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

    var geoErr = function(err) {
        console.log(err);
        $cordovaGeolocation.watchPosition(watchOptions).promise.then(
            null,
            geoErr,
            geoSucc
        );
    };

    var geoSucc = function(position) {
        var lat  = position.coords.latitude;
        var lon = position.coords.longitude;
        console.log("new pos:", lat, lon);
        $scope.distance = CurrentChallenge.calcDifferenceToNextQuestion(lat, lon);

        // if user is 10 Meters near to the spot, show him the next quest
        if ($scope.distance < 10) {
            CurrentChallenge.currQuestIndex++;
            var alertPopup = $ionicPopup.alert({
                title: 'YEEEES!',
                template: 'Great, you completed another Target! Let\'s move to the next!'
            });
            alertPopup.then(function(res) {
                // go to the quest screen
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.runningDoQuest');
            });
        }

        if (position.coords.speed !== null) {
            $scope.speed = Math.abs(position.coords.speed);
        }

        if (position.coords.heading !== null) {

            $scope.heading = position.coords.heading;

            // calc ange between me and destination
            // var nextDestAngle = CurrentChallenge.calcAngleToNextQuestion(lat, lon);
            // $scope.needleAngle = (Math.floor(nextDestAngle + position.coords.heading)) % 360;
            // console.log($scope.needleAngle);
        }
    };

    $cordovaGeolocation.watchPosition(watchOptions).promise.then(
        null,
        geoErr,
        geoSucc
    );
});
