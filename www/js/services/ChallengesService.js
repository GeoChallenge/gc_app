angular.module('starter')

.service('ChallengesOverview', function($http, $q, $timeout) {

    /*
     * Returns the metadata of all challanges
     */
    var loadChallangeOverview = function() {
        var deferred = $q.defer();

        $http.get('https://geochallengeone.herokuapp.com/challenge')
        .success(function(data, status, headers, config) {
            deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(data);
        });

        return deferred.promise;
    };

    return {
        loadChallangeOverview: loadChallangeOverview,
    };
});
