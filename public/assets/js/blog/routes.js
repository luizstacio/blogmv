angular.module('blogmv').config(function($stateProvider, $urlRouterProvider) {
  var routes = {
    'blog': {
      url: '',
      templateUrl: '/blog/layout.html'
    },

    'blog.article-list': {
      url: '/articles',
      templateUrl: '/articles/list.html',
      controller: 'Article/ListController'
    },

    'blog.article-view': {
      url: '/articles/:id',
      templateUrl: '/articles/view.html',
      controller: 'Article/ViewController'
    }
  };

  $urlRouterProvider.when('', '/articles');

  angular.forEach(routes, function(config, name) {
    if (config.templateUrl) {
      config.templateUrl = '/assets/views' + config.templateUrl;
    }

    $stateProvider.state(name, config);
  });
});
