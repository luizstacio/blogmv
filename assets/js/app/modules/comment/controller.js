App.controller('comment.controller', ['$scope', '$routeParams', 'article.service', 'comment.service', function($scope, $routeParams, $articleService, $commentService) {
  var article_id = $routeParams.id;

  $commentService.read(article_id).success(function (data) {
    $scope.comments = data;
  });
}]);