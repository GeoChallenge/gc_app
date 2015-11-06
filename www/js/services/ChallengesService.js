angular.module('gc.services')

.service('ChallengesOverview', function($http, $q, $timeout) {

    /*
     * Returns the metadata of all challanges
     */
    var loadChallangeOverview = function() {
        var deferred = $q.defer();

        $timeout(function() {
            var challenges = [
                { title: 'Challenge 1', id: 1 },
                { title: 'Challenge 2', id: 2 },
                { title: 'Challenge 3', id: 3 },
                { title: 'Challenge 4', id: 4 },
                { title: 'Challenge 5', id: 5 },
                { title: 'Challenge 6', id: 6 }
            ];
            deferred.resolve(challenges);
        }, 500);

        return deferred.promise;
    };

    return {
        loadChallangeOverview: loadChallangeOverview,
    };
});
