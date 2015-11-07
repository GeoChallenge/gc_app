angular.module('starter').controller('MapController',
  [ '$scope',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$timeout',
    'LocationsService',
    'InstructionsService',
    function(
      $scope,
      $cordovaGeolocation,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      $timeout,
      LocationsService,
      InstructionsService
      ) {

      /**
       * Once state loaded, get put map on scope.
       */
      $scope.$on("$stateChangeSuccess", function() {

        $scope.locations = LocationsService.savedLocations;
        $scope.newLocation;

        $scope.map = {
          defaults: {
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'bottomleft'
          },
          markers : {},
          points : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
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
          zoom : 15
        };

        $scope.map.points[locationKey] = {
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
              message: "Your current location",
              focus: true,
              draggable: false
            };

          }, function(err) {
            // error
            console.log("Location error!");
            console.log(err);
          });
          $scope.getLocationofOtherUsers();
      };

      $scope.getLocationofOtherUsers= function(){

          var currentPostions = LocationsService.currentPostionOfEnemys;
          var featureGroup = L.featureGroup().addLayer($scope.map);
          var circle_options = {
           color: '#fff',      // Stroke color
           opacity: 1,         // Stroke opacity
           weight: 100,         // Stroke weight
           fillColor: '#000',  // Fill color
           fillOpacity: 0.6    // Fill opacity
         };
         var polyline_options = {
              color: '#000'
          };
         var line_points = [
             [48.78800000, 9.216635],
             [48.78811111, 9.216635],
             [48.78822222, 9.216635],
             [48.78844444, 9.216635],
             [48.78866666, 9.216635],
             [48.78899999, 9.216635],

         ];
         var polyline = L.polyline(line_points, polyline_options).addTo(featureGroup);
         var circle_one = L.circle([48.78808922, 9.216635], 20, circle_options).addTo(featureGroup);
         var circle_two = L.circle([48.78888922, 9.219935], 20, circle_options).addTo(featureGroup);


          var line_points= LocationsService.line_points;

          var i =0;
          console.log(line_points);
          addDelay(i ,addDelay);
          function addDelay(i ,callback)
          {
            setTimeout(function () {
            addPointsToMap(line_points[i]);
            ++i;
            $scope.$apply();
            if(i<line_points.length){callback(i, callback);}
            }, 1000);
          }

          function addPointsToMap(position) {

              console.log("hi");


              $scope.map.markers[position.id] = {
                lat:position.lat,
                lng:position.lng,
                message:position.name,
                focus: true,
                draggable: false
              }


            console.log(position.name + ' = ' + position.lng +' ' + position.lat);
          }
      }

    }]);
