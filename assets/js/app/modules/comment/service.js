App.factory('comment.service', ['$http', function($http) {
  
  function create (article_id, comment) {
    var schema = {
      author_name: comment.name,
      author_email: comment.email,
      content: comment.content
    };

    return $http.post('http://blogmv-backend/articles/' + article_id + '/comments/', schema);
  }

  function read (article_id) {
    return $http.get('http://blogmv-backend/articles/' + article_id + '/comments/');
  }

  return {
    create: create,
    read: read
  }
}]);