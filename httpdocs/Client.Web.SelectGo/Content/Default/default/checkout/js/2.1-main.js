$('.btn').on('click', function () {
    $('.modal').toggleClass('is-open');
});

$('.dropdown').on('click', function () {
    $(this).toggleClass('is-open');
});

$('.radio, .checkbox').on('click', function () {
    $(this).toggleClass('is-selected');
});

$('input, select').on('focus', function () {
    $(this).parent('.input').addClass('is-active');
});

$('input, select').on('blur', function () {
    var hasVal = !!$(this).val()

    $(this).parent('.input').removeClass('is-active');

    $(this).parent('.input').toggleClass('has-value', hasVal);

    var reg = new RegExp($(this).data('mask'));
    var val = $(this).val();
    var test = reg.test(val);
    var luhn = null;
    var hasLuhn = $(this)[0].hasAttribute('data-luhn');

    if (hasLuhn) {
        luhn = luhnChk(val.replace(/\-/gmi, ''));
        console.log(luhn);
    }

    if (hasLuhn && !luhn) {
        $(this).parent('.input').addClass('has-errors');
    } else if (val && !test) {
        $(this).parent('.input').addClass('has-errors');
    } else {
        $(this).parent('.input').removeClass('has-errors');
    }
});
$('input, select').trigger("blur");

$('input').on('input', function () {
    var reg = new RegExp($(this).data('mask'));
    var test = reg.test($(this).val());

    if (test) {
        $(this).parent('.input').addClass('is-valid');
    } else {
        $(this).parent('.input').removeClass('is-valid');
    }

    $(this).parent('.input').removeClass('has-errors');
});

$('#ccnumber').on('input', function () {
    var val = $(this).val()

    val = val.replace(/\D/gmi, '');

    str = val.match(/.{1,4}/g);

    $(this).val(str ? str.join(' ') : '');
});

$('.control__input').on('change', function () {
    var $this = $(this);
    $(this).parent('.control').toggleClass('is-selected', this.checked);
    $('.control__input').each(function (index) {
        if ($(this).attr('id') !== $this.attr('id') && $(this).attr('name') === $this.attr('name')) {
            $(this).parent('.control').removeClass('is-selected');
        }
    });
});



$('.js-add-giftcard').on('click', function (e) {
    e.preventDefault();
    var val = $('#giftcard').val();

    if (val) {
        addGiftcard(val);
        $('#giftcard').val('');
        $('#giftcard').blur();
    }
});

function addGiftcard(code) {
    $('.cards').after('<div class="giftcard"><div class="f"><div class="f70"><b>' + code + '</b><div class="microcopy">Balance left: $0.00</div></div><div class="f30">$50.00</div></div></div>');

    $('.giftcard').first().hide().fadeIn();
}

$('.collapser__label').on('click', function (e) {
    e.preventDefault();
    $(this).parent('.collapser').toggleClass('is-open');
    var isopen = $('.collapser').hasClass('is-open');

    if ($(this).parent('.collapser').find('.collapser__content input')) {
        $(this).parent('.collapser').find('.collapser__content input').first().focus();
    }
});


function luhnChk(luhn) {
    var len = luhn.length,
        mul = 0,
        prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
        sum = 0;

    while (len--) {
        sum += prodArr[mul][parseInt(luhn.charAt(len), 10)];
        mul ^= 1;
    }

    return sum % 10 === 0 && sum > 0;
};

function calcTotal() {
    $(".payment-due-price").data("checkout-payment-due-target");
    //
   var dis = $(".payment-discount").data("checkout-total-discount-target") || 0;
   var shi = $(".payment-shipping").data("checkout-total-shipping-target") || 0;
   var sub = $(".payment-subtotal").data("checkout-subtotal-price-target") || 0;

    var due = parseFloat(sub) + parseFloat(shi) - parseFloat(dis);
    $(".payment-due-price").data("checkout-payment-due-target", due);
    $(".payment-due-price").text("$" + due);

    //UPDATE:
    $("input[name='Order.OrderTransportFee'").val(shi);
    $("input[name='Order.OrderDiscount'").val(dis);
    $("input[name='Order.OrderTotal'").val(due);
}
window.calcTotal = calcTotal;

$('#billing-same').on('change', function () {
    if (!$(this)[0].checked) {
        $('#billing').show();
    } else {
        $('#billing').hide();
    }
});


$('#payment-cc, #payment-paypal').on('change', function () {
    if ($(this)[0].id === 'payment-cc') {
        $('.message').eq(0).addClass('is-visible').removeClass('is-hidden');
        $('.message').eq(1).addClass('is-hidden').removeClass('is-visible');
    } else {
        $('.message').eq(1).addClass('is-visible').removeClass('is-hidden');
        $('.message').eq(0).addClass('is-hidden').removeClass('is-visible');
    }
});

$(function () {
    $("[data-toggle=popover]").popover({
        html: true,
        placement: 'bottom',
        //trigger: 'hover',
        content: function () {
            var content = $(this).attr("data-popover-content");
            return $(content).children(".popover-body").html();
        },
        title: function () {
            var title = $(this).attr("data-popover-content");
            return $(title).children(".popover-heading").html();
        }
    });
});
var toggleShowOrderSummary = false;

$('body')
    .on('click', '.order-summary-toggle', function () {
        toggleShowOrderSummary = !toggleShowOrderSummary;

        if (toggleShowOrderSummary) {
            $('.order-summary-toggle')
                .removeClass('order-summary-toggle-hide')
                .addClass('order-summary-toggle-show');

            $('.sidebar:not(".sidebar-second") .sidebar__content .order-summary')
                .removeClass('order-summary--is-collapsed')
                .addClass('order-summary-is-expanded');

            $('.sidebar.sidebar-second .sidebar__content .order-summary')
                .removeClass('order-summary-is-expanded')
                .addClass('order-summary--is-collapsed');
        } else {
            $('.order-summary-toggle')
                .removeClass('order-summary-toggle-show')
                .addClass('order-summary-toggle-hide');

            $('.sidebar:not(".sidebar-second") .sidebar__content .order-summary')
                .removeClass('order-summary-is-expanded')
                .addClass('order-summary--is-collapsed');

            $('.sidebar.sidebar-second .sidebar__content .order-summary')
                .removeClass('order-summary--is-collapsed')
                .addClass('order-summary-is-expanded');
        }
    });