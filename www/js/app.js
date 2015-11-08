// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'leaflet-directive', 'ngCordova', 'igTruncate'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        window.cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        //StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'MapController'
      })

      .state('app.map', {
        url: "/map",
        views: {
          'menuContent' :{
            templateUrl: "templates/map.html"
          }
        }
    })

    .state('app.challenges', {
      url: '/challenges',
      views: {
        'menuContent': {
          templateUrl: 'templates/challengesOverview.html',
          controller: 'ChallengesOverviewController'
        }
      }
    })

    .state('app.challangeSignup', {
        url: '/challengeSignup/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/challengeSignup.html',
                controller: 'ChallengeSignupController'
            }
        }
    })

    .state('app.runningCompass', {
        url: '/runningCompass',
        views: {
            'menuContent': {
                templateUrl: 'templates/runningCompass.html',
                controller: 'RunningCompassController'
            }
        }
    })

    .state('app.runningDoQuest', {
        url: '/runningDoQuest',
        views: {
            'menuContent': {
                templateUrl: 'templates/runningDoQuest.html',
                controller: 'RunningDoQuestController'
            }
        }
    })

    .state('app.runningMyHistory', {
        url: '/runningMyHistory',
        views: {
            'menuContent': {
                templateUrl: 'templates/runningMyHistory.html',
                controller: 'RunningMyHistoryController'
            }
        }
    })

    .state('app.runningJokers', {
        url: '/runningJokers',
        views: {
            'menuContent': {
                templateUrl: 'templates/runningJokers.html',
            }
        }
    })

    .state('app.runningShowEnemies', {
        url: '/runningShowEnemies',
        views: {
            'menuContent': {
                templateUrl: 'templates/runningShowEnemies.html',
                controller: 'RunningShowEnemiesController'
            }
        }
    });

    $urlRouterProvider.otherwise('/app/challenges');

  });
