angular.module('gc.controllers')

.controller('ChallengeSignupController', function($scope, $stateParams, ChallengesDetails) {

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
