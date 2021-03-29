$(function () {
    // Document.ready -> link up remove event handler
    $(".remove").click(function (e) {
        // Get the id from the link
        var recordToRemoved = $(this).attr("data-id");
        if (recordToRemoved != '') {
            // Perform the ajax post
            $.post("/" + AppConfigs.UniqueSeoCode + "/removefromcart", { "id": recordToRemoved },
                function (data) {
                    console.log(data);
                    // Successful requests get here
                    // Update the page elements
                    if (data.itemCount == 0 || data.itemCount == undefined) {
                        $('#row-' + data.cartId).fadeOut('slow').removeClass("row-product");
                    } else {
                        $('#item-count-' + data.cartId).val(data.itemCount);
                    }

                    $('#update-message').html(data.message);
                    $("#update-cart").addClass("has-changed");
                    if (data.cartCount == 0 || data.cartCount != $(".row-product").length) {
                        window.location.reload();
                    }
                    // Update the page elements
                    if (window.CartUpdate != undefined) window.CartUpdate();

                });
            e.preventDefault();
        }
    });

    $(".move-to-wishlist").click(function (e) {
        // Get the id from the link
        var recordToMove = $(this).attr("data-id");
        if (recordToMove != '') {
            // Perform the ajax post
            $.post("/" + AppConfigs.UniqueSeoCode + "/movetowishlist", { "id": recordToMove },
                function (data) {
                    // Successful requests get here
                    // Update the page elements
                    if (data.itemCount == 0) {
                        $('#row-' + data.cartId).fadeOut('slow');
                    }
                    if (data.CartCount == 0) {
                        window.location.reload();
                    }
                    $('#update-message').html(data.message);
                    $("#update-cart").addClass("has-changed");
                    // Update the page elements
                    if (window.CartUpdate != undefined) window.CartUpdate();
                });
            e.preventDefault();
        }
    });

    /* increase or decrease item */
    var qtyPlus = $('.qty-up');
    var qtyMinus = $('.qty-down');
    qtyPlus.on('click', function () {
        $(this).siblings('.qty').val(parseInt($(this).siblings('.qty').val()) + 1).trigger("change");
    });

    qtyMinus.on('click', function () {
        if (parseInt($(this).siblings('.qty').val()) > 1) {
            $(this).siblings('.qty').val(parseInt($(this).siblings('.qty').val()) - 1).trigger("change");
        }
    });

    $(".qty").bind("change", function () {

        var self = $(this);
        var id = self.attr("id");
        var updateNeed = true;
        if (id != undefined)
            self.attr("data-value") != self.val() ? $("#" + id.replace("count", "total")).addClass("is-changed") : $("#" + id.replace("count", "total")).removeClass("is-changed");

        if (updateNeed == true) {
            $("#update-cart").addClass("has-changed");
        }
    });

    var currency = function (price) {
        price = HvHelpers.formatNumber(price);

        return price;
    }

    var getPrice = function (res) {
        res = res.replace(/,/g, '');
        res = res.replace('₫', '').replace('$', '').replace('.', '').replace('.00 ', '');
        if (res == "" || res == "-") return 0;
        res = parseFloat(res);
        return res;
    }
    var calculatePointsfromMoney = function () {
        if ($("#cart-total").length > 0)
        $.ajax({
            url: '/api/general/get-point-conversion-rate?type=-1&amount=' + getPrice($("#cart-total").html()),
            type: 'GET',
            cache: false,
        }).done(function (result) {
            if (result[0] != undefined) {
                $("#money-to-points").text((result[0].Value2));
                var max = $("#current-points").text();
                if (parseInt($("#money-to-points").text()) < parseInt($("#current-points").text())) {
                    max = result[0].Value2;
                }
                $("#spent-to-points").attr("max", (max));
            }
            
        });
    }
    var calculateTotal = function () {
        var $total = $(".cart-totals"),
            _calculate = 0;

        $total.find(".total-item" + ":not(" + ".total-display" + ")").each(function () {
            var $item = $(this);
            if ($item.attr("data-calculate-min")) {
                _calculate -= getPrice($item.find(".total-value").html());
            } else {
                _calculate += getPrice($item.find(".total-value").html());
            }
        });
        $total.find("#cart-total").html(currency(_calculate));
    }
    var setShipping = function (price) {
        if (price == false) {
            price = 0;
        }
        $(".cart-totals").find("#cart-shipfee").html(currency(price));
        calculateTotal(); calculatePointsfromMoney();
    }
   
    $("[data-shipping-method]").each(function () {
        $(this).click(function () {
            $("[data-shipping-method]").removeClass("active");
            $(this).addClass("active");
            setShipping($(this).find("input:radio").attr("data-val"));
        });
    });
    calculatePointsfromMoney();
    //$("[data-shipping-method].active").trigger("click"); // set init
});