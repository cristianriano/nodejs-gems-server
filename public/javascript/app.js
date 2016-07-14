const URL = "http://localhost:8888"

var app = angular.module('store', ['store-directives']);

app.controller('NavigationController', function($scope){
  $scope.navTab = 1;

  $scope.isNavTabSet = function(checkTab){
    return $scope.navTab == checkTab;
  };

  $scope.setNavTab = function(activeTab){
    $scope.navTab = activeTab;
  };

});

app.controller('StoreController', function($http, $scope){
  $scope.products = [];

  $http.get('/gems')
    .success(function(data){
      $scope.products = data;
    }).error(function(err){
      console.log(err);
    })

});

app.controller('ReviewController', function($http, $scope) {
    this.review = {};

    this.addReview = function(product) {
    this.review.createdOn = Date.now();

    // Actualiza los reviews del lado del servidor
    product.reviews.push(this.review);

    // Peticion POST para almacenar el review
    var req = {
      method: 'POST',
      url: URL+'/gems/'+product.id+'/reviews',
      headers: {
        'content-type': 'application/json'
      },
      data: this.review
    };

    $http(req)
    .success(function(data){
      console.log(data);
    })
    .error(function(err){
      console.log(err);
    });

    // Limpia el formulario al presionar submit
    this.review = {};

  };
});
