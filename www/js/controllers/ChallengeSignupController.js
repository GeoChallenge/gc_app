angular.module('starter')

.controller('ChallengeSignupController', function($scope, $stateParams, ChallengeSignup) {

    $scope.signup = function() {
        console.log("signup");
    };

    $scope.$on('$ionicView.beforeEnter', function(){
        $scope.id = $stateParams.id;

        ChallengeSignup.loadChallangeDetails($stateParams.id).then(function(challenge){
            $scope.challenge = challenge;
        }, function(){
            // error
        }).finally(function(){
            // finally
        });
    });

});
