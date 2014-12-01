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
