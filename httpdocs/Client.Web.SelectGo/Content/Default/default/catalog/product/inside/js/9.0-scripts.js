jQuery(document).ready(function ($) {
    "use strict"

});

var Product = function () {


    var run = function () {
        
        (function (win) {
            "use strict";

            // DOM-ready auto-init of plugins.
            // Many plugins bind to an "enhance" event to init themselves on dom ready, or when new markup is inserted into the DOM
            // Use raw DOMContentLoaded instead of shoestring (may have issues in Android 2.3, exhibited by stack table)
            if (!("Tablesaw" in win)) {
                throw new Error("Tablesaw library not found.");
            }
            if (!("init" in Tablesaw)) {
                throw new Error("Your tablesaw-init.js is newer than the core Tablesaw version.");
            }

            Tablesaw.init();
        })(typeof window !== "undefined" ? window : this);

        if ($("pre").length > 0) {
            (function () {
                function htmlEscape(s) {
                    return s
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;').replace(
                            /&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g,
                            '<span class="operative">$&<\/span>');
                }

                // insert into PRE
                $("pre").innerHTML = htmlEscape($("pre").html());
                $("pre").addClass("prettyprint linenums");
            })();
        }

        if ($("pre.prettyprint").length > 0) {

            // syntax highlight
            PR.prettyPrint();

            var pre = document.getElementsByTagName('pre');
            for (var i = 0; i < pre.length; i++) {
                var button = document.createElement('button');
                button.className = 'copy-button';
                button.textContent = 'Copy';
                var s = pre[i].innerText;
                $(pre[i]).prop("id", "pre-" + i);
                //button.setAttribute("data-clipboard-text", s);
                button.setAttribute("data-clipboard-target", "#" + $(pre[i]).prop("id"));
                pre[i].appendChild(button);
                //pre[i].innerHTML +=button;

            }

            var clipboard = new Clipboard('.copy-button');

            clipboard.on('success', function (e) {
                console.info('Action:', e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);
                e.trigger.textContent = 'Code Copied';
                window.setTimeout(function () {
                    e.trigger.textContent = 'Copy';
                }, 2000);
                e.clearSelection();
            });

            clipboard.on('error', function (e) {
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
            });
        }
    }

    var runReadmore = function () {

        //click view more
        $(".list-chapter .view-more").click(function () { return $(".list-chapter ul li.less").addClass("active"), $(this).remove(), !1 });

        //$(document).off("click",".morelink"),$(document).on({click:function(){var e=$(this);return e.hasClass("less")?(e.removeClass("less"),e.html(t.moreText),e.prev().addClass("shortened")):(e.addClass("less"),e.html(t.lessText),e.prev().removeClass("shortened")),!1}}".morelink"),this.each(function(){var e=$(this);e.hasClass("shortened")||e.height()>t.maxHeight&&(e.addClass("shortened"),$('<a href="#" class="morelink">'+t.moreText+"</a>").insertAfter(e))})}
        $(".morelink").click(function (e) {
            e.preventDefault();
            if ($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html('Xem thêm <i class="fa fa-angle-right"></i>');
                $(this).prev().addClass("shortened");
            }
            else {
                $(this).addClass("less");
                $(this).prev().removeClass("shortened");
                $(this).html('<i class="fa fa-angle-left"></i> Thu gọn');
            }
            return false;
        });

        $(".visited-remove").click(function () {
            $(this).closest("li.clearfix").remove();
        });
    }

    return {
        init: function () {
            run();
            runReadmore();
        }
    };
}();

window.bindPlugin = window.Product;
