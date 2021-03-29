$(function () {

    $(document).ready(function () {
        var items = [];
        $(".elastic_grid_project_data").serializer().on("serializer:data", function (e, formData) {
            //console.log(JSON.stringify(formData));
            items.push(formData);

            //var formDataSample = [{
            //    'title': 'Azuki bean',
            //    'description': 'Swiss chard pumpkin bunya nuts maize plantain aubergine napa cabbage soko coriander sweet pepper water spinach winter purslane shallot tigernut lentil beetroot.Swiss chard pumpkin bunya nuts maize plantain aubergine napa cabbage.',
            //    'thumbnail': ['https://www.jqueryscript.net/demo/Responsive-Filterable-jQuery-Portfolio-Gallery-Plugin-Elastic-Grid/images/small/1.jpg', 'https://www.jqueryscript.net/demo/Responsive-Filterable-jQuery-Portfolio-Gallery-Plugin-Elastic-Grid/images/small/2.jpg', 'https://www.jqueryscript.net/demo/Responsive-Filterable-jQuery-Portfolio-Gallery-Plugin-Elastic-Grid/images/small/3.jpg', 'https://www.jqueryscript.net/demo/Responsive-Filterable-jQuery-Portfolio-Gallery-Plugin-Elastic-Grid/images/small/10.jpg', 'https://www.jqueryscript.net/demo/Responsive-Filterable-jQuery-Portfolio-Gallery-Plugin-Elastic-Grid/images/small/11.jpg'],
            //    'large': ['https://youtu.be/-6Xl9tBWt54', 'https://www.jqueryscript.net/demo/Responsive-Filterable-jQuery-Portfolio-Gallery-Plugin-Elastic-Grid/images/large/2.jpg', 'https://www.jqueryscript.net/demo/Responsive-Filterable-jQuery-Portfolio-Gallery-Plugin-Elastic-Grid/images/large/3.jpg', 'https://www.jqueryscript.net/demo/Responsive-Filterable-jQuery-Portfolio-Gallery-Plugin-Elastic-Grid/images/large/10.jpg', 'https://www.jqueryscript.net/demo/Responsive-Filterable-jQuery-Portfolio-Gallery-Plugin-Elastic-Grid/images/large/11.jpg'],
            //    'img_title': ['jquery elastic grid 1 ', 'jquery elastic grid 2', 'jquery elastic grid 3', 'jquery elastic grid 4', 'jquery elastic grid 5'],
            //    'button_list':
            //        [
            //            { 'title': 'Demo', 'url': 'http://porfolio.bonchen.net/', 'new_window': true },
            //            { 'title': 'Download', 'url': 'http://porfolio.bonchen.net/', 'new_window': false }
            //        ],
            //    'tags': ['Self Portrait']
            //} ];

        }).trigger("serializer:submit");

        $("#elastic_grid_project").elastic_grid({
            'showAllText': 'All',
            'filterEffect': 'scaleup', // moveup, scaleup, fallperspective, fly, flip, helix , popup
            'hoverDirection': true,
            'hoverDelay': 0,
            'hoverInverse': true,
            'expandingSpeed': 500,
            'expandingHeight': 500,
            'items': items
        });

    });

    // ================ slider9 ============== //

    var slider9 = new skewSlider('#slider9', {
        height: 330,
        navigationDots: false,
        navigationArrows: true,
        siblingsNavigation: true,
        removeSlides: true,
        slidePercent: 40,
        slideShow: 4000,
        stopSlideshowOnHover: true,
        skew: -25,
        visibleSiblings: 2,
        positionsToMove: 1,
        animationTime: 400,
        slideMargin: 0,
        updateTime: 300,
        updateEasing: 'ease-in-out',
        animationEasing: 'ease-in-out',
        showCaption: false,
        onWindowResize: sliderResize,
        breakpoints: {
            tablet: {
                maxWidth: 1024,
                slidePercent: 45,
                visibleSiblings: 2,
                skew: -19,
                imgAlign: 'xMidYMid slice',
                navigationDots: true,
                siblingsNavigation: false,
                navigationArrows: true,
                height: 300
            },
            phone: {
                maxWidth: 624,
                skew: -15,
                navigationDots: true,
                showCaption: false,
                positionsToMove: 1,
                height: 250,
                slidePercent: 90
            }
        }
    });

    var slideNode = document.querySelector('.update1'),
        updateOptions = {
            slidePercent: 80,
            slideMargin: 10,
            visibleSiblings: 0,
            removeSlides: true,
            slideShow: false,
            positionsToMove: 1,
            animationEasing: 'ease',
            onWindowResize: sliderResize,
            height: 440,
            imgAlign: 'xMidYMid slice',
            navigationDots: true,
            animatedAddRemove: true,
            navigationArrows: true,
            updateTime: 300,
            siblingsNavigation: false,
            skew: 0,
            animationTime: 900,
            showCaption: true
        };

    slideNode.addEventListener('click', function (event) {

        if (!slideNode.classList.contains('opened') && event.target.href) {
            if (event.target.parentNode.parentNode.classList[0] == 'skw-currentSlideBefore') {
                slider9.update(updateOptions, function () {
                    slideNode.classList.add('opened');
                });
            } else if (event.target.href) {
                var position = event.target.parentNode.parentNode.dataset.pos;

                slider9.goTo(position, function () {
                    slider9.update(updateOptions, function () {
                        slideNode.classList.add('opened');
                    });
                });
            }

        } else if (event.target.classList.contains('close')) {
            slider9.update(null, function () {
                slideNode.classList.remove('opened');
            });
        }

    });

    function sliderResize() {
        slideNode.classList.remove('opened');
    }

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

    //
    $(document).ready(function () {

        var timer;

        var exitModalParams = {
            numberToShown: 3,
            callbackOnModalShow: function () {
                var counter = $('.exit-modal').data('exitModal').showCounter;
                //$('.exit-modal .modal-body p').text("Exit modal shown " + counter + " times");
                window.getStared();
            },
            callbackOnModalShown: function () {
                timer = setTimeout(function () {
                   
                }, 4000)
            },
            callbackOnModalHide: function () {
                clearTimeout(timer);
            }
        }

        $('.destroy-exit-modal').on("click", function (e) {
            e.preventDefault();
            if ($('.exit-modal').data('exit-modal')) {
              
            }
            $('.exit-modal').exitModal('hideModal');
            $('.exit-modal').exitModal('destroy');
            
        });

        $('.init-exit-modal').on('click', function (e) {
            e.preventDefault();
            $('.exit-modal').exitModal(exitModalParams);
            if ($('.exit-modal').data('exit-modal')) {
              
            }
        });
        $('.init-exit-modal').trigger('click');

        $('.close-exit-modal').on('click', function (e) {
            e.preventDefault();
            $('.destroy-exit-modal').trigger('click');
        });

    });


});