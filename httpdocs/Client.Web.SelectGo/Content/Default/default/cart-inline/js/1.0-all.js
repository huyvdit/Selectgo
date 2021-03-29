function run_waitMe(el, num, isHide) {
    text = 'Processing, please wait...';
    fontSize = '';
    color = '#fff';
    switch (num) {
        case 1:
            maxSize = '';
            textPos = 'vertical';

            break;
        case 2:
            text = '';
            maxSize = 30;
            textPos = 'vertical';
            break;
        case 3:
            maxSize = 30;
            color = '#000';
            textPos = 'horizontal';
            fontSize = '18px';
            break;
    }
    el.waitMe({
        effect: 'win8_linear',
        text: text,
        bg: 'rgba(255,255,255,0.7)',
        color: color,
        maxSize: maxSize,
        waitTime: -1,
        source: '',
        textPos: 'horizontal',
        fontSize: fontSize,
        onClose: function (el) {
            if (window.wizardValid != undefined) window.wizardValid.next();
        }
    });
    if (isHide)
        setTimeout(function () {
            el.waitMe('hide');
        }, 1200);
};
function stop_waitMe(el) {
    el.waitMe('hide');
};
window.productAction = function () {

    $('.add-to-cart').on("click", function (event) {
        if (Pace != undefined) Pace.restart();
        var button = $(this)
        var product = button.attr('data-title') ? button.data('title') : button.closest('.product-item').find('.title').text();
        var quantity = $(".qty").val() || 1;
        var productBox = button.closest('.product-item');
        var productId = productBox.data("id");
        var productAssociatedId = [];
        productBox.find("input:checkbox[name=order-addvalued]:checked").each(function () {
            productAssociatedId.push($(this).attr("data-id"));
        });
        run_waitMe(productBox, 3);

        $.post("/" + AppConfigs.UniqueSeoCode + "/addtocart", { "id": productId, "productAssociatedId": productAssociatedId, "name": product, "quantity": quantity, "attributesXml": "" },
            function (data) {
                // Successful requests get here
                new Noty({
                    type: 'success',
                    text: '<div class="media">\
                                <i class="fa fa-cart-plus" style="font-size: 36px;color: #fff;"></i>\
                                <div class="media-body ml-3">\
                                  <strong>' + data.message + '</strong>\
                                </div>\
                              </div>',
                    timeout: 800
                }).show()
                setTimeout(function () { stop_waitMe(productBox); }, 1200);
                
                // Update the page elements
                if (window.CartUpdate != undefined) window.CartUpdate();
            });

        button.trigger('mouseout');
        event.preventDefault()
    })
    $('.add-to-wishlist').on("click", function (event) {
        var button = $(this)
        var product = button.data('title') ? button.data('title') : button.closest('.product-item').find('.title').text()
        var caption = button.hasClass('active') ? 'removed from' : 'added to'
        new Noty({
            type: 'pink',
            text: '<div class="media">\
                  <i class="fa fa-heartbeat" style="font-size: 36px;color: #5fbd74;"></i>\
                  <div class="media-body ml-3">\
                    <strong>' + product + '</strong><br/>Successfully ' + caption + ' wishlist!.\
                  </div>\
                </div>',
            timeout: 2000
        }).show()
        button.hasClass('active') ? button.attr('title', 'Add to wishlist') : button.attr('title', 'Added to wishlist')
        button.hasClass('active') ? button.removeClass('active') : button.addClass('active')
        button.trigger('mouseout')
        event.preventDefault();
    })
}
$(document).ready(function () {
    window.productAction();
});