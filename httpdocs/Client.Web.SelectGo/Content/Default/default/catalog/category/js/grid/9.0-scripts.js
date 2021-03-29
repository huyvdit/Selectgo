CRUMINA = {};
!function (e) {
    "use strict";
    // DRAG SLIDER //
    CRUMINA.drag_Slider = function() {

        var availHeight = $('.content-body').outerHeight() - $('.content-mask').outerHeight();

        new Dragdealer('content-scroller', {
            horizontal: false,
            vertical: true,
            yPrecision: availHeight,
            animationCallback: function (x, y) {
                $('.content-body').css('margin-top', -y * availHeight);
            }
        });

    }
    CRUMINA.initSwiper = function () {
        var i = 0; var n = {}; e(".swiper-container").each(function () {
            var t = e(this), a = "swiper-unique-id-" + i, s = !1; t.addClass("swiper-" + a + " initialized").attr("id", a),
                t.closest(".crumina-module").find(".swiper-pagination").addClass("pagination-" + a); var o = t.data("effect") ? t.data("effect") : "slide", r = !t.data("crossfade") || t.data("crossfade"), c = 0 != t.data("loop") || t.data("loop"), l = 1, d = t.data("scroll-items") ? t.data("scroll-items") : 1, u = t.data("direction") ? t.data("direction") : "horizontal", p = !!t.data("mouse-scroll") && t.data("mouse-scroll"), f = t.data("autoplay") ? parseInt(t.data("autoplay"), 10) : 0, m = !!t.hasClass("auto-height"), h = !!t.data("nospace") && t.data("nospace"), g = !!t.data("centered-slider") && t.data("centered-slider"), v = t.data("stretch") ? t.data("stretch") : 0, y = t.data("depth") ? t.data("depth") : 0, w = l > 1 && 1 != h ? 20 : 0; (s = {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },}), n["swiper-" + a] = new Swiper(".swiper-" + a, { pagination: ".pagination-" + a, paginationClickable: !0, direction: u, mousewheelControl: p, mousewheelReleaseOnEdges: p, slidesPerView: l, slidesPerGroup: d, spaceBetween: w, keyboardControl: !0, setWrapperSize: !0, preloadImages: !0, updateOnImagesReady: !0, centeredSlides: g, autoplay: f, autoHeight: m, loop: c, breakpoints: s, effect: o, fade: { crossFade: r }, parallax: !0, onImagesReady: function (e) { }, coverflow: { stretch: v, rotate: 0, depth: y, modifier: 2, slideShadows: !1 }, onSlideChangeStart: function (e) { if (t.closest(".crumina-module").find(".slider-slides").length) { t.closest(".crumina-module").find(".slider-slides .slide-active").removeClass("slide-active"); var i = e.slides.eq(e.activeIndex).attr("data-swiper-slide-index"); t.closest(".crumina-module").find(".slider-slides .slides-item").eq(i).addClass("slide-active") } } }), i++
        }), e(".btn-prev").on("click", function () { var i = e(this).closest(".crumina-module-slider").find(".swiper-container").attr("id"); n["swiper-" + i].slidePrev() }), e(".btn-next").on("click", function () { var i = e(this).closest(".crumina-module-slider").find(".swiper-container").attr("id"); n["swiper-" + i].slideNext() }), e(".slider-slides .slides-item").on("click", function (i) { i.preventDefault(); var t = e(this).closest(".crumina-module-slider").find(".swiper-container").attr("id"); if (e(this).hasClass("slide-active")) return !1; var a = e(this).parent().find(".slides-item").index(this); return n["swiper-" + t].slideTo(a + 1), e(this).parent().find(".slide-active").removeClass("slide-active"), e(this).addClass("slide-active"), !1 })
    }

    var r = e(".counter");
    CRUMINA.prices = function () {
        jQuery(".js-pricing-switcher").on("click", function () { var i = e(this).prev().is(":checked"); e(this).closest(".crumina-pricings").find(".price").each(function () { i ? e(this).text(e(this).data("annually")) : e(this).text(e(this).data("monthly")) }) });
    }

    CRUMINA.initSwiper();
    CRUMINA.prices();
    CRUMINA.drag_Slider();
}(jQuery);


/*********************************************************************************

	Template Name: Keystroke Creative Agency Bootstrap4 Html5 Template
	Note: This is main js.

**********************************************************************************/
(function (window, document, $, undefined) {
    'use strict';

    var axilKey = {
        k: function (e) {
            axilKey.s();
            axilKey.methods();
        },
        s: function (e) {
            this._window = $(window),
                this._document = $(document),
                this._body = $('body'),
                this._html = $('html')
        },
        methods: function (e) {
            axilKey.axilWow();
            axilKey._clickDoc();
            axilKey.axilHover();
        },

        axilWow: function () {
            new WOW().init();
        },

        axilHover: function () {
            $('.axil-service-area .axil-service , .mesonry-list .portfolio , .axil-blog-list .axil-blog , .axil-testimonial-single .axil-testimonial').mouseenter(function () {
                var self = this;
                $(self).removeClass('axil-control');
                setTimeout(function () {
                    $('.axil-service-area .active , .mesonry-list .active , .axil-blog-list .active ,  .axil-testimonial-single .active').removeClass('active').addClass('axil-control');
                    $(self).removeClass('axil-control').addClass('active');
                    $('.axil-service.active .inner::before').css('opacity', 0.1);
                }, 0);

            });
        },

        _clickDoc: function (e) {
            var inputblur, inputFocus, openSideNav, closeSideNav, openSubMenu, closeSubMenu, searchTriggerShow, searchTriggerHide, axilaccordion, OpenMobileMenu, closeMobileMenu, closeMenuWrapperClick, closeMobileMenu2;
            inputblur = function (e) {
                if (!$(this).val()) {
                    $(this).parent('.form-group').removeClass('focused');
                }
            };

            inputFocus = function (e) {
                $(this).parents('.form-group').addClass('focused');
            };

           

            axilKey._document
                .on('blur', 'input,textarea,select', inputblur)
                .on('focus', 'input:not([type="radio"]),input:not([type="checkbox"]),textarea,select', inputFocus)
            
        }
    };

    axilKey.k();

})(window, document, jQuery);