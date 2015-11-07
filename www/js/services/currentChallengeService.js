angular.module('starter')

.service('CurrentChallenge', function($http, $q, $timeout) {

    var myHistory = [
        {
            "userId": "0MKJOID6",
            "lng": 9.1850183,
            "lat": 48.780348,
            "timestamp": "2015-11-20T15:29:12.485Z",
            "nextQuestIndex": 0
        },
        {
            "userId": "0MKJOID6",
            "lng": 9.1844040,
            "lat": 48.781012,
            "timestamp": "2015-11-20T15:34:11.485Z",
            "nextQuestIndex": 1
        },
        {
            "userId": "0MKJOID6",
            "lng": 9.1857310,
            "lat": 48.7822340,
            "timestamp": "2015-11-20T15:41:07.485Z",
            "nextQuestIndex": 1
        },
        {
            "userId": "0MKJOID6",
            "lng": 9.1865114,
            "lat": 48.7835100,
            "timestamp": "2015-11-20T15:50:47.485Z",
            "nextQuestIndex": 1
        },
        {
            "userId": "0MKJOID6",
            "lng": 9.1879212,
            "lat": 48.7852239,
            "timestamp": "2015-11-20T15:55:12.485Z",
            "nextQuestIndex": 1
        },
        {
            "userId": "0MKJOID6",
            "lng": 1904006,
            "lat": 48.7881212,
            "timestamp": "2015-11-20T16:01:19.485Z",
            "nextQuestIndex": 1
        }
    ];

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
        console.log("currentQuest:", this.currentChallenge.quests[this.currQuestIndex]);

        var dist = getDistanceFromLatLonInKm(curLat, curLon, nextLat, nextLon);
        return Math.floor(dist*1000);
    };

    var calcAngleToNextQuestion = function(curLat, curLon) {
        var nextLat = this.currentChallenge.quests[this.currQuestIndex].lat;
        var nextLon = this.currentChallenge.quests[this.currQuestIndex].lon;
        var angle = getBearing(curLat, curLon, nextLat, nextLon);
        return Math.floor(angle);
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

    return {
        loadChallangeDetails: loadChallangeDetails,
        currentChallenge: currentChallenge,
        calcDifferenceToNextQuestion: calcDifferenceToNextQuestion,
        calcAngleToNextQuestion: calcAngleToNextQuestion,
        currQuestIndex: currQuestIndex,
        myHistory: myHistory
    };
});
