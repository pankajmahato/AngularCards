// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function($routeProvider) {
  $routeProvider

  // route for the home page
    .when('/', {
    templateUrl: 'app/pages/employee.html',
    controller: 'mainController'
  })

  // route for the about page
  .when('/admin', {
    templateUrl: 'app/pages/admin.html',
    controller: 'adminController'
  })

  // route for the contact page
  .when('/security', {
    templateUrl: 'app/pages/security.html',
    controller: 'securityController'
  });
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope) {
  $.ajax({
    url: 'http://localhost:8080/staffmanagement-webapp/rest/employee',
    async: false,
    dataType: 'json',
    success: function (data) {
        $scope.details = data.employee;
    }
});
});

scotchApp.controller('adminController', function($scope) {
  $.ajax({
    url: 'http://localhost:8080/staffmanagement-webapp/rest/administrative',
    async: false,
    dataType: 'json',
    success: function (data) {
        $scope.details = data.administrative;
    }
});
});

scotchApp.controller('securityController', function($scope) {
  $.ajax({
    url: 'http://localhost:8080/staffmanagement-webapp/rest/security',
    async: false,
    dataType: 'json',
    success: function (data) {
        $scope.details = data.security;
    }
});
});
