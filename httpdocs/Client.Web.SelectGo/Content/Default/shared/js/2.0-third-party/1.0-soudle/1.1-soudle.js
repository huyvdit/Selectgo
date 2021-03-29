if (typeof $ == 'undefined') {
    console.error('[Soudle.JS] Please, import jQuery file!');
} else if (!jQuery().niceScroll) {
    console.error('[Soudle.JS] Please, import NiceScroll file!');
}

(function ($, window, i) {
    $.fn.soudle = function (dev_options, toggle, onload) {
        var options = $.extend({
            // soudle type(inline or popup)
            type: 'popup',
            // soudle style (default, bwabwa, woomba, morskli, liskrus)
            style: 'default',
            // modal position (horizontal, vertical)
            position: 'middle center',
            // add overlay as a backdrop for the modal
            overlay: true,
            // enabled overlay click for close the  modal
            overlayclose: true,
            // animate.css class when modal is appear
            anim: 'rubberBand',
            // animate.css class when modal is disappear
            animout: 'fadeOutUp',
            // multiple
            multiple: false,
            // form title
            title: 'Subscribe',
            // form paragraph
            paragraph: 'Be the first to know by subscribing to the email to us. We will send an update to the email you registered.',
            // add something to the footer, you can write it in HTML format
            footer: 'We promise not to spam',
            // image needed for style 'bwabwa', 'morskli' and 'liskrus'
            image: '',
            // action for form when submit
            action: '#',
            method: 'post',
            // ajax form submit, you don't need to add option for 'url' and 'type' because it will be automatically added by `action` and `method`
            ajax: false,
            // firstname field visibility
            firstname: true,
            // firstname placeholder text
            firstnametext: "First Name",
            // firstname field name
            firstnameinput: "firstname",
            firstnamerequired: true,
            // lastname field visibility
            lastname: true,
            // lastname placeholder text
            lastnametext: "Last Name",
            // lastname input name
            lastnameinput: "lastname",
            lastnamerequired: true,
            // email placeholder text
            emailtext: "Your Email",
            // email input text
            emailinput: "email",
            emailrequired: true,
            // text for button
            btntext: 'Subscribe',
            // timeout for onload option
            delay: 1000,
            demo: false,
            ready: function () { },
            close: function () { },
            closed: function () { },
            submit: function () { },
            submitdone: function () { },
            submitcomplete: function () { },
            submitfail: function () { },
            click: function () { },
            show: function () { },
            shown: function () { },
            already: function () { }
        }, dev_options);

        $(this).each(function () {
            i++;

            var $id = "soudle-" + i,
                $this = $(this);

            if (typeof $this.data("soudle") == 'object') {
                options = $.extend(options, dev_options, $this.data("soudle"));
            }

            var $template = {
                overlay: function () {
                    var tpl = "<div class='soudle-overlay'>";
                    tpl += "</div>";

                    return tpl;
                },
                popup: function (template) {
                    var position = options.position.split(" "),
                        posv = position[0],
                        posh = position[1];
                    var id = ' id="' + $id + '"';
                    if (options.overlay == true && options.type !== 'popup') {
                        id = "";
                    }
                    var tpl = "";
                    if (options.overlay == true) {
                        tpl += "<div class='soudle-popup-wrapper'" + id + ">";
                    }
                    tpl += "<div class='soudle-popup-wrapper-position soudle-position-" + posv + "-" + posh + (options.overlay == false ? ' soudle-no-overlay' : '') + "'" + (options.overlay == false ? id : '') + ">";
                    tpl += template;
                    tpl += "</div>";
                    if (options.overlay == true) {
                        tpl += "</div>";
                    }
                    return tpl;
                },
                wrapper: function (template) {
                    var id = ' id="' + $id + '"';
                    if (options.overlay == true && options.type == 'popup') {
                        id = "";
                    }
                    var tpl = "<div class='soudle soudle-" + options.style + " soudle-" + options.type + "'" + id + ">";
                    if (options.type !== 'inline') {
                        tpl += "<div class='soudle-close'></div>";
                    }
                    tpl += "<div class='soudle-loading'>";
                    tpl += "</div>";
                    tpl += "<div class='soudle-wrapper'>";
                    tpl += "<div class='soudle-inner'>";
                    tpl += template;
                    tpl += "</div>";
                    tpl += "</div>";
                    tpl += "</div>";
                    return tpl;
                },
                input: function (isflex) {
                    var tpl = "";
                    if (isflex !== false) {
                        if (options.firstname == true || options.lastname == true) {
                            tpl += "<div class='soudle-form-group soudle-flex'>";
                            if (options.firstname == true) {
                                tpl += "<div class='soudle-input-wrap'>";
                                tpl += "<input type='text' class='soudle-input' name='" + options.firstnameinput + "'" + (options.firstnamerequired == true ? 'required' : '') + " placeholder='" + options.firstnametext + "'>";
                                tpl += "</div>";
                            }
                            if (options.lastname == true) {
                                tpl += "<div class='soudle-input-wrap'>";
                                tpl += "<input type='text' class='soudle-input' name='" + options.lastnameinput + "'" + (options.lastnamerequired == true ? 'required' : '') + " placeholder='" + options.lastnametext + "'>";
                                tpl += "</div>";
                            }
                            tpl += "</div>";
                        }
                    } else {
                        if (options.firstname == true) {
                            tpl += "<div class='soudle-form-group'>";
                            tpl += "<div class='soudle-input-wrap'>";
                            tpl += "<input type='text' class='soudle-input' name='" + options.firstnameinput + "'" + (options.firstnamerequired == true ? 'required' : '') + " placeholder='" + options.firstnametext + "'>";
                            tpl += "</div>";
                            tpl += "</div>";
                        }
                        if (options.lastname == true) {
                            tpl += "<div class='soudle-form-group'>";
                            tpl += "<div class='soudle-input-wrap'>";
                            tpl += "<input type='text' class='soudle-input' name='" + options.lastnameinput + "'" + (options.lastnamerequired == true ? 'required' : '') + " placeholder='" + options.lastnametext + "'>";
                            tpl += "</div>";
                            tpl += "</div>";
                        }
                    }
                    tpl += "<div class='soudle-form-group'>";
                    if (isflex !== false) {
                        tpl += "<button class='soudle-button' tabindex='4'>" + options.btntext + "</button>";
                    }
                    tpl += "<div class='soudle-input-wrap'>";
                    tpl += "<input type='email' class='soudle-input' name='" + options.emailinput + "'" + (options.emailrequired == true ? 'required' : '') + " placeholder='" + options.emailtext + "'>";
                    tpl += "</div>";
                    tpl += "</div>";
                    if (isflex == false) {
                        tpl += "<div class='soudle-form-group'>";
                        tpl += "<button class='soudle-button soudle-submit' tabindex='4'>" + options.btntext + "</button>";
                        tpl += "</div>";
                    }

                    return tpl;
                },
                default: function () {
                    var tpl = "<div class='soudle-box'>";
                    tpl += "<h2 class='soudle-title'>" + options.title + "</h2>";
                    tpl += "<p class='soudle-paragraph'>" + options.paragraph + "</p>";
                    tpl += "<form method='" + options.method + "' class='soudle-form' action='" + options.action + "'>";
                    tpl += $template.input();
                    tpl += "</form>";
                    tpl += "<footer class='soudle-footer'>";
                    tpl += options.footer;
                    tpl += "</footer>";
                    tpl += "</div>";
                    return tpl;
                },
                bwabwa: function () {
                    var tpl = "<div class='soudle-box soudle-box-bg' style='background-image:url(" + options.image + ")'>";
                    tpl += "</div>";
                    tpl += "<div class='soudle-box'>";
                    tpl += "<h2 class='soudle-title'>" + options.title + "</h2>";
                    tpl += "<p class='soudle-paragraph'>" + options.paragraph + "</p>";
                    tpl += "<form method='" + options.method + "' class='soudle-form' action='" + options.action + "'>";
                    tpl += $template.input();
                    tpl += "</form>";
                    tpl += "<footer class='soudle-footer'>";
                    tpl += options.footer;
                    tpl += "</footer>";
                    tpl += "</div>";
                    return tpl;
                },
                woomba: function () {
                    var tpl = "<div class='soudle-box'>";
                    tpl += "<h2 class='soudle-title'>" + options.title + "</h2>";
                    tpl += "<p class='soudle-paragraph'>" + options.paragraph + "</p>";
                    tpl += "<form method='" + options.method + "' class='soudle-form' action='" + options.action + "'>";
                    tpl += $template.input();
                    tpl += "</form>";
                    tpl += "<footer class='soudle-footer'>";
                    tpl += options.footer;
                    tpl += "</footer>";
                    tpl += "</div>";
                    return tpl;
                },
                morskli: function () {
                    var tpl = "<div class='soudle-box soudle-box-bg' style='background-image:url(" + options.image + ")'>";
                    tpl += "</div>";
                    tpl += "<div class='soudle-box'>";
                    tpl += "<h2 class='soudle-title'>" + options.title + "</h2>";
                    tpl += "<p class='soudle-paragraph'>" + options.paragraph + "</p>";
                    tpl += "<form method='" + options.method + "' class='soudle-form' action='" + options.action + "'>";
                    tpl += $template.input(false);
                    tpl += "</form>";
                    tpl += "<footer class='soudle-footer'>";
                    tpl += options.footer;
                    tpl += "</footer>";
                    tpl += "</div>";
                    return tpl;
                },
                liskrus: function () {
                    var tpl = "<div class='soudle-box soudle-box-bg' style='background-image:url(" + options.image + ")'>";
                    tpl += "</div>";
                    tpl += "<div class='soudle-box'>";
                    tpl += "<h2 class='soudle-title'>" + options.title + "</h2>";
                    tpl += "<p class='soudle-paragraph'>" + options.paragraph + "</p>";
                    tpl += "<form method='" + options.method + "' class='soudle-form' action='" + options.action + "'>";
                    tpl += $template.input(false);
                    tpl += "</form>";
                    tpl += "<footer class='soudle-footer'>";
                    tpl += options.footer;
                    tpl += "</footer>";
                    tpl += "</div>";
                    return tpl;
                }
            },
                $template_used,
                $overlay = {
                    show: function (cal) {
                        $("body").prepend($template.overlay());
                        $(".soudle-overlay").animate({
                            opacity: .8
                        }, function () {
                            cal.call();
                        });
                    },
                    hide: function (cal) {
                        $(".soudle-overlay").animate({
                            opacity: 0
                        }, function () {
                            cal.call();
                            $(".soudle-overlay").remove();
                            if (options.overlay == true) {
                                $("body").css({
                                    overflow: 'initial'
                                })
                            }
                        });
                    }
                },
                $mysoudle = {
                    show: function () {
                        if (options.type == 'inline') {
                            $this.html($template_used);
                        } else if (options.type == 'popup') {
                            if ($(".soudle-popup").length && options.multiple == false) {
                                options.already.call($this, $(".soudle-popup"));
                                $(".soudle-popup").addClass("shake animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                    $(this).removeClass("shake animated");
                                });
                            } else {
                                if (options.overlay == true) {
                                    $("body").css({
                                        overflow: 'hidden'
                                    });
                                }
                                $("body").prepend($template.popup($template_used));

                                options.show.call($this, $("#" + $id));

                                if (options.overlay == true) {
                                    $overlay.show(function () {
                                        $("#" + $id).show();
                                        $("#" + $id).find(".soudle-popup").addClass(options.anim + " animated");
                                    });
                                } else {
                                    $("#" + $id).show();
                                    $("#" + $id).find(".soudle-popup").addClass(options.anim + " animated");
                                }

                                var sel = ".soudle-popup-wrapper";
                                if (options.overlay == false) {
                                    sel = ".soudle-close";
                                }

                                $(sel).on("click", function (e) {
                                    if ((options.overlayclose == true && $(e.target).hasClass("soudle-popup-wrapper")) || $(e.target).hasClass("soudle-close")) {
                                        $mysoudle.hide();
                                    }
                                });

                                $("#" + $id).find(".soudle .soudle-wrapper").css('maxHeight', ($(window).outerHeight() - 20))
                                $(window).resize(function () {
                                    $("#" + $id).find(".soudle .soudle-wrapper").css('maxHeight', ($(window).outerHeight() - 20))
                                });
                                $("#" + $id).find(".soudle").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                    options.shown.call($this, $("#" + $id));
                                    $("#" + $id).find(".soudle .soudle-wrapper").niceScroll();
                                });
                            }

                        }

                        if (options.demo == true) {
                            $("#" + $id + " form").submit(function () {
                                alert('This is just a demo!');
                                return false;
                            });
                        } else {
                            if (typeof options.ajax == 'object') {
                                $("#" + $id + " form").submit(function () {
                                    options.submit.call($this, $("#" + $id));
                                    var ajaxReq = options.ajax;
                                    ajaxReq['url'] = options.action;
                                    ajaxReq['type'] = options.method;
                                    ajaxReq['data'] = $(this).serialize();
                                    var ajax = $.ajax(ajaxReq);
                                    ajax.always(function (jqXHR, textStatus, errorThrown) {
                                        options.submitdone.call($this, $("#" + $id), jqXHR, textStatus, errorThrown);
                                    });
                                    ajax.done(function (data, textStatus, jqXHR) {
                                        options.submitcomplete.call($this, $("#" + $id), data, textStatus, jqXHR);
                                    });
                                    ajax.fail(function (jqXHR, textStatus, errorThrown) {
                                        options.submitfail.call($this, $("#" + $id), jqXHR, textStatus, errorThrown);
                                    });
                                    return false;
                                });
                            } else {
                                $("#" + $id + " form").submit(function () {
                                    options.submit.call($this, $("#" + $id));
                                });
                            }
                        }
                    },
                    hide: function () {
                        options.close.call($this, $("#" + $id));
                        $("#" + $id).find(".soudle-popup").addClass(options.animout + " animated");
                        $overlay.hide(function () {
                            options.closed.call($this, $("#" + $id));
                            $("#" + $id).remove();
                        });
                        if (options.overlay == false) {
                            $("#" + $id).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                $(this).remove();
                            });
                        }
                    }
                };

            if (options.style == 'default') {
                $template_used = $template.wrapper($template.default());
            } else if (options.style == 'bwabwa') {
                $template_used = $template.wrapper($template.bwabwa());
            } else if (options.style == 'woomba') {
                $template_used = $template.wrapper($template.woomba());
            } else if (options.style == 'morskli') {
                $template_used = $template.wrapper($template.morskli());
            } else if (options.style == 'liskrus') {
                $template_used = $template.wrapper($template.liskrus());
            } else {
                console.error("[Soudle.JS] Style couldn't be found!")
            }

            if (onload == true) {
                setTimeout(function () {
                    $mysoudle.show();
                }, options.delay);
            }

            if (options.type == 'inline') {
                $mysoudle.show();
                options.ready.call($this, $("#" + $id));
            } else if (options.type == 'popup') {
                if (onload == true) {
                    if (toggle) {
                        $(toggle).on("click", function () {
                            options.click.call($this, $("#" + $id));
                            $mysoudle.show();
                            return false;
                        });
                    }
                } else {
                    $this.on("click", function () {
                        options.click.call($this, $("#" + $id));
                        $mysoudle.show();
                        return false;
                    });
                }

                options.ready.call($this);
            } else {
                console.error('[Soudle.JS] Type `' + options.type + '` isn\'t recognized. Please, use type of `inline`, `popup` or see the documentation.');
            }
        });
    }

    $.soudle = function (options, selector) {
        if (!options) options = {};
        options['type'] = "popup";
        $(document).soudle(options, selector, true);
    }

    $.soudleLoading = function (target, status) {
        if (status == true) {
            target.find(".soudle-loading").fadeIn();
        } else {
            target.find(".soudle-loading").fadeOut();
        }
    }

    $.soudleClose = function (target) {
        target.find(".soudle-close").click();
    }

})(jQuery, this, 0);


