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
    return $http.get(BASE_URL);
  }

  function findOne(articleId) {
    if (!articleId) {
      return $q.reject(new Error('Invalid article id!'));
    }

    return $http.get(BASE_URL + articleId);
  }

  return {
    findOne: findOne,
    findAll: findAll
  };
}

angular.module('blogmv.comments').service('CommentService', CommentService);

function CommentService($q, $http) {
  var BASE_URL = 'http://blogmv-api.appspot.com/api/articles/{id}/comments/';

  function findAll(articleId) {
    if (!articleId) {
      return $q.reject(new Error('Invalid article id!'));
    }

    return $http.get(BASE_URL.replace('{id}', articleId));
  }

  return {
    findAll: findAll
  };
}
