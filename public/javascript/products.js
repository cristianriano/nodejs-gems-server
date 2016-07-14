var app = angular.module('store-directives', []);

app.directive("productDescriptions", function(){
  return{
    restrict: 'E',
    templateUrl: "product-descriptions.html"
  };
});
