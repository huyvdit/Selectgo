/*--------------------------------------------------
Function Page Progress
---------------------------------------------------*/

function PageProgress() {
    if ($(".progress-page path").length > 0) {
        var progressPath = document.querySelector('.progress-page path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
    }
   

}//End Page Progress



/*--------------------------------------------------
Function FooterAppear
---------------------------------------------------*/

function FooterAppear() {

    if ($('#page-content').length > 0) {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 300) {
                $(".progress-page, #page-action-holder").addClass('is-active');
            } else {
                $(".progress-page, #page-action-holder").removeClass('is-active');
            }
        });
    }

    var lastScroll = 0;

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > lastScroll) {
            $(".progress-page, #page-action-holder").addClass("is-visible");
        } else if (scroll < lastScroll) {
            $(".progress-page, #page-action-holder").removeClass("is-visible");
        }
        lastScroll = scroll;
    });

}//End FooterAppear
/*--------------------------------------------------
Function Hide Show Header
---------------------------------------------------*/

function HideShowHeader() {

    var didScroll;
    var lastScrollTop = 0;
    var delta = 50;
    var navbarHeight = 250;
    var navbarHideAfter = navbarHeight

    $(window).scroll(function (event) {
        didScroll = true;
    });

    if ($('.scroll-hide').length > 0) {

        setInterval(function () {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 100);

    }

    return false;

    function hasScrolled() {
        var st = $(this).scrollTop();

        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHideAfter) {
            if ($('.scroll-hide').length > 0) {
                $('header').addClass('nav-hide');
            }
        } else {
            if ($('.scroll-hide').length > 0) {
                if (st + $(window).height() < $(document).height()) {
                    $('header').removeClass('nav-hide');
                }
            }
        }

        lastScrollTop = st;
    }


}//End Hide Show Header			

$(document).ready(function () {
    PageProgress();
    FooterAppear();
    HideShowHeader();
});
