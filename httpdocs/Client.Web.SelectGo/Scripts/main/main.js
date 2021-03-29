/*! instant.page v5.1.0 - (C) 2019-2020 Alexandre Dieulot - https://instant.page/license */

let mouseoverTimer
let lastTouchTimestamp
const prefetches = new Set()
const prefetchElement = document.createElement('link')
const isSupported = prefetchElement.relList && prefetchElement.relList.supports && prefetchElement.relList.supports('prefetch')
    && window.IntersectionObserver && 'isIntersecting' in IntersectionObserverEntry.prototype
const allowQueryString = 'instantAllowQueryString' in document.body.dataset
const allowExternalLinks = 'instantAllowExternalLinks' in document.body.dataset
const useWhitelist = 'instantWhitelist' in document.body.dataset
const mousedownShortcut = 'instantMousedownShortcut' in document.body.dataset
const DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION = 1111

let delayOnHover = 65
let useMousedown = false
let useMousedownOnly = false
let useViewport = false

if ('instantIntensity' in document.body.dataset) {
    const intensity = document.body.dataset.instantIntensity

    if (intensity.substr(0, 'mousedown'.length) == 'mousedown') {
        useMousedown = true
        if (intensity == 'mousedown-only') {
            useMousedownOnly = true
        }
    }
    else if (intensity.substr(0, 'viewport'.length) == 'viewport') {
        if (!(navigator.connection && (navigator.connection.saveData || (navigator.connection.effectiveType && navigator.connection.effectiveType.includes('2g'))))) {
            if (intensity == "viewport") {
                /* Biggest iPhone resolution (which we want): 414 × 896 = 370944
                 * Small 7" tablet resolution (which we don’t want): 600 × 1024 = 614400
                 * Note that the viewport (which we check here) is smaller than the resolution due to the UI’s chrome */
                if (document.documentElement.clientWidth * document.documentElement.clientHeight < 450000) {
                    useViewport = true
                }
            }
            else if (intensity == "viewport-all") {
                useViewport = true
            }
        }
    }
    else {
        const milliseconds = parseInt(intensity)
        if (!isNaN(milliseconds)) {
            delayOnHover = milliseconds
        }
    }
}

if (isSupported) {
    const eventListenersOptions = {
        capture: true,
        passive: true,
    }

    if (!useMousedownOnly) {
        document.addEventListener('touchstart', touchstartListener, eventListenersOptions)
    }

    if (!useMousedown) {
        document.addEventListener('mouseover', mouseoverListener, eventListenersOptions)
    }
    else if (!mousedownShortcut) {
        document.addEventListener('mousedown', mousedownListener, eventListenersOptions)
    }

    if (mousedownShortcut) {
        document.addEventListener('mousedown', mousedownShortcutListener, eventListenersOptions)
    }

    if (useViewport) {
        let triggeringFunction
        if (window.requestIdleCallback) {
            triggeringFunction = (callback) => {
                requestIdleCallback(callback, {
                    timeout: 1500,
                })
            }
        }
        else {
            triggeringFunction = (callback) => {
                callback()
            }
        }

        triggeringFunction(() => {
            const intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const linkElement = entry.target
                        intersectionObserver.unobserve(linkElement)
                        preload(linkElement.href)
                    }
                })
            })

            document.querySelectorAll('a').forEach((linkElement) => {
                if (isPreloadable(linkElement)) {
                    intersectionObserver.observe(linkElement)
                }
            })
        })
    }
}

function touchstartListener(event) {
    /* Chrome on Android calls mouseover before touchcancel so `lastTouchTimestamp`
     * must be assigned on touchstart to be measured on mouseover. */
    lastTouchTimestamp = performance.now()

    const linkElement = event.target.closest('a')

    if (!isPreloadable(linkElement)) {
        return
    }

    preload(linkElement.href)
}

function mouseoverListener(event) {
    if (performance.now() - lastTouchTimestamp < DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION) {
        return
    }

    const linkElement = event.target.closest('a')

    if (!isPreloadable(linkElement)) {
        return
    }

    linkElement.addEventListener('mouseout', mouseoutListener, { passive: true })

    mouseoverTimer = setTimeout(() => {
        preload(linkElement.href)
        mouseoverTimer = undefined
    }, delayOnHover)
}

