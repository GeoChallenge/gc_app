angular.module('starter')
.controller('RunningShowEnemiesController',
function(
    $scope,
    $cordovaGeolocation,
    $stateParams,
    $ionicModal,
    $ionicPopup,
    LocationsService,
    InstructionsService,
    CurrentChallenge,
    $timeout
) {

    /**
    * Once state loaded, get put map on scope.
    */
    $scope.$on("$stateChangeSuccess", function() {

        $scope.locations = LocationsService.savedLocations;

        $scope.historyMap = {
            defaults: {
                tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                maxZoom: 18,
                zoomControlPosition: 'bottomleft'
            },
            markers : [],
            center: {
                lat: CurrentChallenge.myHistory[0].lat,
                lng: CurrentChallenge.myHistory[0].lng,
                zoom: 16
            },
        };

        $scope.goTo(0);

    });

    // prepate lines
    $scope.historyPath = {};
    for (var k = 0; k < CurrentChallenge.history.length; k++) {
        $scope.historyPath["p"+k] = {
            color: '#1C7BCD',
            weight: 6,
            latlngs: [],
        };
    }

    // i is the iteration, m the marker data, j is the enemy id
    var addMarkers = function(i, m, j) {
        $timeout(function(){
            var markerObject = {
                lat: m.lat,
                lng: m.lon
            };
            $scope.historyMap.markers.push(markerObject);
            $scope.historyPath["p"+j].latlngs.push({
                lat: m.lat,
                lng: m.lon
            });
        }, 3000*i);
    };

    // print the last 5 markers of each enemy
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < CurrentChallenge.history.length; j++) {
            var currEnemie = CurrentChallenge.history[j];
            addMarkers(i, currEnemie[i], j);
        }
    }









    var Location = function() {
        if ( !(this instanceof Location) ) return new Location();
        this.lat  = "";
        this.lng  = "";
        this.name = "";
    };

    /**
    * Center map on specific saved location
    * @param locationKey
    */
    $scope.goTo = function(locationKey) {

        var location = LocationsService.savedLocations[locationKey];

        $scope.map.center  = {
            lat : location.lat,
            lng : location.lng,
            zoom : 12
        };

        $scope.map.markers[locationKey] = {
            lat:location.lat,
            lng:location.lng,
            message: location.name,
            focus: true,
            draggable: false
        };

    };

    /**
    * Center map on user's current position
    */
    $scope.locate = function(){

        $cordovaGeolocation
        .getCurrentPosition()
        .then(function (position) {
            $scope.map.center.lat  = position.coords.latitude;
            $scope.map.center.lng = position.coords.longitude;
            $scope.map.center.zoom = 15;

            $scope.map.markers.now = {
                lat:position.coords.latitude,
                lng:position.coords.longitude,
                message: "You Are Here",
                focus: true,
                draggable: false
            };

        }, function(err) {
            // error
            console.log("Location error!");
            console.log(err);
        });

    };

});
