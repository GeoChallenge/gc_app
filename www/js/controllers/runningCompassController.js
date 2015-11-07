angular.module('starter')

.controller('RunningCompassController', function($scope, $interval) {
    console.log("hello from RunningCompassController");
    $scope.rotation = -75;

    $interval(function() {
        $scope.rotation = Math.floor(Math.random()*(360-1+1)+1);
    }, 2000);
});
