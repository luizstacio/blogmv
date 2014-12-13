angular.module('blogmv').controller('Article/ViewController', Article_ViewController);

function Article_ViewController($scope, $stateParams, ArticleService, CommentService) {
    var articleId = $stateParams.id;

    ArticleService.findOne(articleId).then(function(item) {
        $scope.article = item;
    });

    CommentService.findAll(articleId).then(function(comments) {
        $scope.comments = comments;
    });

    $scope.saveComment = function() {
        var comment = $scope.comment;

        CommentService.save(articleId, comment).then(function() {
            $scope.comments.push(comment);
            resetCommentForm();
        });
    };

    function resetCommentForm() {
        $scope.comment = {
            author: {}
        };
    }

    resetCommentForm();
}
