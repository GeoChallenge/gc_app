angular.module('starter').controller('RunningMyHistoryController',
function(
    $scope,
    $cordovaGeolocation,
    $stateParams,
    $ionicModal,
    $ionicPopup,
    LocationsService,
    InstructionsService,
    CurrentChallenge
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
            markers : CurrentChallenge.myHistory,
            center: {
                lat: CurrentChallenge.myHistory[0].lat,
                lng: CurrentChallenge.myHistory[0].lng,
                zoom: 16
            },
        };

        $scope.goTo(0);

    });

    // build history path
    var pazz = [];
    for (var i = 0; i < CurrentChallenge.myHistory.length-1; i++) {
        pazz.push({ lat: CurrentChallenge.myHistory[i].lat, lng: CurrentChallenge.myHistory[i].lng });
    }

    $scope.historyPath = {
        p1: {
            color: '#1C7BCD',
            weight: 6,
            latlngs: pazz,
        }
    };

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
