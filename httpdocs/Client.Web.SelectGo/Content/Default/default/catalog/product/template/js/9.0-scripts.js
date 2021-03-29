/*-------------------------------------
add images with data attributes
---------------------------------------*/

(($) => {
    if ('objectFit' in document.documentElement.style === false) {
        $('.bg-image').each(function attachBg() {
            const img = $(this);
            const src = img.attr('src');
            const classes = img.get(0).classList;
            img.before($(`<div class="${classes}" style="background: url(${src}); background-size: cover; background-position: 50% 50%;"></div>`));
            img.remove();
        });
    }
})(jQuery);

(function () {

    [].slice.call(document.querySelectorAll('.tabs')).forEach(function (el) {
        new CBPFWTabs(el);
    });

})();

var interleaveOffset = 0.5;

var swiperOptions = {
    direction: "horizontal",
    loop: true,
    grabCursor: false,
    resistance: true,
    resistanceRatio: 0.5,
    slidesPerView: 1,
    allowTouchMove: true,
    speed: 1000,
    autoplay: false,
    mousewheel: true,
    parallax: true,
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">' +
                '<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)" stroke="#FFF"' +
                'stroke-opacity="1" stroke-width="2px"></circle>' +
                '<circle cx="10" cy="10" r="3" fill="#FFF"></circle>' +
                '</svg></div></div></span>';
        },

    },
    on: {
        progress: function () {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = swiper.width * interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                //swiper.slides[i].querySelector(".img-mask").style.transform = "translate3d(" + innerTranslate + "px,0, 0)";
            }

        },
        touchStart: function () {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
            }
        },
        setTransition: function (speed) {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                //swiper.slides[i].style.transition = speed + "ms";
                //swiper.slides[i].querySelector(".img-mask").style.transition = speed + "ms";
            }
        },
        init: function () {
            $('.swiper-slide-active').find('video').each(function () {
                $(this).get(0).play();
            });

        },
        slideChangeTransitionStart: function () {

            $('.swiper-slide-active').find('video').each(function () {
                $(this).get(0).play();
            });

        },
        slideChangeTransitionEnd: function () {

            $('.swiper-slide-prev').find('video').each(function () {
                $(this).get(0).pause();
            });

            $('.swiper-slide-next').find('video').each(function () {
                $(this).get(0).pause();
            });

        },
    },
};

var showcaseSwiper = new Swiper("#template-cover", swiperOptions);	