$.each($(".letter-subscribe"), function (k, v) {

    $(v).soudle({
        type: 'popup', position: 'middle center', overlay: true,
        action: '/widgets/news-letter-subscription/',
        method: 'post',
        emailtext: "Your e-mail address",
        firstname: false,
        lastname: false,
        style: $(v).attr("data-style") || 'morskli',
        image: '/assets/images/background/newsletter.jpg',
        title: 'Subscribe',
        paragraph: 'Be the first to know by subscribing to the email to us. We will send an update to the email you registered.',
        footer: "We'll never share your email with anyone else.",
        ajax: {},
        submit: function (mysoudle) {
            $.soudleLoading(mysoudle, true);
        },
        submitdone: function (mysoudle, data) {
            console.log(data);
            $.soudleLoading(mysoudle, false);

            if (data.Status == "OK") {
                $("#notify-template").html("<mark class='notify'>" + data.Msg + "</mark>");
                $.soudleClose(mysoudle);
            }
            else {
                $("#notify-template").html("<mark class='notify'>" + data.Msg + "</mark>");
            }
        },
        submitfail: function (mysoudle, xhr) {
            var responseText = JSON.parse(xhr.responseText).data;

            if (xhr.status == 422) {
                if (typeof responseText.firstname !== 'undefined') {
                    responseText = responseText.firstname[0];
                } else if (typeof responseText.lastname !== 'undefined') {
                    responseText = responseText.lastname[0];
                } else if (typeof responseText.email !== 'undefined') {
                    responseText = responseText.email[0];
                }
                alert(responseText);
            }
        },
        ready: function (mysoudle) {
            //mysoudle.addClass("my-subscribe");
        }
    })
});