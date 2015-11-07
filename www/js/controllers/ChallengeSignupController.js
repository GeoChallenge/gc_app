angular.module('starter')

.controller('ChallengeSignupController', function($scope, $stateParams, ChallengesDetails) {

    $scope.signup = function() {
        console.log("signup");
    };

    $scope.$on('$ionicView.beforeEnter', function(){
        $scope.id = $stateParams.id;

        ChallengesDetails.loadChallangeDetails($stateParams.id).then(function(challenge){
            $scope.challenge = challenge;
        }, function(){
            // error
        }).finally(function(){
            // finally
        });
    });

});
