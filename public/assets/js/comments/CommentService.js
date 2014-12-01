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
