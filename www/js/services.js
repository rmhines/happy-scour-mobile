var app = angular.module('starter.services', ['ngResource']);

app.factory("Spot", function($resource) {
  return $resource("https://happy-scour-api.herokuapp.com/spots/:spot_id");
});

app.factory('NewSpot', function($resource) {
  return $resource('https://happy-scour-api.herokuapp.com/spots/');
});