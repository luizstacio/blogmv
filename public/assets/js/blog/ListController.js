angular.module('blogmv').controller('Article/ListController', Article_ListController);

function Article_ListController($scope, $state, ArticleService) {
    ArticleService.findAll().then(function(list) {
        $scope.articles = list;

        $state.go('blog.articles.view', {
            id: list[0].id
        });
    });
}
