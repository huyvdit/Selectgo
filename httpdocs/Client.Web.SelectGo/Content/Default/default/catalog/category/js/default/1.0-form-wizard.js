
/*----------------------------------------------
4. Multi-Step Form
----------------------------------------------*/

$(function () {

    'use strict';

    window.getStared = function () {
        var current_fs, next_fs, previous_fs;
        var left, opacity, scale;
        var animating;

        $('#msform').css('height', $('#msform').height());

        function next(button, group, show, hide) {

            $(document).on('click', button, function () {

                $(group + ' .form-control').each(function () {

                    var minlength = $(this).attr('minlength');
                    if (minlength == undefined) {
                        $(this).removeClass('invalid').addClass('valid');
                    }
                    else {
                        if ($(this).val() == null || $(this).val() == '') {

                            var value = 0;

                        } else {

                            var value = $(this).val().length;
                        }

                        if (Number(minlength) <= Number(value)) {

                            $(this).removeClass('invalid').addClass('valid');

                        } else {

                            $(this).removeClass('valid').addClass('invalid');
                        }
                    }
                   
                })

                let field = $(group).find('.form-control').length;
                let valid = $(group).find('.valid').length;

                if (field == valid) {

                    if (animating) return false;
                    animating = true;

                    current_fs = $(this).parents().eq(1);
                    next_fs = $(this).parents().eq(1).next();

                    $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active');

                    next_fs.show();

                    current_fs.animate({

                        opacity: 0

                    },
                        {
                            step: function (now, mx) {
                                now = 0;
                                scale = 1 - (1 - now) * 0.2;
                                left = (now * 50) + '%';
                                opacity = 1 - now;

                                current_fs.css({
                                    'transform': 'scale(' + scale + ')',
                                    'position': 'absolute'
                                })

                                next_fs.css({
                                    'left': left,
                                    'opacity': opacity
                                })
                            },
                            duration: 1,
                            complete: function () {
                                current_fs.hide();
                                animating = false;
                            },
                            easing: 'easeInOutBack'
                        });

                    $(hide).hide();
                    $(show).show();

                    if (button == '#next-2') {
                        $('#progressbar').addClass('complete');
                    }

                    if (button == '#next-3') {

                        $(button).parents().eq(5).find('.message').addClass('active');

                        // Here the form is sent.
                        $('#msform').submit();
                    }
                }
            })

        }

        next('#next-1', '#group-1', '#step-2, #text-2', '#step-1, #text-1');
        next('#next-2', '#group-2', '#step-3, #text-3', '#step-2, #text-2');
        next('#next-3', '#group-3', '#step-4', '#step-3');

        function prev(button, show, hide) {

            $(document).on('click', button, function () {

                if (animating) return false;
                animating = true;

                current_fs = $(this).parents().eq(1);
                previous_fs = $(this).parents().eq(1).prev();

                $('#progressbar li').eq($('fieldset').index(current_fs)).removeClass('active');

                previous_fs.show();
                current_fs.animate({

                    opacity: 0

                },{
                        step: function (now, mx) {
                        now = 0;
                            scale = 0.8 + (1 - now) * 0.2;
                            left = ((1 - now) * 50) + '%';
                            opacity = 1 - now;

                            current_fs.css({

                                'left': left
                            })

                            previous_fs.css({

                                'transform': 'scale(' + scale + ')',
                                'opacity': opacity
                            })
                        },
                        duration: 1,
                        complete: function () {

                            current_fs.hide();
                            animating = false;
                        },
                        easing: 'easeInOutBack'
                    })

                $(hide).hide();
                $(show).show();

                if (button == '#prev-3') {
                    $('#progressbar').removeClass('complete');
                }
            })
        }

        prev('#prev-2', '#step-1, #text-1', '#step-2, #text-2');
        prev('#prev-3', '#step-2, #text-2', '#step-3, #text-3');
    }
    
})

/*----------------------------------------------
5. Submission Parameters
----------------------------------------------*/
$(function () {

    'use strict';

    // Variable to hold request
    var request;

    // Bind to the submit event of our form
    $('#msform').submit(function (event) {

        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        // Abort any pending request
        if (request) {
            request.abort();
        }

        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find('input, select, button, textarea');

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request
        // Note: we disable elements AFTER the form data has been serialized
        // Disabled form elements will not be serialized
        $inputs.prop('disabled', true);

        // Fire off the request
        request = $.ajax({
            url: '', // Enter your back-end URL here
            type: 'post',
            data: serializedData
        })

        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR) {

            // Log a message to the console
            console.log('Hooray, it worked!');
        })

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown) {

            // Log the error to the console
            console.error(textStatus, errorThrown);
        })

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {

            // Reenable the inputs
            $inputs.prop('disabled', false);
        })
    })
})