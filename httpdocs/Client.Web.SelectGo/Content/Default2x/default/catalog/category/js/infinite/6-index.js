var Category = function () {

    var runInfiniteScroll = function () {
        var updateCount = function () {
           
        }
        // init Infinite Scroll
        if ($(".PagedList-skipToNext a").length > 0) {
            $('.product-list-wrap').infiniteScroll({
                prefill: false,
                path: '.PagedList-skipToNext a',
                append: '.product-item',
                status: '.scroller-status',
                hideNav: '.paging',
                //checkLastPage: true,
                scrollThresold: 50,
                scrollThreshold: !($(".view-more-button").length > 0),
                button: '.view-more-button',
                responseType: 'document',
                
                history: 'push', historyTitle: true,
                debug: true,
                onInit: function() {
                    this.on('append', function () {
                        updateCount();
                    });
                }
            });
        } else {
            $(".load-more").hide();
        }
        updateCount();
    }
    return {
        init: function () {

            runInfiniteScroll();
        }
    };
}();

