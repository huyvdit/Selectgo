jQuery(document).ready(function ($) {
    $('#project-item-images-1').lightGallery({
        thumbnail: false,
        thumbWidth: 80,
        thumbContHeight: 70,
        animateThumb: true,
        showThumbByDefault: true,
        getCaptionFromTitleOrAlt: true,
        fullScreen: true,
        download: true
    });
});