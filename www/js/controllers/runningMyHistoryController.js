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
                    zoom: 14
                },
            };

            $scope.goTo(0);

        });



         var Location = function() {
          if ( !(this instanceof Location) ) return new Location();
              this.lat  = "";
              this.lng  = "";
              this.name = "";
          };

          $ionicModal.fromTemplateUrl('templates/addLocation.html', {
              scope: $scope,
              animation: 'slide-in-up'
          }).then(function(modal) {
              $scope.modal = modal;
          });

          /**
          * Detect user long-pressing on map to add new location
          */
          $scope.$on('leafletDirectiveMap.contextmenu', function(event, locationEvent){
              $scope.newLocation = new Location();
              $scope.newLocation.lat = locationEvent.leafletEvent.latlng.lat;
              $scope.newLocation.lng = locationEvent.leafletEvent.latlng.lng;
              $scope.modal.show();
          });

          $scope.saveLocation = function() {
              LocationsService.savedLocations.push($scope.newLocation);
              $scope.modal.hide();
              $scope.goTo(LocationsService.savedLocations.length - 1);
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
