angular.module('gc.services')

.service('ChallengesOverview', function($http, $q, $timeout) {

    /*
     * Returns the metadata of all challanges
     */
    var loadChallangeOverview = function() {
    	 var deferred = $q.defer();

        $timeout(function() {
            var challengeDetail = 
                { 
					title: "Schitzeljagd I",
				  	challangeId: "schinteljagd_1",
				    startLocationDescription: "Königsstraße",
				    startDate: "2015-11-06T20:29:12.485Z",
				    signedUser: 5,
				    approxDuration: "5h",
				    minParticipants: 5,
    	},
            ;
            deferred.resolve(challenges);
        }, 500);
    };

    return {
        
    };
});
