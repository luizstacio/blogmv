App.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  
  $routeProvider
  .when('/article/:id', {
      template: function () {
        debugger;
      },
      controller: function () {
        debugger;
        console.log(arguments);
      }
  })
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false
  });
}]);