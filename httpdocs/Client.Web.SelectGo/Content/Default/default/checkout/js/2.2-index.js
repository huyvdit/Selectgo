window.regionReg = function (stateProvinceId, districtId, i) {

    $($('.region')[i]).cascadingDropdown({
        selectBoxes: [
            {
                selector: '.step1',
                selected: 1,
                source: [
                    { label: 'VN', value: 1 },
                ]
            },
            {
                selector: '.step2',
                requires: ['.step1'],
                paramName: "stateprovinceid",
                source: function (request, response) {
                    $.getJSON('/api/general/get-state-province-by?lang=en', request, function (data) {

                        response($.map(data.menu, function (item, index) {
                            return {
                                label: item.name,
                                value: item.value,
                                selected: item.value == (stateProvinceId) // Select if only option
                            };
                        }));

                    });
                }
            },
            {
                selector: '.step3',
                requires: ['.step1', '.step2'],
                requireAll: true,
                
                source: function (request, response) {
                    $.getJSON('/api/general/get-district-by?lang=en', request, function (data) {
                        response($.map(data.menu, function (item, index) {
                            return {
                                label: item.name,
                                value: item.value,
                                selected: item.value == (districtId) // Select first available option
                            };
                        }));
                    });
                },
                onChange: function (event, value, requiredValues, requirementsMet) {
                    // do stuff
                }
            }
        ]
    });
};

window.regionReg($($('.region')[0]).find(".step2").attr("data-id"), $($('.region')[0]).find(".step3").attr("data-id"), 0);
window.regionReg($($('.region')[1]).find(".step2").attr("data-id"), $($('.region')[1]).find(".step3").attr("data-id"), 1);

// Used to detect initial (useless) popstate.
// If history.state exists, assume browser isn't going to fire initial popstate.
var popped = ('state' in window.history && window.history.state !== null), initialURL = location.href;

$(window).bind('popstate', function (event) {
    // Ignore inital popstate that some browsers fire on page load
    var initialPop = !popped && location.href == initialURL
    popped = true
    if (initialPop) return;

    // showMailOverview(); // exmaple function to display all email since the user has click Back.

});

