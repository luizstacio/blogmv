angular.module('blogmv.articles').controller('Article/ListController', Article_ListController);

function Article_ListController($scope, ArticleService) {
  ArticleService.findAll().then(function(list) {
    $scope.articles = list;
  });
}
