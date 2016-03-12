angular.module('starter.services', ['ngResource'])

.factory('Spot', function ($resource) {
  return $resource('https://happy-scour-api.herokuapp.com/');
});
