
/**
 * Tuna Signup Form Wizard
 * @type Javascript Class
 */

var lunaWizard = {
    stepCount: 0,
    /**
     * Resize for Responsive
     */
    setResponsive: function () {
        var self = this;
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        windowHeight = windowHeight > 360 ? windowHeight : 360;
        var lunaContainer = $(".luna-signup-container");
        var lunaLeft = $(".luna-signup-left");
        var lunaLeftOverlay = $(".luna-signup-left-overlay");

        if (windowWidth >= 768) {
            lunaContainer.add(lunaLeft).add(lunaLeftOverlay).innerHeight(windowHeight);
        } else {
            lunaContainer.add(lunaLeft).add(lunaLeftOverlay).css("height", "auto");
        }
        lunaLeftOverlay.width(($(window).width() - $(".container").width()) / 2 + 10);
    },
    /**
     * Change Step
     * @param int currentStep
     * @param int nextStep
     * @returns {void|Boolean}
     */
    changeStep: function (currentStep, nextStep) {
        var self = this;

        $('html,body').animate({ scrollTop: 0 }, 'slow');

        if (nextStep <= 0 || nextStep > this.stepCount) {
            return false;
        }

        var form = $("form[name='signupForm']");
        form.validate({
            rules: {
                Email: {
                    required: true,
                    email: true
                },
                ConfirmPassword: {
                    equalTo: "#Password"
                }
            },
            messages: {
                //firstname: "Vui lòng nhập tên của bạn",
                //lastname: "Vui lòng nhập Họ & đệm của bạn",
                //password: {
                //    required: "Vui lòng cung cấp mật khẩu",
                //},
                //confirm_password: {
                //    required: "Vui lòng cung cấp mật khẩu",
                //    equalTo: "Làm ơn hãy nhập lại mật khẩu giống như ở bên"
                //},
                //email: "Vui lòng nhập một địa chỉ email hợp lệ",
                firstname: "Please enter your name",
                lastname: "Please enter your First & Last name",
                password: {
                    required: "Please provide a password",
                },
                confirm_password: {
                    required: "Please provide a password",
                    equalTo: "Please enter the same password as above"
                },
                email: "Please enter a valid email address",
             
            },            onsubmit: false,
            ignore: ".ignore, :hidden",
            errorPlacement: function (error, element) {
                var formGroup = element.parents(".form-group");
                formGroup.find(".errorIcon").remove();
                formGroup.append('<span class="errorIcon"><i class="icon icon-info"></i></span>');
                element.parents(".form-group").find(".errorIcon").show().find("i").attr("title", error.text()).tooltip({ container: 'body' });
            }
        })



        //Change Step
        if (nextStep > currentStep) {
            if (!form.valid()) {
                console.log("form is invalid");
                swal({
                    //title: "Bạn phải nhập đủ thông tin",
                    //text: "Trước khi chuyển sang bước tiếp hoặc chọn bỏ qua bước này.",
                    //type: "warning",
                    //confirmButtonClass: "btn-danger",
                    //confirmButtonText: "Vâng, Tôi hiểu"

                    title: "You must enter enough information",
                    text: "Before moving on to the next step or choose to skip this step.",
                    type: "warning",
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Yes, I understand"
                });
                return;
            }
           
            $(".step-active").removeClass("step-active").addClass("step-hide");
        } else {
            $(".step-active").removeClass("step-active");
        }


        var nextStepEl = $(".step[data-step-id='" + nextStep + "']");
        nextStepEl.removeClass("step-hide").addClass("step-active");

        if (nextStepEl.find('input[type="text"]').length > 0) {
            //nextStepEl.find('input[type="text"]')[0].focus();
            //nextStepEl.find('input[type="text"]').parent().find("label").addClass("active");
        }
       

        var stepCountsEl = $(".steps-count");

        if (nextStep == 1) {
            window.setTimeout(function () {
                $("#UserName").focus();
                $("#UserName").parent().find("label.formLabel").addClass("active");
            }, 500);
        }
        if (nextStep == 2) {
            window.setTimeout(function () {
                $("#FirstName").focus();
                $("#FirstName").parent().find("label.formLabel").addClass("active");
            }, 500);
        }

        if (nextStep === self.stepCount) {
            stepCountsEl.html("");
            $(".button-container").fadeOut();
            $(".toNext").fadeOut();
            var stepConfirm = $(".step-confirm");

            form.find("input[type='text'],input[type='email'],input[type='tel'], textarea").each(function () {
                stepConfirm.find("." + $(this).attr("name")).text($(this).val());
            });

            form.find("select").each(function () {
                stepConfirm.find("." + $(this).attr("name")).text($(this).find("option:selected").text());
            });

            form.find("input[type='radio']").each(function () {
                if ($(this).prop("checked")) {
                    stepConfirm.find("." + $(this).attr("name")).text($(this).val());
                }
            });

            /*
             var hobbies = $("input[name='tn_hobbies[]']:checked").map(function () {
             return this.value;
             }).get();
             */
        } else {
            $(".button-container").fadeIn();
            $(".toNext").fadeIn();
        }



        //Current Step Number update
        stepCountsEl.find("span.step-current").text(nextStep);
        $(".dots span").removeClass("selected");
        $(".dots li:nth-child(" + nextStep + ") span").addClass("selected");

        //Hide prevButton if we are in first step
        var prevStepEl = $(".prevStep");
        if (nextStep === 1) {
            prevStepEl.hide();
        } else {
            prevStepEl.css("display", "inline-block");
        }
    },
    /**
     * Show Validation Message
     * @param HtmlElement el
     * @returns void
     */
    setInputError: function (el) {
        el.addClass("input-error");
        el.parents(".step").find(".help-info").hide();
        el.parents(".step").find(".help-error").show();
    },
  
    /**
     * Executes Signup Wizard
     * @returns void
     */
    start: function () {
        var self = this;

        //Jquery Uniform Plugin
        $(".luna-signup-container input[type='checkbox'],.luna-signup-container input[type='radio'], .select").uniform();

        //Jquery Mask PluginsetResponsive
        //$('.luna-signup-container input[name="PhoneNumber"],.luna-signup-container input[name="PhoneNumber"]').mask('000 000 00 00');

      

        //Tooltip
        $("[data-toggle='tooltip']").tooltip();

        // Focuses on name input, when page loaded
        window.setTimeout(function () {
            $("#UserName").focus();
            $("#UserName").parent().find("label").addClass("active");

            $.each($("form input"), function (k, v) {
                //console.log($(v).attr("name"), $(v).val());
                //if ($(v).val() != "" && $(v).val() != undefined) {
                //    $(v).parent().find("label").addClass("active");
                //}
            });
        }, 500);

        // Responsive
        self.setResponsive();
            
        $(window).resize(function () {
            self.setResponsive();
        });

        // Steps Count
        self.stepCount = $(".luna-steps .step").length;
        $(".luna-steps .step").each(function () {
            $(".dots").append("<li><span></span></li>")
            
        });
        $(".step-count").text(self.stepCount - 1);
        $(".dots span").first().addClass("selected");

        // Next Step
        $(".nextStep").on("click", function () {
            var currentStep = $(".step-active").attr("data-step-id")
            var nextStep = parseFloat(currentStep) + 1;
            self.changeStep(currentStep, nextStep);
        });

        // Prev Step
        $(".prevStep").on("click", function () {
            var currentStep = $(".step-active").attr("data-step-id")
            var nextStep = parseFloat(currentStep) - 1;
            self.changeStep(currentStep, nextStep);
        });

        // Confirm Details - Show Input
        var stepConfirm = $(".step-confirm");
        stepConfirm.find(".input-container a.editInput").on("click", function () {
            $(this).parent().find("input").focus();
        });

        // Confirm Details - Show Password
        stepConfirm.find(".input-container a.showPass").on("mousedown", function () {
            $(this).parent().find("input").attr("type", "text");
        }).mouseup(function () {
            $(this).parent().find("input").attr("type", "password");
        });

        stepConfirm.find(".input-container input").on("focus", function () {
            $(this).parent().find("a").hide();
        });

        stepConfirm.find(".input-container input").on("focusout", function () {
            if (!$(this).hasClass("confirm-input-error")) {
                $(this).parent().find("a").show();
            }
        })

       
        //Press Enter and go to nextStep
        $(".step input").not(".step-confirm input").on("keypress", function (e) {
            if (e.keyCode === 13) {
                $(".button-container .nextStep").click();
            }
        });

        var signupForm = $("form[name='signupForm']");
        //Finish Button
        $(".finishBtn").on("click", function () {
            signupForm.submit();
        })

        // Form Submit
        signupForm.on("submit", function (e) {

            e.preventDefault();
            var formdata = $(this).serialize();
            if (!$("input[name='agreement']").prop("checked")) {
                swal({
                    title: "Cảnh báo",
                    text: "Bạn phải đồng ý với các điều khoản và điều kiện của chúng tôi.",
                    type: "warning",
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Vâng, Tôi hiểu"
                });
                return;
            }

            //if ($("input[name='VerificationCode']").val() == "") {
            //    swal({
            //        title: "Cảnh báo",
            //        text: "Bạn phải nhập mã {{CAPCHA}} để đảm bảo bạn không phải là robots.",
            //        type: "warning",
            //        confirmButtonClass: "btn-danger",
            //        confirmButtonText: "Vâng, Tôi hiểu"
            //    });
            //    return;
            //} else {
            //    swal({
            //        title: null,
            //        text: "<img class='luna_loading' src='../../../../images/shared/all/loading.svg'/> Đang kiểm tra...",
            //        html: true,
            //        showConfirmButton: false
            //    });

            //    $.post("/account/registerVerification", formdata, function (result) {
            //        if (result.Status == "OK") {
                        
            //            swal({
            //                title: null,
            //                text: "<img class='luna_loading' src='../../../../images/shared/all/loading.svg'/> Đang thực hiện...",
            //                html: true,
            //                showConfirmButton: false
            //            });

            //            //Send form to php file
            //            $.post("/en/account/register", formdata, function (result) {
            //                if (result.Status == "OK") {
            //                    swal({
            //                        title: "Đăng ký thành công",
            //                        text: "Chúc mừng, bạn đang đăng ký thành công! Vui lòng đợi chúng tôi chuyển hướng về trang chủ...",
            //                        type: "success",
            //                        confirmButtonText: "Đồng ý"
            //                    });
            //                    setTimeout(function () {
            //                        window.location.href = "/";
            //                    }, 1200)
            //                } else {
            //                    swal({
            //                        title: "Lỗi",
            //                        text: result.msg,
            //                        type: "error",
            //                        confirmButtonText: "Thử lại"
            //                    });
            //                }
            //            }, 'json');

            //        } else {
            //            $(".captcha-text").val("");
            //            $(".captcha-reloader").trigger("click");
            //            swal({
            //                title: "Error!",
            //                text: result.msg,
            //                type: "error",
            //                confirmButtonText: "OK"
            //            });
                      
            //        }
            //    }, 'json');
               
            //}

            //if (!$("input[name='agreement']").prop("checked")) {
            //    swal({
            //        title: "Cảnh báo",
            //        text: "Bạn phải đồng ý với các điều khoản và điều kiện của chúng tôi.",
            //        type: "warning",
            //        confirmButtonClass: "btn-danger",
            //        confirmButtonText: "Vâng, Tôi hiểu"
            //    });
            //    return;
            //}

            if ($("input[name='VerificationCode']").val() == "") {
                swal({
                    title: "Warning",
                    text: "You must enter the code {{ CAPCHA }} to make sure you are not a robot.",
                    type: "warning",
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Yes, I understand"
                });
                return;
            } else {
                swal({
                    title: null,
                    text: "<img class='luna_loading' src='../../../../images/shared/all/loading.svg'/> Checking in...",
                    html: true,
                    showConfirmButton: false
                });

                $.post("/account/registerVerification", formdata, function (result) {
                    if (result.Status == "OK") {

                        swal({
                            title: null,
                            text: "<img class='luna_loading' src='../../../../images/shared/all/loading.svg'/> Processing...",
                            html: true,
                            showConfirmButton: false
                        });

                        //Send form to php file
                        $.post("/en/account/register", formdata, function (result) {
                            if (result.Status == "OK") {
                                swal({
                                    title: "Sign Up Success",
                                    text: "Congratulations, you are signing up successfully! Please wait for us to redirect back to the homepage...",
                                    type: "success",
                                    confirmButtonText: "Agree"
                                });
                                setTimeout(function () {
                                    window.location.href = "/";
                                }, 1200)
                            } else {
                                swal({
                                    title: "Error",
                                    text: result.msg,
                                    type: "error",
                                    confirmButtonText: "Try again later!"
                                });
                            }
                        }, 'json');

                    } else {
                        $(".captcha-text").val("");
                        $(".captcha-reloader").trigger("click");
                        swal({
                            title: "Error!",
                            text: result.msg,
                            type: "error",
                            confirmButtonText: "OK"
                        });

                    }
                }, 'json');

            }

        });
    },
}


