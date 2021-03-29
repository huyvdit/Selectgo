$(document).ready(function ($) {
    var form = $("form[name='checkout-step2']");
    form.validate({
        rules: {
            Order_Customer_MainAddress_FirstName: {
                required: true,
            },
            Order_Customer_MainAddress_PhoneNumber: {
                required: true,
            }
        },
        messages: {
            Order_Customer_MainAddress_FirstName: "Please enter your firstname",
            Order_Customer_MainAddress_PhoneNumber: "Please enter your phone number",
           
        },        onsubmit: true,
        ignore: ".ignore, :hidden",
        
    })
    //$("form[name='checkout-step2']").submit(function (event) {
    //        if (!form.valid()) {
    //            console.log("form is invalid");
    //            return false;
    //        }
    //        return false;
    //        event.preventDefault();
    //    });

    $('#login-btn').click(function () {
        $(this).siblings('input[type="text"]').removeAttr('required');
    });


});
