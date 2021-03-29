// PORTFOLIO DETAILS
// if url contains a portfolio detail url
var html = $('html'),
    body = $('.body'),
    close = $('.close-page'),
    one_page_content = $('.one-page-content');
var first_load = false;
var portfolioKeyword = "preview";

var giveDetailUrl = function() {
    var address = $.address.value();
    var detailUrl;

    if (
        address.indexOf("/" + portfolioKeyword + "/") != -1 &&
        address.length > portfolioKeyword.length + 2
    ) {
        var total = address.length;
        detailUrl = address.slice(portfolioKeyword.length + 2, total);
    } else {
        detailUrl = -1;
    }
    return detailUrl;
}
// FULL BROWSER BACK BUTTON SUPPORT
$.address.change(function () {
    //console.log('addres changed');

    var path = $.address.path();
    path = path.slice(1, path.length);

    // bug-fix : don't run if hash doesn't exist on first load
    if (path === "" && first_load) {
        first_load = false;
        return;
    }
    first_load = false;
    var detailUrl = giveDetailUrl();
    if (detailUrl !== -1) {
        showProjectDetails(detailUrl);
    } else {
        // if url contains portfolio keyword
        if ($.address.path().indexOf("/" + portfolioKeyword) !== -1) {
            if (porftolioSingleActive) {
                hideProjectDetails(true, false);
             
                // when loaded url with portfolio single url, after closing portfolio single box; open portfolio page if it is not already opened...
                if ($(".one-page-content .content-wrap").is(":empty")) {
                    
                }
            }
        }
    }
}); // end address change event
// ------------------------------
// AJAX PORTFOLIO DETAILS

function showProjectDetails(url) {
    NProgress.start();
    console.log(url);
    if (url != "") {
        var p = one_page_content.children(".content-wrap");
        // ajax : fill data
        p.empty().load(url, function () {
            NProgress.set(0.5);
            // wait for images to be loaded
            p.imagesLoaded(function () {
                NProgress.done();
            });
        });

        openPage();
        //
        // only jquery get() returns remote page's <head> content
        //jQuery.get(url, function (data) {

        //    // clear container content
        //    one_page_content.children(".content-wrap").empty();

        //    // elementor styles fix
        //    one_page_content
        //        .children(".content-wrap")
        //        .append($(data).filter("#elementor-frontend-inline-css")) // elementor inline styles
        //        .append($(data).filter("link[id^='elementor-post-']")) // elementor external styles
        //        .append($(data).filter("link[id='elementor-frontend-css']")); // elemementor common styles

        //    // place page content
        //    one_page_content
        //        .children(".content-wrap")
        //        .append($(data).find(".page-single > .hentry"));

        //    // wait for images to be loaded
        //    one_page_content.imagesLoaded(function () {

        //        $("html").addClass("is-ajax-page-loaded");

        //    });
        //});
    }
    
}

function hideProjectDetails(forever, safeClose) {
 
    // close completely by back link.
    if (forever) {
       
        if (!safeClose) {
            // remove detail url
            $.address.path('');
        }
    }
    closePage();
}

function openPage() {

    one_page_content.addClass("is-visible");
    html.addClass("is-ajax-page-visible").css("overflow", "hidden");

}

// CLOSE PAGE
function closePage() {
    html.removeClass("is-ajax-page-visible").css("overflow", "inherit");
    setTimeout(function () {
        one_page_content
            .removeClass("is-visible")
            .children(".content-wrap")
            .empty();
    }, 400);

}
close.on("click", function () {
    hideProjectDetails(true, false)
});


$(document).keydown(function (e) {
    // ESCAPE key pressed
    if (e.keyCode == 27) {
        close.trigger("click");
    }
});
// ------------------------------
// PORTFOLIO SINGLE AJAX
function setupAjax() {
    // PORTFOLIO DETAILS
    // Show details
    $(
        "a.ajax"
    ).on("click", function (event) {
        event.preventDefault();

        var url = $(this).attr("href");
        var baseUrl = $.address.baseURL();
        var detailUrl = giveDetailUrl();

        if (url.indexOf(baseUrl) !== -1) {
            // full url
            var total = url.length;
            detailUrl = url.slice(baseUrl.length + 1, total);
            $.address.path(detailUrl);
        } else {
            // relative url
            detailUrl = url;
            $.address.path(portfolioKeyword + detailUrl);
        }
    });
}
setupAjax();
// ------------------------------