window.activeStep = function (i, step) {
    $(".breadcrumb__item").removeClass("breadcrumb__item--current");
    for (var j = 1; j < (i+1); j++) {
        $(".breadcrumb__item.step-" + j).addClass("breadcrumb__item--completed");
    }
    $(".breadcrumb__item." + step).addClass("breadcrumb__item--current");

    var jf = step.replace("step-", "");
    if (history.pushState) {
        history.pushState(null, null, window.location.pathname + '?step=' + (jf)); // URL is now /inbox/N
        this.document.title = "..:: Check out - Step " + (jf)+" ::..";
    }

    window.updateStep(i, step);
};
window.updateStep = function (i, step) {
    
    if (i >= 0) {
        $(".review-block__content .phone").text($("#Order_Customer_MainAddress_PhoneNumber").val());
        $(".review-block__content .email").text($("#Order_Customer_MainAddress_Email").val());
        $(".review-block__content .address").text($("#Order_Customer_MainAddress_Address1").val());
        $(".remember_state").remove();
    }
    if (step == "step-3") {

        $(".review-block__content .shipping-method").text($("input[name='Order.ShippingMethodId']:checked").attr("data-name"));
        $(".review-block__content .shipping-method-desc").text($("input[name='Order.ShippingMethodId']:checked").attr("data-desc"));
        
    }
    if (step == "step-4") {

        $(".review-block__content .shipping-method").text($("input[name='Order.ShippingMethodId']:checked").attr("data-name"));
        $(".review-block__content .shipping-method-desc").text($("input[name='Order.ShippingMethodId']:checked").attr("data-desc"));
        $(".review-block__content .payment-method").text($("input[name='Order.PaymentMethodId']:checked").attr("data-name"));
        $(".review-block__content .payment-method-desc").text($("input[name='Order.PaymentMethodId']:checked").attr("data-desc"));

    }
}
document.addEventListener('DOMContentLoaded', () => {
    window.wizard = new Zangdar('#checkout-form', {
        onSubmit(e) {
            e.preventDefault()

            alertify.confirm()
                .setting({
                    'defaultFocus': 'ok',
                    transition: 'zoom',
                    'reverseButtons': true,
                    'message': 'Are you sure sent order?',
                    'onok': function () {
                        run_waitMe($('.checkout__form > form'), 3);
                        var DATAPOST = $("#checkout-form").serialize();
                        // Cates:
                        if (AppConfigs.UniqueSeoCode == "en") {
                            $("input[name='Order.OrderDiscount']").val($("input[name='Order.OrderDiscount']").val().toString().replace('.', ','));
                            $("input[name='Order.OrderTotal']").val($("input[name='Order.OrderTotal']").val().toString().replace('.', ','));
                        }
                        DATAPOST["OrderItems"] = $("#order-form").serialize();
                        DATAPOST["__RequestVerificationToken"] = $("input[name=__RequestVerificationToken").val();
                        
                        console.log(DATAPOST);
                       // return;
                        $.ajax({
                            //url: "http://admin.selectgo.vn/external/api/item/post",
                            url: "/api/order/post",
                            type: 'POST',

                            data: DATAPOST,
                            // Disable caching of AJAX responses
                            cache: false,
                            // Fetch the stored token from localStorage and set in the header
                            error: function (err) {

                                stop_waitMe($('.checkout__form > form'));
                                alertify.set('notifier', 'position', 'top-center');
                                alertify.error('Error: ' + JSON.stringify(err));
                            },
                            success: function (data) {
                                
                                if (data == 0) {
                                    alertify.set('notifier', 'position', 'top-center');
                                    alertify.error('Order not successfully, please check and try again!');
                                }
                                else {
                                    alertify.set('notifier', 'position', 'top-center');
                                    var duration = 7;
                                    var msg = alertify.success('Ordered successfully with new ID tracking:[' + data + '] (Auto-reload in ' + duration + ' seconds)', duration, function () { clearInterval(interval); });
                                    var interval = setInterval(function () {
                                        msg.setContent('Ordered successfully with new ID tracking:[' + data + '] (Auto-reload in ' + (--duration) + ' seconds)');
                                    }, 1000);

                                    setTimeout(function () {
                                        //goStep(5);
                                        stop_waitMe($('.checkout__form > form'));
                                        window.location.href = "/en/checkout/complete?id=" + data;
                                    }, duration * 1000)
                                }

                            }
                        });
                    }
                }).set('labels', { ok: 'Agree', cancel: 'No, later' }).setHeader('<b> Order confirmed </b> ').show();
            // Ajax call, custom form processing or anything you wan't to do here...

            return false;
        },

        onStepChange(step, oldStep, direction, form) {
            const breadcrumb = this.getBreadcrumb() // this refers to Zangdar form wizard instance
            
            $('html, body').animate({ scrollTop: 150 }, 100, 'swing');
            alertify.dismissAll();
            window.activeStep(step.index, step.label);
            return true;
        },

        onValidation(step, fields, form) {
            if (step.hasErrors()) {
                // ...
            }
            return true;
            // Here a treatment after HTML native validation...
        },

        customValidation(step, fields, form) {

            // Use the Formr library to validate fields (https://github.com/betaWeb/formr)
            const validator = new Formr(form)
            if (step.label == ('step-1')) {

                var requires = ['Order.Customer.MainAddress.FirstName',
                    'Order.Customer.MainAddress.PhoneNumber', 'Order.Customer.MainAddress.Address1',
                    'Order.Customer.MainAddress.StateProvinceId', 'Order.Customer.MainAddress.DistrictId'];
                var emails = ['Order.Customer.MainAddress.Email'];

                if ($("#billing-same:checked").length == 0) {
                    requires.push('Order.Customer.BillingAddress.FirstName');
                    requires.push('Order.Customer.BillingAddress.PhoneNumber');
                    requires.push('Order.Customer.BillingAddress.Address1');
                    requires.push('Order.Customer.BillingAddress.StateProvinceId');
                    requires.push('Order.Customer.BillingAddress.DistrictId');

                    emails.push('Order.Customer.BillingAddress.Email')

                }
                if ($("input[name=__IsAuthenticated]").val() == "False") {
                    requires.push('AsGuest.UserName');
                    emails.push('AsGuest.UserName')
                }
                else {
                   
                }

                validator
                    .required(
                        ...(requires)
                    )
                    .email(...(emails))

                    .validateAll();

                if (!validator.isValid()) {
                    alertify.dismissAll();
                    alertify.set('notifier', 'position', 'top-center');
                   
                    var msgError = "";
                    $.each(Object.keys(validator.getErrors()), function (k, v) {
                        $($("input[name='" + v + "'], select [name='" + v + "']").parent()).addClass("has-errors");
                        msgError +=  "(*)" + v.replace('AsMember.', '').replace('Order.Customer.', '').toUpperCase() + ":" + (validator.getErrors()[v][0].replace('This field is required', 'Is required')) + "/. ";
                    });
                    alertify.set('notifier', 'delay', 30);
                    alertify.warning("<p>Please check errors bellow to next step: </p>" + msgError);
                    // ...
                    window.wizardValid = undefined;
                    return false;
                }
            }
            else if (step.label == ('step-4')) {

                window.wizardValid = undefined;
                return true;
            }
            window.wizardValid = window.wizard;
            return false;
            //...
        }
    });
    
    if (window.wizardStep != "1") {
        goStep(window.wizardStep);
        window.activeStep(parseInt(window.wizardStep), "step-" + window.wizardStep);
    }
    if (window.wizardStep == "1") {

        $(function () {
            $("form").rememberState({
                clearOnSubmit: false,
                objName: "checkout_info",
                ignore: ["__RequestVerificationToken", "__IsAuthenticated"]
            });
            //window.updateStep(parseInt(window.wizardStep), "step-" + window.wizardStep);
        });
    }
    else {
        if ($(".review-block .phone").text() == "") {
            window.location.href = "/en/checkout/?step=1";
        }
    }

    $(".review-block button").bind("click", function () {
        goStep($(this).attr("data-href").replace("step-", ""));
    });
})
function goStep(s) {
    window.wizard.setOption('active_step_index', parseInt(s) - 1);
    window.wizard.setOption('bypass_validation', true)
    window.wizard.refresh();
}
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
setTimeout(function () {
    $('.zangdar__next').click(function () {
        run_waitMe($(this), 2, true);
    });
    $('.zangdar__submit').click(function () {
      
    });
}, 1000);
