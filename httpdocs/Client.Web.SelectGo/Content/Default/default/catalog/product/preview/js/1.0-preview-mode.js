jQuery(document).ready(function ($) {

    //Mobile preview Iframe action
    $('.btn-iframe-to-mobile-trigger').on('click', function (event) {
        event.preventDefault();
        $('.iframe-preview').addClass('iframe-preview--mobile').removeClass('iframe-preview--tablet').removeClass('iframe-preview--desktop');
    });
    $('.btn-iframe-to-tablet-trigger').on('click', function (event) {
        event.preventDefault();
        $('.iframe-preview').addClass('iframe-preview--tablet').removeClass('iframe-preview--mobile').removeClass('iframe-preview--desktop');
    });
    $('.btn-iframe-to-desktop-trigger').on('click', function (event) {
        event.preventDefault();
        $('.iframe-preview').addClass('iframe-preview--desktop').removeClass('iframe-preview--tablet').removeClass('iframe-preview--mobile');
    });

});