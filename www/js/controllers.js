angular.module('starter.controllers', ['starter.services', 'ngOpenFB'])

.controller('AppCtrl', function($scope, $http, $ionicModal, $timeout, ngFB) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.fbLogin = function () {
    ngFB.login({scope: 'email'}).then(
      function (response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');
          $scope.closeLogin();
        } else {
          alert('Facebook login failed');
        }
      });
  };
})

.controller('SpotsCtrl', function($scope, Spot) {
  $scope.spots = Spot.query();
})

.controller('AddCtrl', function($scope, $ionicPopup, NewSpot, $location) {
  $scope.showAlert = function() {
    $ionicPopup.alert({
      title: 'Success',
      content: 'Spot has been added!'
    }).then(function(res) {
      console.log('Test Alert Box');
      $location.path('/spots');
      window.location.reload();
    });
  };

  $scope.spotData = {};

  // Perform the login action when the user submits the login form
  $scope.addSpot = function() {
    console.log('Adding spot', $scope.spotData);
    var spot = new NewSpot($scope.spotData);
    spot.$save();
    $scope.spotData = {};
    $scope.showAlert();
  };
})

.controller('SpotCtrl', function($scope, $stateParams, Spot, ngFB) {
  $scope.spot = Spot.get({spot_id: $stateParams.spotId});

  $scope.share = function (event) {
    ngFB.api({
      method: 'POST',
      path: '/me/feed',
      params: {
        message: "Come join me at: '" + $scope.spot.name + "' from " +
        $scope.spot.times
      }
    }).then(
      function () {
        alert('The session was shared on Facebook');
      },
      function () {
        alert('An error occurred while sharing this session on Facebook');
      });
  };
})

.controller('ProfileCtrl', function ($scope, ngFB) {
  ngFB.api({
    path: '/me',
    params: {fields: 'id,name'}
  }).then(
      function (user) {
        $scope.user = user;
      },
      function (error) {
        alert('Facebook error: ' + error.error_description);
      });
});
