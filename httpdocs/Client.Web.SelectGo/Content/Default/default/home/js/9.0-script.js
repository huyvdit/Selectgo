
jQuery(document).ready(function () {

  
    // SLIDER
   window.swiper_home = new Swiper('.swiper-slider-home', {

        loop: true,
       
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-slider-home .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">0' + (index + 1) + '</span>';
            },
        },
    });

    

    window.slide_testimonial = new Swiper('.testimonial-customer', {
        speed: 1000,
        slidesPerView: 1,
        autoHeight: true,
        loop: true,
        navigation: {
            nextEl: '.testimonial-customer .testimonial-carousel-btn-next',
            prevEl: '.testimonial-customer .testimonial-carousel-btn-prev',
        },
        breakpoints: {

        }
    });

    setTimeout(function () {
        swiper_home.update();
        swiper_home.setGrabCursor();
        slide_testimonial.update();
    },1200);

    // js check full page
    if ($(window).width() > 1024) {

        //$('#fullpage').fullpage({
        //    anchors: ['start','intro', 'services', 'works', 'testimonials', 'recent-blog', 'work-with-us', 'our-clients'],
        //    licenseKey: 'xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx',
        //    easingcss3: 'ease-in-out',
        //    verticalCentered: false,
        //    scrollBar: true,
        //    //menu: '#menu',
        //    animateAnchor: false,
        //    scrollingSpeed: 1200,
        //    autoScrolling: true,
        //    fitToSectionDelay: 2000,
        //    sectionSelector: '.section-main',
        //    onLeave: function (anchorLink, index) {
        //        var loadedSection = $(this);
        //        //using index
        //        switch (index.index) {

        //            case 0:
        //            case 1:
        //            case 2:

        //                break;
        //        }

        //    }
        //});
    }

    // EQUALIZER TOGGLE
    //var source = "http://" + window.location.hostname + "/assets/audio/audio.mp3";
    //var audio = new Audio(); // use the constructor in JavaScript, just easier that way
    //audio.addEventListener("load", function () {
    //    //audio.play();
    //}, true);
    //audio.src = source;
    //audio.autoplay = false;
    //audio.loop = true;
    //audio.volume = 0.9;


    //$('.equalizer').click();		



    // EQUALIZER
    function randomBetween(range) {
        var min = range[0],
            max = range[1];
        if (min < 0) {
            return min + Math.random() * (Math.abs(min) + max);
        } else {
            return min + Math.random() * max;
        }
    }

    $.fn.equalizerAnimation = function (speed, barsHeight) {
        var $equalizer = $(this);
        if ($.fn.equalizerAnimationspeed != undefined) {
            clearInterval($.fn.equalizerAnimationspeed);
        }
        if (!$('.equalizer').hasClass('paused')) {
            $equalizer.addClass('playing');
            $.fn.equalizerAnimationspeed = setInterval(function () {
                $equalizer.find('span').each(function (i) {
                    $(this).css({ height: randomBetween(barsHeight[i]) + 'px' });
                });
            }, speed);
        }
        else $equalizer.removeClass('playing');

    }

    var barsHeight = [
        [8, 22],
        [5, 10],
        [11, 8],
        [1, 27],
        [9, 1],
        [16, 3]
    ];

    var playing = false;
    $('.equalizer').on('click', function (e) {
        var $equalizer = $(this);
        if (playing == false) {
            audio.play();
            playing = true;
            $equalizer.removeClass('paused');
            $('.equalizer').equalizerAnimation(300, barsHeight);
        } else {
            audio.pause();
            playing = false;
            $equalizer.addClass('paused');
            $('.equalizer').equalizerAnimation(0, barsHeight);
        }
        $equalizer.removeClass("not-started");
    });

});
