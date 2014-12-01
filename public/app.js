angular.module('blogmv', [
  'ui.router',
  'blogmv.articles',
  'blogmv.comments'
]);

angular.module('blogmv.articles', []);

angular.module('blogmv.comments', []);

angular.module('blogmv.articles').service('ArticleService', ArticleService);

function ArticleService($q, $http) {
  var BASE_URL = 'http://blogmv-api.appspot.com/api/articles/';

  function findAll() {
    return $http.get(BASE_URL).then(function(response) {
      return response.data || [];
    });
  }

  function findOne(articleId) {
    if (!articleId) {
      return $q.reject(new Error('Invalid article id!'));
    }

    return $http.get(BASE_URL + articleId).then(function(response) {
      return response.data || null;
    });
  }

  return {
    findOne: findOne,
    findAll: findAll
  };
}

angular.module('blogmv.articles').controller('Article/ListController', Article_ListController);

function Article_ListController($scope, ArticleService) {
  ArticleService.findAll().then(function(list) {
    $scope.articles = list;
  });
}

angular.module('blogmv.articles').controller('Article/ViewController', Article_ViewController);

function Article_ViewController($scope, $stateParams, ArticleService, CommentService) {
  var articleId = $stateParams.id;

  ArticleService.findOne(articleId).then(function(item) {
    $scope.article = item;
  });

  CommentService.findAll(articleId).then(function(comments) {
    $scope.comments = comments;
  });

  $scope.saveComment = function() {
    var comment = $scope.comment;

    CommentService.save(articleId, comment).then(function() {
      $scope.comments.push(comment);
      resetCommentForm();
    });
  };

  function resetCommentForm() {
    $scope.comment = {
      author: {}
    };
  }

  resetCommentForm();
}

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

angular.module('blogmv.comments').service('CommentService', CommentService);

function CommentService($q, $http) {
  var BASE_URL = 'http://blogmv-api.appspot.com/api/articles/{id}/comments/';

  function findAll(articleId) {
    if (!articleId) {
      return $q.reject(new Error('Invalid article id!'));
    }

    return $http.get(BASE_URL.replace('{id}', articleId)).then(function(response) {
      var list = response.data || [];
      return normalizeList(list);
    });
  }

  function normalizeList(list) {
    return list.map(normalizeComment);
  }

  function normalizeComment(comment) {
    return {
      id: comment.id,
      content: comment.content,
      author: {
        name: comment.author_name || '',
        email: comment.author_email || ''
      }
    };
  }

  function denormalizeComment(comment) {
    return {
      content: comment.content,
      author_name: comment.author.name,
      author_email: comment.author.email
    };
  }

  function save(articleId, comment) {
    var rawComment = denormalizeComment(comment);
    return $http.post(BASE_URL.replace('{id}', articleId), rawComment);
  }

  return {
    findAll: findAll,
    save: save
  };
}