// ------------------------------
// MASONRY - ISOTOPE
function setupMasonry() {
    var masonry = $(".masonry, .gallery, .wp-block-gallery:not(.is-cropped)");
    if (masonry.length) {
        masonry.each(function (index, el) {
            // call isotope
            refreshMasonry();
            $(el).imagesLoaded(function () {
                $(el).isotope({
                    layoutMode: $(el).data("layout") ? $(el).data("layout") : "masonry"
                });
                // set columns
                refreshMasonry();
            });

            // filters
            if (!$(el).data("isotope")) {
                var filters = $(el).siblings(".filters");
                if (filters.length) {
                    filters.find("a").on("click", function () {
                        var selector = $(this).attr("data-filter");
                        $(el).isotope({ filter: selector });
                        $(this)
                            .parent()
                            .addClass("current")
                            .siblings()
                            .removeClass("current");
                        return false;
                    });
                }
            }
        }); //each
        $(window).on("resize debouncedresize", function () {
            setTimeout(function () {
                refreshMasonry();
            }, 100);
        });
    }
}
// ------------------------------

// ------------------------------
// REFRSH MASONRY - ISOTOPE
function refreshMasonry() {
    var masonry = $(".masonry");
    if (masonry.length) {
        masonry.each(function (index, el) {
            // check if isotope initialized
            if ($(el).data("isotope")) {
                var itemW = $(el).data("item-width");
                var containerW = $(el).width();
                var items = $(el).children(".hentry");
                var columns = Math.round(containerW / itemW);
                columns = $(window).width() <= 700 ? 2 : columns;

                // set the widths (%) for each of item
                items.each(function (index, element) {
                    var multiplier = $(this).hasClass("x2") && columns > 1 ? 2 : 1;
                    var itemRealWidth =
                        ((Math.floor(containerW / columns) * 100) / containerW) *
                        multiplier;
                    $(this).css("width", itemRealWidth + "%");
                });

                var columnWidth = Math.floor(containerW / columns);

                $(el).isotope("option", { masonry: { columnWidth: columnWidth } });
                $(el).isotope("layout");
            }
        }); //each
    }
}
// ------------------------------


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
                
                history: 'replace',
                historyTitle: true,
                //debug: true,
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



/* ===============================  Var Background image  =============================== */

var pageSection = $(".bg-img, section");
pageSection.each(function (indx) {

    if ($(this).attr("data-background")) {
        $(this).css("background-image", "url(" + $(this).data("background") + ")");
    }
});

$('.about .items').on('mouseenter', function () {
    $(this).addClass("active").siblings().removeClass("active");
});


/* ===============================  Swiper slider  =============================== */


var parallaxSlider;
var parallaxSliderOptions = {
    speed: 300,
    autoplay: true,
    parallax: true,
    loop: true,
    pagination: {
        el: '.slider .parallax-slider .swiper-pagination',
        clickable: true
    },
    on: {
        init: function () {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                $(swiper.slides[i])
                    .find('.bg-img')
                    .attr({
                        'data-swiper-parallax': 0.75 * swiper.width
                    });
            }
        },
        resize: function () {
            this.update();
        }
    },

    pagination: {
        el: '.slider .parallax-slider .swiper-pagination',
        type: 'fraction',
    },

    navigation: {
        nextEl: '.slider .parallax-slider .next-ctrl',
        prevEl: '.slider .parallax-slider .prev-ctrl'
    }
};

parallaxSlider = new Swiper('.slider .parallax-slider', parallaxSliderOptions);

parallaxSlider.on('slideChange', function () {
   
    var index = parallaxSlider.activeIndex;
    console.log(index);
    var existVideo = $($(".parallax-slider .swiper-slide")[index]).find("video").length == 1;
    var media = $('.parallax-slider video').not("[autoplay='autoplay']");
    media.each(function () {
        if (!existVideo)  $(this).get(0).pause();
        else if (existVideo)  $(this).get(0).play();
       
    });
});

/* ===============================  drawsvg icon  =============================== */

var anim = true;
var wind = $(window);
wind.on('scroll', function () {
    var bodyScroll = wind.scrollTop();
    var _target = $('.about').offset().top - 75;
    if (bodyScroll >= _target) {
        if (anim) {
            $(".about .svg-icon").each(function () {
                var $svg = $('.svg-icon').drawsvg({
                    duration: 4000,
                });
                $svg.drawsvg('animate');

            });
            anim = false;
        }
    }
});


$(window).on("load", function () {


    /* ===============================  SPLITTING TEXT  =============================== */

    Splitting();
    ScrollOut({
        targets: '[data-splitting]'
    });
});