/**
 * Material Input 
 * @returns object
 */
$.fn.materialInput = function () {

    var label;
    var el = this;

    el.find('input.formInput').focus(function (e) {
        el.setLabel(e.target);
        el.checkFocused(e.target);
    });

    el.find('input.formInput').focusout(function (e) {
        el.setLabel(e.target);
        el.checkUnFocused(e.target);
    });

    el.find('input.formInput').keypress(function (e) {
        $(this).parents(".form-group").find(".errorIcon").hide();
    });

    this.setLabel = function (target) {
        if ($('label[for=' + target.id + ']').length > 0) {
            label = el.find('label[for=' + target.id + ']');
        }
        
    };

    this.getLabel = function () {
        return label;
    };

    this.checkFocused = function (target) {
        el.getLabel().addClass('active', '');
        $(target).removeClass("input-error");
    };

    this.checkUnFocused = function (target) {
        if ($(target).val().length === 0) {
            el.getLabel().removeClass('active');
        }
    };
};


$(document).ready(function () {

    /**
     * Page Loader
     * If you remove loader, you can delete .luna-loader-container element from Html, and delete this two rows.
     */
    $(".luna-loader-container").fadeOut("slow");
    $(".luna-signup-container").show();


    /**
     * Material Inputs
     * Makes, inputs in selected element material design.
     */
    $(".luna-steps").materialInput();

    $('.cascadingDropDown').ssdCascadingDropDown({
        nonFinalCallback: function (trigger, props, data, self) {

            trigger.closest('form')
                    .find('input[type="submit"]')
                    .attr('disabled', true);

        },
        finalCallback: function (trigger, props, data) {

            if (props.isValueEmpty()) {
                trigger.closest('form')
                        .find('input[type="submit"]')
                        .attr('disabled', true);
            } else {
                trigger.closest('form')
                        .find('input[type="submit"]')
                        .attr('disabled', false);
            }

        }
    });   setTimeout(function() {
       $("#countryId").val(1).trigger("change");
   },1200)
    /**
     * Tuna Signup Form Wizard
     * Let's Start
     */
    lunaWizard.start();

    if (screen.width > 1024) {
        $('.luna-signup-right').addClass("foo foo--inside");
        document.querySelector('.luna-signup-right').fakeScroll({
            track: "smooth"
        });
    }
    

});

