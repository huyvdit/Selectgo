$(".button-as-effect").click(function () {

    var $this = $(this);

    $this.addClass("btn-contract");

    setTimeout(function () {
        $this.removeClass("btn-contract");
    }, 2200);
});