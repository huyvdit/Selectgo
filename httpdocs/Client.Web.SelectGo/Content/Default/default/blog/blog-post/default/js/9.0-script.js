var _masonryInit = function () {

    var _masonryGrid = $('.masonry-grid');

    if (_masonryGrid.length) {
        _masonryGrid.isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-item'
            }
        });
    }

};


$("article.post-details").activeReadingTime({
    // Distance (in pixels) from the top of the element
    topMargin: $('#header').height() - 20,
    
   
    // Distance (in pixels) from the bottom of the element
    bottomMargin: 640,

    // Expected average words per minute for your audience
    defaultWordsPerMinute: 200,

    minutesOnly: false
});
$("#readSpeed").hide();

$('#toggleGuides').click(function () {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('.line').addClass('hide');
    } else {
        $(this).addClass('active');
        $('.line').removeClass('hide');
    }
});

if ($('#primary').length > 0) {
         $.rvFontsize({
             targetSection: '#primary .post-details',
             variations:7,
             store: true, // store.min.js required!
             controllers: {
                 appendTo: '#rvfs-controllers',
                 showResetButton: true
             }
         });
		 // <div id="rvfs-controllers" class="fontsize-controllers group"></div>
     }

/* Sticky sidebar */
var mobile = false;
$('.sticky-sidebar').stick_in_parent();
$('.sticky-sidebar').on('sticky_kit:bottom', function (e) {
    $(this).parent().css('position', 'static');
}).on('sticky_kit:unbottom', function (e) {
    $(this).parent().css('position', 'relative');
});

$(window).on('resize', function () {
    if (($(window).width() < 992) && (mobile == false)) {
        $(".sticky-sidebar").trigger("sticky_kit:detach");
        mobile = true;
        console.log('small')
    }
    else if (($(window).width() >= 992) && (mobile == true)) {
        $('.sticky-sidebar').stick_in_parent();
        $('.sticky-sidebar').on('sticky_kit:bottom', function (e) {
            $(this).parent().css('position', 'static');
        }).on('sticky_kit:unbottom', function (e) {
            $(this).parent().css('position', 'relative');
        });
        mobile = false;
        console.log('big');
    }
}).resize();

$(document).ready(function () {
    setTimeout(function () {
        _masonryInit();
    }, 1200);
    $("#tagcloud").tx3TagCloud({
        multiplier: 1
    });
});

