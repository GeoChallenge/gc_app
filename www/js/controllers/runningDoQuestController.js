angular.module('starter')

.controller('RunningDoQuestController', function($scope, $interval, CurrentChallenge, $ionicPopup, $ionicHistory, $state) {
    console.log("RunningDoQuestController");

    $scope.userInput = {};
    $scope.validateAnswer = function() {
        var correctAnswer = "";
        if ($scope.userInput.answer !== correctAnswer) {
            // generate a random variance
            var rand1 = Math.floor(Math.random()*(250-100+1)+100);
            var rand2 = Math.floor(Math.random()*(250-100+1)+100);
            // interpolate the random values into the next location ...

            var alertPopup = $ionicPopup.alert({
                title: 'OK!',
                template: 'Great! Now please find the next Spot!'
            });
            alertPopup.then(function(res) {
                // go to the quest screen
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.runningCompass');
            });
        }
    };

});
