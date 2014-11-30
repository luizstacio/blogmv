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
