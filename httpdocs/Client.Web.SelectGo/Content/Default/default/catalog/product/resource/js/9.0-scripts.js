
$("#as-toc").toc({ content: "#as-article", headings: "h2,h3,h4,h5" });
$("#as-toc-toggle").click(function (e) {
    e.preventDefault();
    var self = $(this);
    $("#as-toc").toggleClass("hide", function () {
        
    });
    if ($("#as-toc").hasClass("hide")) {
        self.html("show");
        $(".table-of-contents").css("width", "20%");
        $(".short-description").css("width", "80%");
    } else {
        self.html("hide");
        $(".table-of-contents").css("width", "60%");
        $(".short-description").css("width", "40%");
    }
});

setTimeout(function () {
    const content = document.querySelector('.article-content');
    const insertTarget = document.querySelector('.page__header .container');
    scrollnav.init(content, {
        debug: false,
        insertTarget: insertTarget,
        insertLocation: 'append'
    });

    $(function () {
        $('.item-top').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        });
    });

    $('#additional-information').linkify({
        target: "_blank"
    });

}, 3200);



$(function () {
    //$('#as-article a').miniPreview({ prefetch: 'pageload' });
    $('#as-article a').each(function () {
        if (location.hostname === this.hostname || !this.hostname.length) {
            $(this).addClass('link-local');
        } else {
            $(this).addClass('link-external').attr("target","_blank");
        }
    });

    $('#as-article a.link-external').miniPreview({ prefetch: 'parenthover' });
    //$('#as-article a').miniPreview({ prefetch: 'none' });
});


(function () {

    [].slice.call(document.querySelectorAll('.tabs')).forEach(function (el) {
        new CBPFWTabs(el);
    });

})();

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

if ($('.gallery_top_album').length > 0) {
    $('.gallery_top_album').lightGallery({
        selector: '.swiper-slide',
        thumbnail: false,
        thumbWidth: 80,
        thumbContHeight: 70,
        animateThumb: true,
        showThumbByDefault: true,
        getCaptionFromTitleOrAlt: true,
        fullScreen: true,
        download: false
    });
    // js xu ly activbe slide

    var gallery_thumbs_album = new Swiper('.gallery_thumbs_album', {
        spaceBetween: 5,
        slidesPerView: 5,
        loop: false,
        freeMode: true,
        loopedSlides: 5,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var gallery_top_album = new Swiper('.gallery_top_album', {
        spaceBetween: 0,
        loop: true,
        loopedSlides: 1,
        navigation: {
            nextEl: '.album-btn-next',
            prevEl: '.album-btn-prev',
        },
        thumbs: {
            swiper: gallery_thumbs_album,
        },
    });
    // js xu ly activbe slide
    $('.gallery_thumbs_album .swiper-slide').each(function (index) {
        $(this).click(function () {
            $('.gallery_thumbs_album .swiper-slide').removeClass("is-active");
            $(this).addClass("is-active");
        });
    });
}


if ($(".myTooltip").length > 0) {
    new Drooltip({
        "element": ".myTooltip",
        "trigger": "hover",
        "position": "right",
        "background": "#fff",
        "max-width": "700px",
        "color": "#000",
        "animation": "bounce",
        "content": null,
        "callback": null
    });
}

/**
 * Called on page load.
 * This page displays some code styled using theme specified.
 */
window.addEventListener('load', function (event) {

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
        setTimeout(function () {
           
            //var instances = $("pre ol.linenums").overlayScrollbars({ className: "os-theme-round-light" });
            //$.each(instances, function (index, instance) {
            //    //check for validity
            //    if (instance !== undefined) {
            //        //do domething with the instance
            //    }
            //});
        }, 3200);
    }
    
    
}, false);

window.onload = function () {
   
    $('[data-toggle="download-as"]').jConfirm({
        question: 'Do you want save article as:',
        btns: [
            {
                text: ' Word',
                event: 'export-word',
                data: {
                    some_data_attr: 1
                },
                class: 'fas fa-file-word jc-button-highlight'
            },
            {
                text: ' Pdf',
                event: 'export-pdf',
                data: {
                    some_data_attr: 2
                },
                class: 'fas fa-file-pdf jc-button-highlight'
            }
        ]
    }).on('export-word', function (e, data) {
        var name = window.location.pathname.replace("/", "").replace(".html", "");
        $("#as-article").wordExport(name);

    }).on('export-pdf', function (e, data) {
        window.showNotify("error", "The function is under construction, please try again later!");
    });
    //var height = 1024; // $("#as-article").height() - 250;
    //$('#as-article').moreContent({
    //    useCss: true,
    //    shadow: true,
    //    easing:'easeOutBounce',
    //    speed: 250,
    //    height: height,
    //    textClose: 'Show more [...] ',
    //    textOpen: '[-] Less',
    //    tpl: {
    //        btn: '<a class="btn btn-light-primary" type="button"></a>',
    //        shadow: '<div class="mrc-shadow"></div>',
    //    }
    //});

    
    $(".as-tags ul").prettyTag({
        randomColor: true,
        tagicon: true,

    });

}; //jQuery

$(function () {

    $('.article-content').estimatedReadingTime({
        readingTimeTarget: 'eta',
        wordCountTarget: 'words',
        readingSpeed: 275,
        round: true,
    });

    $('.article-content').readingbar({
        backgroundColor: '#222',
        height: 10
    });

});

$('.article-content p').selectionSharer();

var anchors = new AnchorJS({
    icon: '',
    visible: 'always',
    placement: 'right'
});
anchors.options.base = window.location.pathname;
anchors.add('#as-article h2').add('#as-article .link-local');