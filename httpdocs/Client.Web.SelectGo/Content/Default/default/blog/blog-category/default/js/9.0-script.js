$(window).load(function (e) {

    $("#bn7").breakingNews({
        effect: "slide-v",
        autoplay: true,
        timer: 3000,
        color: 'darkred'
    });

    /* ---------------------------------------
			FEATURED POST SLIDER
	--------------------------------------- */
    var owl = jQuery('#tg-featuredpostslider');
    var status = jQuery('.tg-slidecount');
    owl.owlCarousel({
        itemsCustom: [
            [320, 1],
            [568, 2],
            [768, 3],
            [992, 4],
            [1200, 4],
        ],
        pagination: false,
        navigation: true,
        navigationText: [
            '<span class="tg-btnarrowprev"><i class="lnr lnr-arrow-left"></i></span>',
            '<span class="tg-btnarrownext"><i class="lnr lnr-arrow-right"></i></span>'
        ],
        afterAction: afterAction,
    });
    function updateResult(pos, value) {
        status.find(pos).find(".tg-result").text(value);
    }
    function afterAction() {
        updateResult(".tg-owlItems", this.owl.owlItems.length);
        updateResult(".tg-currentItem", this.owl.currentItem + 1);
    }
});
