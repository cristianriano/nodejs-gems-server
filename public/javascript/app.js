const URL = "http://localhost:8888"

var app = angular.module('store', ['store-directives']);

app.controller('StoreController', function($http, $scope){
  $scope.products = [];

  $http.get('/gems')
    .success(function(data){
      $scope.products = data;
    }).error(function(err){
      console.log(err);
    })
    
});
