angular.module('starter')

.service('ChallengeSignup', function($http, $q, $timeout) {

    /*
     * Returns the metadata of all challanges
     */
    var loadChallangeDetails = function(id) {
        var deferred = $q.defer();

        $timeout(function() {
            var challengeDetail = {
                    title: "Schitzeljagd I",
                    challangeId: id,
                    startLocationDescription: "Königsstraße",
                    startDate: "2015-11-06T20:29:12.485Z",
                    signedUser: 5,
                    approxDuration: "5h",
                    minParticipants: 5,
                };
            deferred.resolve(challengeDetail);
        }, 500);

        return deferred.promise;
    };

    return {
        loadChallangeDetails: loadChallangeDetails
    };
});