function mousedownListener(event) {
    const linkElement = event.target.closest('a')

    if (!isPreloadable(linkElement)) {
        return
    }

    preload(linkElement.href)
}

function mouseoutListener(event) {
    if (event.relatedTarget && event.target.closest('a') == event.relatedTarget.closest('a')) {
        return
    }

    if (mouseoverTimer) {
        clearTimeout(mouseoverTimer)
        mouseoverTimer = undefined
    }
}

function mousedownShortcutListener(event) {
    if (performance.now() - lastTouchTimestamp < DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION) {
        return
    }

    const linkElement = event.target.closest('a')

    if (event.which > 1 || event.metaKey || event.ctrlKey) {
        return
    }

    if (!linkElement) {
        return
    }

    linkElement.addEventListener('click', function (event) {
        if (event.detail == 1337) {
            return
        }

        event.preventDefault()
    }, { capture: true, passive: false, once: true })

    const customEvent = new MouseEvent('click', { view: window, bubbles: true, cancelable: false, detail: 1337 })
    linkElement.dispatchEvent(customEvent)
}

function isPreloadable(linkElement) {
    if (!linkElement || !linkElement.href) {
        return
    }

    if (useWhitelist && !('instant' in linkElement.dataset)) {
        return
    }

    if (!allowExternalLinks && linkElement.origin != location.origin && !('instant' in linkElement.dataset)) {
        return
    }

    if (!['http:', 'https:'].includes(linkElement.protocol)) {
        return
    }

    if (linkElement.protocol == 'http:' && location.protocol == 'https:') {
        return
    }

    if (!allowQueryString && linkElement.search && !('instant' in linkElement.dataset)) {
        return
    }

    if (linkElement.hash && linkElement.pathname + linkElement.search == location.pathname + location.search) {
        return
    }

    if ('noInstant' in linkElement.dataset) {
        return
    }

    return true
}

function preload(url) {
    if (prefetches.has(url)) {
        return
    }

    const prefetcher = document.createElement('link')
    prefetcher.rel = 'prefetch'
    prefetcher.href = url
    document.head.appendChild(prefetcher)

    prefetches.add(url)
}

