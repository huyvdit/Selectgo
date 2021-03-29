jQuery(document).ready(function () {
    var modelId = $("#model-id").val();
    $('.like-btn').click(function () {
        $('.dislike-btn').removeClass('dislike-h');
        var self = $(this);
        self.css("opacity", "0.1").prop('disabled', true);
        var pointer = $(".like-count");
        var pointerAll = $(".rate-count");
        self.addClass('like-h');
        new Services("ProductReviewHelpfulnessService/LikeOrDislike", { inf: (modelId + "-like") }, function (ret) {

            if (ret == 0) {
                HvHelpers.alert("Bạn phải đăng nhập trước khi sử dụng chức năng này!");
            } else if (ret < 0) {
                HvHelpers.alert("Bạn vừa đánh giá, bạn chỉ có thể đánh giá lại sau " + (ret * -1) + " phút nữa!");
            } else {
                pointer.html(parseInt(pointer.html()) + ret);
                pointerAll.html(parseInt(pointerAll.html()) + ret);
            }

            self.css("opacity", "1").prop('disabled', false);

        }).post();
    });
    $('.dislike-btn').click(function () {
        $('.like-btn').removeClass('like-h');
        var self = $(this);
        self.css("opacity", "0.1").prop('disabled', true);
        var pointer = $(".dislike-count");
        var pointerAll = $(".rate-count");
        self.addClass('dislike-h');

        new Services("ProductReviewHelpfulnessService/LikeOrDislike", { inf: (modelId + "-dislike") }, function (ret) {

            if (ret == 0) {
                HvHelpers.alert("Bạn phải đăng nhập trước khi sử dụng chức năng này!");
            } else if (ret < 0) {
                HvHelpers.alert("Bạn vừa đánh giá, bạn chỉ có thể đánh giá lại sau " + (ret * -1) + " phút nữa!");
            } else {
                pointer.html(parseInt(pointer.html()) + ret);
                pointerAll.html(parseInt(pointerAll.html()) + ret);
            }

            self.css("opacity", "1").prop('disabled', false);

        }).post();

    });

    $('.share-btn').click(function () {
        $('.share-cnt').toggle();
    });
});

