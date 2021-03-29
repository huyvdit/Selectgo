jQuery(document).ready(function ($) { $('.cd-single-point').children('a').on('click', function () { var selectedPoint = $(this).parent('li'); if (selectedPoint.hasClass('is-open')) { selectedPoint.removeClass('is-open').addClass('visited'); } else { selectedPoint.addClass('is-open').siblings('.cd-single-point.is-open').removeClass('is-open').addClass('visited'); } }); $('.cd-close-info').on('click', function (event) { event.preventDefault(); $(this).parents('.cd-single-point').eq(0).removeClass('is-open').addClass('visited'); }); $('#cd-start').on('click', function (event) { event.preventDefault(); var mq = window.getComputedStyle(document.querySelector('.cd-product-intro'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, ""); if (mq == 'mobile') { $('body,html').animate({ 'scrollTop': $($(this).attr('href')).offset().top }, 200); } else { $('.cd-product').addClass('is-product-tour').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () { $('.cd-close-product-tour').addClass('is-visible'); $('.cd-points-container').addClass('points-enlarged').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () { $(this).addClass('points-pulsing'); }); }); } }); $('.cd-close-product-tour').on('click', function () { $('.cd-product').removeClass('is-product-tour'); $('.cd-close-product-tour').removeClass('is-visible'); $('.cd-points-container').removeClass('points-enlarged points-pulsing'); }); });


var AppShowcase = (function () {

    var $el = $('#ac-wrapper'),
        // device element
        $device = $el.find('.ac-device'),
        // the device image wrapper
        $trigger = $device.children('a:first'),
        // the screens
        $screens = $el.find('.ac-grid > a'),
        // the device screen image
        $screenImg = $device.find('img'),
        // the device screen title
        $screenTitle = $device.find('.ac-title'),
        // HTML Body element
        $body = $('body');

    function init() {
        // show grid
        $trigger.on('click', showGrid);
        // when a gridÂ´s screen is clicked, show the respective image on the device
        $screens.on('click', function () {
            showScreen($(this));
            return false;
        });
    }

    function showGrid() {
        $el.addClass('ac-gridview');
        // clicking somewhere else on the page closes the grid view
        $body.off('click').on('click', function () { showScreen(); });
        return false;
    }

    function showScreen($screen) {
        $el.removeClass('ac-gridview');
        if ($screen) {
            // update image and title on the device
            $screenImg.attr('src', $screen.find('img').attr('src'));
            $screenTitle.text($screen.find('span').text());
        }
    }

    return { init: init };

})();

$(function () {
    AppShowcase.init();
});