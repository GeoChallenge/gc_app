angular.module('starter').factory('LocationsService', [ function() {

  var locationsObj = {};

  locationsObj.savedLocations = [
    {
      name : "Hackathon",
      lat : 48.788889,
      lng : 9.212135
    },

  ];

  locationsObj.currentPostionOfEnemys = [
    {
      name : "Morchers Kaffe Anschlag",
      lat : 48.788881,
      lng : 9.212133
    },
    {
      name : "Manfred",
      lat : 48.78800,
      lng : 9.212000
    },
    {
      name : "Laurin",
      lat : 48.788344,
      lng : 9.212886
    },
    {
      name : "Jasper",
      lat : 48.788812,
      lng : 9.212122
    },
  ]

  locationsObj.line_points = [
    {
      name : "Morchers Kaffe Anschlag",
      lat : 48.788081,
      lng : 9.210133,
      id : 1
    },
    {
      name : "Morchers Kaffe Anschlag",
      lat : 48.788281,
      lng : 9.212133,
      id : 2
    },
    {
      name : "Morchers Kaffe Anschlag",
      lat : 48.788481,
      lng : 9.214133,
      id : 3
    },
    {
      name : "Morchers Kaffe Anschlag",
      lat : 48.788681,
      lng : 9.216133,
      id : 4
    },
    {
      name : "Morchers Kaffe Anschlag",
      lat : 48.788881,
      lng : 9.212133,
      id : 5
    },
    {
      name : "Morchers Kaffe Anschlag",
      lat : 48.789081,
      lng : 9.212133,
      id : 6
    },
  ];

  var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [48.78888922, 9.212135]
    }
};


  return locationsObj;

}]);