!function () { "use strict"; function e(e) { try { if ("undefined" == typeof console) return; "error" in console ? console.error(e) : console.log(e) } catch (e) { } } function t(e) { return d.innerHTML = '<a href="' + e.replace(/"/g, "&quot;") + '"></a>', d.childNodes[0].getAttribute("href") || "" } function r(e, t) { var r = e.substr(t, 2); return parseInt(r, 16) } function n(n, c) { for (var o = "", a = r(n, c), i = c + 2; i < n.length; i += 2) { var l = r(n, i) ^ a; o += String.fromCharCode(l) } try { o = decodeURIComponent(escape(o)) } catch (u) { e(u) } return t(o) } function c(t) { for (var r = t.querySelectorAll("a"), c = 0; c < r.length; c++)try { var o = r[c], a = o.href.indexOf(l); a > -1 && (o.href = "mailto:" + n(o.href, a + l.length)) } catch (i) { e(i) } } function o(t) { for (var r = t.querySelectorAll(u), c = 0; c < r.length; c++)try { var o = r[c], a = o.parentNode, i = o.getAttribute(f); if (i) { var l = n(i, 0), d = document.createTextNode(l); a.replaceChild(d, o) } } catch (h) { e(h) } } function a(t) { for (var r = t.querySelectorAll("template"), n = 0; n < r.length; n++)try { i(r[n].content) } catch (c) { e(c) } } function i(t) { try { c(t), o(t), a(t) } catch (r) { e(r) } } var l = "/cdn-cgi/l/email-protection#", u = ".__cf_email__", f = "data-cfemail", d = document.createElement("div"); i(document), function () { var e = document.currentScript || document.scripts[document.scripts.length - 1]; e.parentNode.removeChild(e) }() }();

(function ($, window, appConfigs) {
    $(document).ready(function () {
        var fnAffterAll = undefined;
        var srvNotifyDeliveried = new Services("base/system-msg-deliveried", {}, function (ret) {

            if (fnAffterAll != undefined) fnAffterAll(ret);
        
        }, 'no-api');
		var srvNotifyDeliveriedYes = function(ret){
			if (ret === "True"){
						$(".notify").animate({
							opacity: 0.25,
							top: "-200px"
						}, 5000, function() {
							 $(".notify").remove();
						});
						fnAffterAll = undefined;
					}
		};

        if (appConfigs.NotifyDeliveried === "True") {
            setTimeout(function () {
                fnAffterAll = srvNotifyDeliveriedYes;
                srvNotifyDeliveried.post({ markread: true });
            }, 7000);

        } else {
			
            fnAffterAll = function(ret) {
                if (ret !== "") {
					$("#notify-template").html("<mark class='notify'><p>[Please don't close browers]</p>Getting new notification......</mark>");
					setTimeout(function () {
                        $("#notify-template").html(ret).hide();
                        setTimeout(function () {
                            $("#notify-template").show();
                        }, 3000);
						   setTimeout(function () {
							   fnAffterAll = srvNotifyDeliveriedYes;
								srvNotifyDeliveried.post({ markread: true });
							}, 7000);
                    }, 1000);
                }
            }
            srvNotifyDeliveried.get();
        }
        // Use this to initialize your chart
    });
})(jQuery, window, AppConfigs);

$(function () {
    "use strict";
    
    var hrefs = decodeURIComponent(window.location.pathname);
    var active = function (el, applied, hrefa) {
       
        if (hrefa === "" || hrefa === "vi" || hrefa === "en" || hrefa === "ja") {
            $($(el).find("li")[0]).addClass("active");
        }
        else {
            $.each($(el).find("a"), function (k, v) {
                if ($(v).attr("href") != undefined)
                if ($(v).attr("href").replace("/", "") === hrefa || ($(v).attr("data-href") != undefined && $(v).attr("data-href").replace("/", "") === hrefa)) {
                    if (applied === "parent")
                         $(v).parent().addClass("active");
                    else $(v).addClass("active");
                }
            });
        }
    };
    active(".main-menu", "parent", hrefs.replace("/", ""));

    $(function () {

        var $quote = $(".main-menu.cd-primary-nav > li > a");

        var $numWords = $quote.text().length;

        console.log($numWords);
        if (($numWords >= 1) && ($numWords < 50)) {
            $quote.css("font-size", "15px");
        }
        else if (($numWords >= 50) && ($numWords < 100)) {
            $quote.css("font-size", "14px");
        }
        else if (($numWords >= 100) && ($numWords < 150)) {
            $quote.css("font-size", "13px");
        }
        else {
            $quote.css("font-size", "12px");
        }

    });

   

    // Post Activity:
    var actionType = "View::" + window.location.pathname;
    if (window.sessionStorage.getItem("firstAccess") == null) {
        actionType = "Visits";
        window.sessionStorage.setItem("firstAccess", true);  
    }
    new Services("base/post-activity", {}, function () { }, 'no-api').post({ actionType: actionType });

    // now your currtime looks like 530 if it's 5.30am, or 1730 if it's 5.30 pm
    // you can just do a simple comparison between ints
    var d = new Date();
    var h = d.getHours();
    var currtime = h * 100 + d.getMinutes();

    if (currtime > 1900 || currtime < 700) {
        // closed between 20:00 (8 pm) and 8:00 (8 am) as an example
        $("body").addClass("we-are-closed"); 
    }

    jQuery(document).ready(function ($) {

        //Scrolll menu top -bottom
        if ($('body').width() > 324) {
            var lastScrollTop = 0;
            $(window).scroll(function () {
                var currentScrollTop = $(this).scrollTop() + 1;
                if (currentScrollTop < lastScrollTop) {
                    $('.header-desktop-fluid').removeClass('position-hidden').addClass('position-fixed');

                } else {
                    $('.header-desktop-fluid').addClass('position-hidden');

                }
                lastScrollTop = currentScrollTop;

            });
            $(window).scroll(function () {
                var y = $(window).scrollTop();
                if (y > 0) {
                    $('.header-desktop-fluid').addClass('scroll-header');
                } else {
                    $('.header-desktop-fluid').removeClass('scroll-header').removeClass('position-fixed');
                }
            });
        } else {
            $(window).scroll(function () {
                var y = $(window).scrollTop();
                if (y > 0) {
                    $('.header-desktop-fluid').addClass('bg-scroll');
                } else {
                    $('.header-desktop-fluid').removeClass('bg-scroll');
                }
            });
        }
    });

    $(function () {
        $('.load-ajax-me').each(function () {
            var $div = $(this);
            $.ajax({
                type: "GET",
                url: $div.data('url'),
                data: {},
                success: function (jsReturnArgs) {

                    if (jsReturnArgs.Status === 300) { //300 is an arbitrary value I just made up right now
                        showPopup("You do not have access to that.");
                    }

                    $div.html(jsReturnArgs); //the HTML I returned from the controller
                },
                error: function (errorData) { onError(errorData); }
            });
        })
    });

}(jQuery));
document.addEventListener('DOMContentLoaded', function () {
    var noscriptContainer = document.getElementById("async-stylesheets");
    if (noscriptContainer != null) {
        var container = document.createElement("div");
        container.innerHTML = noscriptContainer.textContent;
        document.body.appendChild(container);
    }
}, false);
$(document).ready(function () {

    HvHelpers.JqueryAgo();
    var w = window, d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth, // Viewport Width
        y = w.innerHeight || e.clientHeight || g.clientHeight; // Viewport Height

    if (x > 1024) {
        var toTopArrow = $('a.as-back-to-top');

        toTopArrow.on('click touchstart', function (e) {
            e.preventDefault();
            //$('html, body').animate({ scrollTop: 0 }, 800, 'swing');
            HvHelpers.scrollTo('body', 0);
            
            return false;
        });

        $(window).scroll(function () {
            var $this = $(this);
            if ($this.scrollTop() > 600) {
                toTopArrow.fadeIn();
            } else {
                toTopArrow.fadeOut();
            }
        });

    };


    //$.post("http://127.0.0.1:1911/account/TokenLogin",
    //    {
    //        token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlNTQyN2NkMzUxMDhiNDc2NjUyMDhlYTA0YjhjYTZjODZkMDljOTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2VsZWN0Z28tYjcwY2IiLCJhdWQiOiJzZWxlY3Rnby1iNzBjYiIsImF1dGhfdGltZSI6MTYwNTY3NTU5MSwidXNlcl9pZCI6IkFUR25mUWg4WFNmRDNCVE9hc3dheUszWjBBQTMiLCJzdWIiOiJBVEduZlFoOFhTZkQzQlRPYXN3YXlLM1owQUEzIiwiaWF0IjoxNjA1Njc1NjAzLCJleHAiOjE2MDU2NzkyMDMsInBob25lX251bWJlciI6Iis4NDEyMzQ1Njc4OSIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzg0MTIzNDU2Nzg5Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.LjMZKu7sTUyQvb6zWBIVlqpc5z8vtyvAjEgpPUzad1KkDwNqbYS6j0jseg7YcFxLddzO0q4jBFJ-anTEN4a106NkJGCq4JE_Qyxm3oAWj-HpYqodwbrFbeUXgOsHKdH5fPNLQhX27upVj0GZx1ig4vSmU8DO7b-47UCPR9ohs7lvUqDehUd5C2dSKEThepbcUEmXDXLDVbqwSqMQit178enVzHs_7wcC0GuvLnKSgomVBzQx2dCcK_u39FUsLUcHjAoQyY_fU7FrpHe7idQfs3IzP8vQx-uzp-GAj6eepr8F_a0L4TvUTeeSKLDaPMCIXsLYjNZcUgcOyDw51PpgNA",
    //    },
    //    function (data, status) {
    //        console.log(data,"\nStatus: " + status);
    //    });
});

