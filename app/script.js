// create the module and name it staffApp
var staffApp = angular.module('staffApp', ['ngRoute']);

// configure our routes
staffApp.config(function($routeProvider) {
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
staffApp.controller('mainController', function($scope) {
  $.ajax({
    url: 'http://localhost:8080/staffmanagement-webapp/rest/role/?role=employee',
    async: false,
    dataType: 'json',
    success: function (data) {
        $scope.details = data;
    }
});
});

staffApp.controller('adminController', function($scope) {
  $.ajax({
    url: 'http://localhost:8080/staffmanagement-webapp/rest/role/?role=administrative',
    async: false,
    dataType: 'json',
    success: function (data) {
        $scope.details = data;
    }
});
});

staffApp.controller('securityController', function($scope) {
  $.ajax({
    url: 'http://localhost:8080/staffmanagement-webapp/rest/role/?role=security',
    async: false,
    dataType: 'json',
    success: function (data) {
        $scope.details = data;
    }
});
});

staffApp.controller('createController', function($scope,$http) {
	$scope.createForm=function(){
        var data=$scope.fields;  
        $http.post('http://localhost:8080/staffmanagement-webapp/rest/create', data).success(function(data, status) {
        	location.reload();
        });  
       /* var data = $.param({
            json: JSON.stringify({
                name: $scope.newName
            })
        });
        $http.post("/echo/json/", data).success(function(data, status) {
            $scope.hello = data;
        })*/
    }
});

staffApp.controller('updateController', function($scope,$http) {
	$scope.updateForm=function(){
        var data=$scope.fields;
        $http.put('http://localhost:8080/staffmanagement-webapp/rest/update', data).success(function(data, status) {
        	location.reload();
        });  
    }
});

staffApp.controller('deleteController', function($scope,$http) {
	$scope.deleteForm=function(){
        var data=$scope.fields;  
        $http.delete('http://localhost:8080/staffmanagement-webapp/rest/'+data.mid, data).success(function(data, status) {
        	location.reload();
        });  
    }
});