// ------------------------------
// LIGHTBOX - applied to porfolio and gallery post format
function setupLightbox() {
    if ($(".lightbox, .gallery").length) {
        $(".media-box, .gallery").each(function (index, element) {
            var $media_box = $(this);
            $media_box.magnificPopup({
                delegate:
                    '.lightbox, figure a[href$=".jpg"], figure a[href$=".jpeg"], figure a[href$=".png"], figure a[href$=".gif"], .gallery-item a[href$=".jpg"], .gallery-item a[href$=".jpeg"], .gallery-item a[href$=".png"], .gallery-item a[href$=".gif"]',
                type: "image",
                image: {
                    markup:
                        '<div class="mfp-figure">' +
                        '<div class="mfp-close"></div>' +
                        '<div class="mfp-img"></div>' +
                        "</div>" +
                        '<div class="mfp-bottom-bar">' +
                        '<div class="mfp-title"></div>' +
                        '<div class="mfp-counter"></div>' +
                        "</div>", // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button

                    cursor: "mfp-zoom-out-cur", // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor.
                    verticalFit: true, // Fits image in area vertically
                    tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
                },
                gallery: {
                    enabled: true,
                    tCounter: '<span class="mfp-counter">%curr% / %total%</span>' // markup of counter
                },
                iframe: {
                    markup:
                        '<div class="mfp-iframe-scaler">' +
                        '<div class="mfp-close"></div>' +
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                        '<div class="mfp-title">Some caption</div>' +
                        "</div>"
                },
                mainClass: "mfp-zoom-in",
                tLoading: "",
                removalDelay: 300, //delay removal by X to allow out-animation
                callbacks: {
                    markupParse: function (template, values, item) {
                        var title = "";
                        if (item.el.parents(".gallery-item").length) { // classic editor gallery
                            title = item.el
                                .parents(".gallery-item")
                                .find(".gallery-caption")
                                .text();
                        } else if (item.el.parents(".blocks-gallery-item").length) { // Gutenberg gallery
                            title = item.el
                                .parents(".blocks-gallery-item")
                                .find("figcaption")
                                .text();
                        }
                        else {
                            title =
                                item.el.data("title") == undefined
                                    ? ""
                                    : item.el.data("title");
                        }
                        //return title;
                        values.title = title;
                    },
                    imageLoadComplete: function () {
                        var self = this;
                        setTimeout(function () {
                            self.wrap.addClass("mfp-image-loaded");
                        }, 16);
                    },
                    beforeClose: function () {
                        // play bg audio when closing audio/video in a lightbox
                        if (this.content.find('iframe[src*="soundcloud.com"]').length || this.content.find('iframe[src*="vimeo.com"]').length || this.content.find('iframe[src*="youtube.com"]').length) {
                            if (!isUserTurnedOffMusic) {
                                if (music) {
                                    music.play();
                                    isLigtboxTurnedOffMusic = false;
                                }

                            }
                        }
                    },
                    close: function () {
                        this.wrap.removeClass("mfp-image-loaded");

                    },
                    beforeAppend: function () {
                        var self = this;

                        // pause bg audio when opening audio/video in a lightbox
                        if (this.content.find('iframe[src*="soundcloud.com"]').length || this.content.find('iframe[src*="vimeo.com"]').length || this.content.find('iframe[src*="youtube.com"]').length) {
                            self.wrap.addClass("is-soundcloud");
                            if (music) {
                                isLigtboxTurnedOffMusic = true;
                                music.pause();
                            }
                        }

                        // square aspect ratio for soundcloud embeds
                        if (this.content.find('iframe[src*="soundcloud.com"]').length) {
                            self.wrap.addClass("is-soundcloud");
                        } else {
                            self.wrap.removeClass("is-soundcloud");
                        }

                        this.content.find("iframe").on("load", function () {
                            setTimeout(function () {
                                self.wrap.addClass("mfp-image-loaded");
                            }, 16);
                        });
                    }
                },
                closeBtnInside: false,
                closeOnContentClick: true,
                midClick: true
            });
        });
    }
}
  // ------------------------------
setupLightbox();

/*----------------------------
	 Product Sticky Bottom Cart
    ------------------------------ */

function sticky_cart() {
    window.onscroll = function () {
       
        $(window).scrollTop() > 900 && $(".stickyCart").length ? (
            $("body.template-product").css("padding-bottom", "70px"),
            $(".stickyCart").slideDown()) : ($("body.template-product").css("padding-bottom", "0"),
                $(".stickyCart").slideUp());
    }
    $(".stickyOptions .selectedOpt").on("click", function () {
        $(".stickyOptions ul").slideToggle("fast")
    }),
        $(".stickyOptions .vrOpt").on("click", function (e) {

        });
}
sticky_cart();


