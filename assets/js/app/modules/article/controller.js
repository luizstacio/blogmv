App.controller('article.controller', ['$scope', '$routeParams', 'article.service', 'comment.service', function($scope, $routeParams, $articleService, $commentService) {
  var article_id = $routeParams.id;

  $articleService.read(article_id)
  .success(function(data){
    var articles = data;

    /* Root scope add articles */
    $scope.article = article;

    /* Root scope add method for create comments */
    $scope.$root.commentsend = function (id, comment) {
      $scope.comments.push(comment);
      $commentService.create(id, comment);
    };
  });
}]);