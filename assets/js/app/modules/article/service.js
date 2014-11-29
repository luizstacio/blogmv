App.factory('article.service', ['$http', function($http) {

  function read (articleId) {
    return $http.get('http://blogmv-backend/articles/' + (articleId || ''));
  }

  return {
    read: read
  }
}]);