$(document).ready(function () {


    var initPhotoSwipeFromDOM = function (gallerySelector) {

        var parseThumbnailElements = function (el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                el,
                childElements,
                thumbnailEl,
                size,
                item;

            for (var i = 0; i < numNodes; i++) {
                el = thumbElements[i];

                // include only element nodes 
                if (el.nodeType !== 1) {
                    continue;
                }

                childElements = el.children;

                size = el.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: el.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10),
                    author: el.getAttribute('data-author')
                };

                item.el = el; // save link to element for getThumbBoundsFn

                if (childElements.length > 0) {
                    item.msrc = childElements[0].getAttribute('src'); // thumbnail url
                    if (childElements.length > 1) {
                        item.title = childElements[1].innerHTML; // caption (contents of figure)
                    }
                }


                var mediumSrc = el.getAttribute('data-med');
                if (mediumSrc) {
                    size = el.getAttribute('data-med-size').split('x');
                    // "medium-sized" image
                    item.m = {
                        src: mediumSrc,
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };
                }
                // original image
                item.o = {
                    src: item.src,
                    w: item.w,
                    h: item.h
                };

                items.push(item);
            }

            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        };

        var onThumbnailsClick = function (e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            var clickedListItem = closest(eTarget, function (el) {
                return el.tagName === 'A';
            });

            if (!clickedListItem) {
                return;
            }

            var clickedGallery = clickedListItem.parentNode;

            var childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }

                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }

            if (index >= 0) {
                openPhotoSwipe(index, clickedGallery);
            }
            setTimeout(function () {
                $('.pswp__zoom-wrap').scrollImage();
            }, 1200);
            return false;
        };

        var photoswipeParseHash = function () {
            var hash = window.location.hash.substring(1),
                params = {};

            if (hash.length < 5) { // pid=1
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }

            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        };

        var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            // define options (if needed)
            options = {

                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function (index) {
                    // See Options->getThumbBoundsFn section of docs for more info
                    var thumbnail = items[index].el.children[0],
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                },

                addCaptionHTMLFn: function (item, captionEl, isFake) {
                    if (!item.title) {
                        captionEl.children[0].innerText = '';
                        return false;
                    }
                    captionEl.children[0].innerHTML = item.title + '<br/><small>Photo: ' + item.author + '</small>';
                    return true;
                },

            };


            if (fromURL) {
                if (options.galleryPIDs) {
                    // parse real index when custom PIDs are used 
                    // https://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if (isNaN(options.index)) {
                return;
            }



            var radios = document.getElementsByName('gallery-style');
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    if (radios[i].id == 'radio-all-controls') {

                    } else if (radios[i].id == 'radio-minimal-black') {
                        options.mainClass = 'pswp--minimal--dark';
                        options.barsSize = { top: 0, bottom: 0 };
                        options.captionEl = false;
                        options.fullscreenEl = false;
                        options.shareEl = false;
                        options.bgOpacity = 0.85;
                        options.tapToClose = true;
                        options.tapToToggleControls = false;
                    }
                    break;
                }
            }

            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

            // see: http://photoswipe.com/documentation/responsive-images.html
            var realViewportWidth,
                useLargeImages = false,
                firstResize = true,
                imageSrcWillChange;

            gallery.listen('beforeResize', function () {

                var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
                dpiRatio = Math.min(dpiRatio, 2.5);
                realViewportWidth = gallery.viewportSize.x * dpiRatio;


                if (realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200) {
                    if (!useLargeImages) {
                        useLargeImages = true;
                        imageSrcWillChange = true;
                    }

                } else {
                    if (useLargeImages) {
                        useLargeImages = false;
                        imageSrcWillChange = true;
                    }
                }

                if (imageSrcWillChange && !firstResize) {
                    gallery.invalidateCurrItems();
                }

                if (firstResize) {
                    firstResize = false;
                }

                imageSrcWillChange = false;

            });

            gallery.listen('gettingData', function (index, item) {
                if (useLargeImages) {
                    item.src = item.o.src;
                    item.w = item.o.w;
                    item.h = item.o.h;
                } else {
                    item.src = item.m.src;
                    item.w = item.m.w;
                    item.h = item.m.h;
                }
            });

            gallery.init();

            
        };

        // select all gallery elements
        var galleryElements = document.querySelectorAll(gallerySelector);
        for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        }


    };
    initPhotoSwipeFromDOM('.page-layout-gallery');

    setTimeout(function () {
        $('.jic').inlineCurrency();

        $("body").nightMode({
            autoEnable: true,
            successText: "Night mode is Enabled",
            adjustText: "Would you like to adjust brightness?",
            keepNormal: "#id, link, svg",
        });
        $(".night-trigger").show();
        $('.screen').scrollImage();
    }, 1200);
   
});


jQuery(document).ready(function ($) {

    $("#FORM-ITEM-SELECT").change(function () {

        var totalPrice = 0,
            values = [];

        $('#FORM-ITEM-SELECT input[type=checkbox], #FORM-ITEM-SELECT input[type=radio]').each(function () {
            if ($(this).is(':checked')) {
                values.push($(this).val());
                totalPrice += parseInt($(this).val());
            }
        });
        $("#FORM-ITEM-SELECT .btn_text").text(values.length > 0 ? "Order now" :"Buy it for me");
        $("#FORM-ITEM-SELECT .price").text(HvHelpers.formatNumber(totalPrice));
        $("#FORM-ITEM-SELECT .jic").attr("data-jic-value", totalPrice);
        $('#FORM-ITEM-SELECT .jic').inlineCurrency();

    });

});