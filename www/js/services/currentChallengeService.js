angular.module('starter')

.service('CurrentChallenge', function($http, $q, $timeout) {

    /*
     * Returns the metadata of all challanges
     */

    var currQuestIndex = 0;
    var currentChallenge = {
        "title": "Schitzeljagd I",
        "challangeId": "schinteljagd_1",
        "startLocationDescription": "Königsstraße",
        "startDate": "2015-11-06T20:29:12.485Z",
        "approxDuration": "5h",
        "minParticipants": 5,
        "finishedBy": "12345",
        "participants": [
            "12345",
            "123456"
        ],
        "quests": [
            {
                "question": "Nenne das Geburtsjahr von Jasper!",
                "answer": "1799",
                "lon": 9.202949,
                "lat": 48.789188
            },
            {
                "question": "Wieviel Steine liegen hier rum?",
                "answer": "5",
                "lon": 9.206875,
                "lat": 48.790560
            },
            {
                "question": "Was war der Vogel des Jahres 2015?",
                "answer": "Habicht",
                "lon": 9.210244,
                "lat": 48.789832
            }
        ]
    };

    /*
     * Returns the distance to the next Quest in meters.
     */
    var calcDifferenceToNextQuestion = function(curLat, curLon) {
        var nextLat = this.currentChallenge.quests[this.currQuestIndex].lat;
        var nextLon = this.currentChallenge.quests[this.currQuestIndex].lon;

        var dist = getDistanceFromLatLonInKm(curLat, curLon, nextLat, nextLon);
        return Math.floor(dist*1000);
    };

    var loadChallangeDetails = function(id) {
        var deferred = $q.defer();

        $timeout(function() {
            deferred.resolve(null);
        }, 500);

        return deferred.promise;
    };

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    function radians(n) {
        return n * (Math.PI / 180);
    }

    function degrees(n) {
        return n * (180 / Math.PI);
    }

    function getBearing(startLat, startLong, endLat, endLong) {
        startLat = radians(startLat);
        startLong = radians(startLong);
        endLat = radians(endLat);
        endLong = radians(endLong);

        var dLong = endLong - startLong;

        var dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));
        if (Math.abs(dLong) > Math.PI){
            if (dLong > 0.0)
            dLong = -(2.0 * Math.PI - dLong);
            else
            dLong = (2.0 * Math.PI + dLong);
        }

        return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
    }

    return {
        loadChallangeDetails: loadChallangeDetails,
        currentChallenge: currentChallenge,
        calcDifferenceToNextQuestion: calcDifferenceToNextQuestion,
        currQuestIndex: currQuestIndex
    };
});
