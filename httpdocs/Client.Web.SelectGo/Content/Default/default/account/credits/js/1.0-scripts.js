$(document).ready(function () {
    $(".veen .forget-pass-btn button").click(function () {
        $('.veen .wrapper').addClass('move');
        $('.body').css('background', '#c90000');
        $(".veen .change-pass-btn button").removeClass('active');
        $(this).addClass('active');

    });
    $(".veen .change-pass-btn button").click(function () {
        $('.veen .wrapper').removeClass('move');
        $('.body').css('background', '#2c3442');
        $(".veen .forgot-pass-btn button").removeClass('active');
        $(this).addClass('active');
    });
});