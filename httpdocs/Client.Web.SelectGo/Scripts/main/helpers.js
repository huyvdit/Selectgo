var localStorageEx = {
    get: function (key) {
        var value = localStorage[key];
        if (value != null) {
            var model = JSON.parse(value);
            if (model.payload != null && model.expiry != null) {
                var now = new Date();
                if (now > Date.parse(model.expiry)) {
                    localStorage.removeItem(key);
                    return null;
                }
            }
            return JSON.parse(value).payload;
        }
        return null;
    },
    set: function (key, value, expirySeconds) {
        var expiryDate = new Date();
        expiryDate.setSeconds(expiryDate.getSeconds() + expirySeconds);
        localStorage[key] = JSON.stringify({
            payload: value,
            expiry: expiryDate
        });
    }
}; 

/*
 * localStorageEx.set("key1", "Some text data", 5);
for (i = 1; i < 11; i++) {
    setTimeout(function () {
        console.log(localStorageEx.get("key1"));
    }, 1000 * i);
}
*/


function changeFavicon(link) {
    let favicon = document.querySelector('link[rel="icon"]');

    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
    }

    favicon.href = link;
    return favicon;
}

/**
 * Created by
 */
//$(document).ready(function () {
//    $(".copy-right").bind("copy", function () {
//        copyrightText();
//    });
//});

//function copyrightText() {
//    var bodyElement = document.getElementsByTagName("body")[0];
//    var selection = window.getSelection();
//    var selectionHtml = getSelectionHtml();
//    selectionHtml = handleRegex(selectionHtml);
//    var newDiv = document.createElement('div');
//    // newDiv.style.position = 'absolute';
//    // newDiv.style.left = '-99999px';
//    bodyElement.appendChild(newDiv);
//    newDiv.innerHTML = selectionHtml;
//    selection.selectAllChildren(newDiv);
//    window.setTimeout(function () {
//        bodyElement.removeChild(newDiv);
//    }, 0);
//};

//function handleRegex(selectionHtml) {
//    var productTitle, regexClear, regexTitle, regexImg, productUrl;
//    productTitle = $('#product-title').val();
//    regexClear = new RegExp(/<a\s(.+?)>(.+?)<\/a>/, 'img');
//    regexTitle = new RegExp(productTitle, 'img');
//    regexImg = new RegExp(/<\s*img.*?src="(.*?)".*?>/, 'img');
//    productUrl = window.location.href;
//    selectionHtml = selectionHtml.replace(/&nbsp;/g, ' ');
//    selectionHtml = selectionHtml.replace(/&amp;/g, '&');
//    selectionHtml = selectionHtml.replace(regexClear, '$2');
//    selectionHtml = selectionHtml.replace(new RegExp(/\schiaki.vn/, 'img'), ' <a href="http://chiaki.vn">chiaki.vn</a>');
//    selectionHtml = selectionHtml.replace(new RegExp(/\schiaki/, 'img'), ' <a href="http://chiaki.vn">chiaki</a>');

//    selectionHtml = selectionHtml.replace(regexTitle, '<a href="' + productUrl + '" >' + productTitle + '</a>');
//    selectionHtml = selectionHtml.replace(regexImg, '<a href="' + productUrl + '"><img src="$1" alt="' + productTitle + '" /></a>');
//    return selectionHtml;
//}

//function getSelectionHtml() {
//    var html = "";
//    if (typeof window.getSelection != "undefined") {
//        var sel = window.getSelection();
//        if (sel.rangeCount) {
//            var container = document.createElement("div");
//            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
//                container.appendChild(sel.getRangeAt(i).cloneContents());
//            }
//            html = container.innerHTML;
//        }
//    } else if (typeof document.selection != "undefined") {
//        if (document.selection.type == "Text") {
//            html = document.selection.createRange().htmlText;
//        }
//    }
//    return html;
//}

//!function (e) { e.fn.disableEverything = function (n) { var t = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent), o = e(this), i = e.extend({ disableRightClick: null }, n); return this.each(function () { if (i.disableKeyboard && (o.on("keypress", function () { return !1 }), window.addEventListener("keydown", function (e) { [32, 37, 38, 39, 40].indexOf(e.keyCode) > -1 && e.preventDefault() }, !1), t && o.on("touchstart", function (n) { e("input, textarea").prop("disabled", !0) })), i.disableRightClick && o.on("contextmenu", function () { return alert(i.rightClickMessage), !1 }), i.disableCopy && (o.on("cut copy paste", function (e) { return alert(i.copyMessage), !1 }), o.on("keydown", function (e) { if (e.metaKey && 67 == e.which) return e.preventDefault(), alert(i.copyMessage), !1 }), e("img").on("contextmenu", function (e) { return !1 }), t && e("img").on("touchstart", function (n) { return e("img").css({ "-webkit-touch-callout": "none", "-webkit-user-select": "none", "pointer-events": "none", "-moz-user-select": "none" }), n.preventDefault(), !1 })), i.disableScroll) { var n = { 37: 1, 38: 1, 39: 1, 40: 1 }; function r(e) { (e = e || window.event).preventDefault && e.preventDefault(), e.returnValue = !1 } function u(e) { if (n[e.keyCode]) return r(e), !1 } window.addEventListener && window.addEventListener("DOMMouseScroll", r, !1), window.onwheel = r, window.onmousewheel = document.onmousewheel = r, window.ontouchmove = r, document.onkeydown = u, t && document.addEventListener("touchmove", function (e) { e.preventDefault() }, { passive: !1 }) } i.disableImageDragging && (e("img").on("contextmenu dragstart", function () { return alert(i.copyMessage), !1 }), t && e("img").on("touchstart", function (n) { return e("img").css({ "-webkit-touch-callout": "none", "-webkit-user-select": "none", "pointer-events": "none", "-moz-user-select": "none" }), n.preventDefault(), !1 })) }) } }(jQuery);



/*!
 * Conditionally-Show-Hide-Elements-Display-If:
 */

!function (a) { a(".display-if").each(function () { var t = a(this), e = t.data("target_name"), n = t.data("target_class"), r = a(e ? "[name='" + e + "']" : "." + n), c = a("[name='" + t.data("target_matches_identifier") + "']"), i = t.data("display_if_inverse"), u = t.data("target_type"), d = t.data("target_has_any_value"), l = t.data("target_value"), o = t.data("target_value_not"), h = t.data("target_value_can_be_null"), v = ["select", "text", "password"]; function f(t) { var e, n, r = a(t); return c.length > 0 ? (e = r.val(), n = c.map(function () { var t = a(this).val(); return !(!h && !t) && e === t }).toArray().reduce(function (a, t) { return a + t }, 0), c.length > 0 && n == c.length) : d ? !!r.val() : o ? r.val() !== o : r.val() === l } function s(t) { return "checkbox" === u ? function (t) { var e = a(t); return l ? e.is(":checked") === l : e.is(":checked") }(t) : "radio" === u ? function (t) { var e = a(t); return d ? e.is(":checked") : l ? e.is(":checked") && e.val() === l : e.is(":checked") && e.val() !== l }(t) : v.indexOf(u) > -1 ? f(t) : function (t) { return !!a(t).val() }(t) } function _() { "radio" == u && (r = (r = a("[name='" + t.data("target_name") + "']")).filter(":checked")); var e = r.map(function () { var a = s(this); return i ? !a : a }).toArray().reduce(function (a, t) { return a + t }, 0); r.length > 0 && e == r.length ? t.show() : t.hide() } r.on("change", function () { _() }), c.on("change", function () { _() }), _() }) }(jQuery);

/*!
 * accounting.js v0.4.2, copyright 2014 Open Exchange Rates, MIT license, http://openexchangerates.github.io/accounting.js
 */
(function (p, z) { function q(a) { return !!("" === a || a && a.charCodeAt && a.substr) } function m(a) { return u ? u(a) : "[object Array]" === v.call(a) } function r(a) { return "[object Object]" === v.call(a) } function s(a, b) { var d, a = a || {}, b = b || {}; for (d in b) b.hasOwnProperty(d) && null == a[d] && (a[d] = b[d]); return a } function j(a, b, d) { var c = [], e, h; if (!a) return c; if (w && a.map === w) return a.map(b, d); for (e = 0, h = a.length; e < h; e++) c[e] = b.call(d, a[e], e, a); return c } function n(a, b) { a = Math.round(Math.abs(a)); return isNaN(a) ? b : a } function x(a) { var b = c.settings.currency.format; "function" === typeof a && (a = a()); return q(a) && a.match("%v") ? { pos: a, neg: a.replace("-", "").replace("%v", "-%v"), zero: a } : !a || !a.pos || !a.pos.match("%v") ? !q(b) ? b : c.settings.currency.format = { pos: b, neg: b.replace("%v", "-%v"), zero: b } : a } var c = { version: "0.4.1", settings: { currency: { symbol: "$", format: "%s%v", decimal: ".", thousand: ",", precision: 2, grouping: 3 }, number: { precision: 0, grouping: 3, thousand: ",", decimal: "." } } }, w = Array.prototype.map, u = Array.isArray, v = Object.prototype.toString, o = c.unformat = c.parse = function (a, b) { if (m(a)) return j(a, function (a) { return o(a, b) }); a = a || 0; if ("number" === typeof a) return a; var b = b || ".", c = RegExp("[^0-9-" + b + "]", ["g"]), c = parseFloat(("" + a).replace(/\((.*)\)/, "-$1").replace(c, "").replace(b, ".")); return !isNaN(c) ? c : 0 }, y = c.toFixed = function (a, b) { var b = n(b, c.settings.number.precision), d = Math.pow(10, b); return (Math.round(c.unformat(a) * d) / d).toFixed(b) }, t = c.formatNumber = c.format = function (a, b, d, i) { if (m(a)) return j(a, function (a) { return t(a, b, d, i) }); var a = o(a), e = s(r(b) ? b : { precision: b, thousand: d, decimal: i }, c.settings.number), h = n(e.precision), f = 0 > a ? "-" : "", g = parseInt(y(Math.abs(a || 0), h), 10) + "", l = 3 < g.length ? g.length % 3 : 0; return f + (l ? g.substr(0, l) + e.thousand : "") + g.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + e.thousand) + (h ? e.decimal + y(Math.abs(a), h).split(".")[1] : "") }, A = c.formatMoney = function (a, b, d, i, e, h) { if (m(a)) return j(a, function (a) { return A(a, b, d, i, e, h) }); var a = o(a), f = s(r(b) ? b : { symbol: b, precision: d, thousand: i, decimal: e, format: h }, c.settings.currency), g = x(f.format); return (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal)) }; c.formatColumn = function (a, b, d, i, e, h) { if (!a) return []; var f = s(r(b) ? b : { symbol: b, precision: d, thousand: i, decimal: e, format: h }, c.settings.currency), g = x(f.format), l = g.pos.indexOf("%s") < g.pos.indexOf("%v") ? !0 : !1, k = 0, a = j(a, function (a) { if (m(a)) return c.formatColumn(a, f); a = o(a); a = (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal)); if (a.length > k) k = a.length; return a }); return j(a, function (a) { return q(a) && a.length < k ? l ? a.replace(f.symbol, f.symbol + Array(k - a.length + 1).join(" ")) : Array(k - a.length + 1).join(" ") + a : a }) }; if ("undefined" !== typeof exports) { if ("undefined" !== typeof module && module.exports) exports = module.exports = c; exports.accounting = c } else "function" === typeof define && define.amd ? define([], function () { return c }) : (c.noConflict = function (a) { return function () { p.accounting = a; c.noConflict = z; return c } }(p.accounting), p.accounting = c) })(this);
Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
};

HvHelpers = {};

HvHelpers.loading = {
    skipShow: true, // default not loading
    show: function (force) {
        if (force)
            HvHelpers.loading.skipShow = false;

        if (!HvHelpers.loading.skipShow && $("html").size() === 1) {
            if (HvHelpers.loadingInstance == undefined) {
                HvHelpers.loadingInstance = $("html");
                this.showHandle();
            }
            else {

                this.showHandle();
            }
        }

    },
    hide: function(force, delay) {
            if (force === 'after') {
                setTimeout(function() {
                    HvHelpers.loadingInstance.removeClass("loading");
                }, delay);
            } else {
                if (force)
                    HvHelpers.loading.forceHide = false;
            if (HvHelpers.loadingInstance && !HvHelpers.loading.forceHide) {
                HvHelpers.loadingInstance.removeClass("loading");
            }
        }

    },
    showHandle: function () {

        HvHelpers.loadingInstance.addClass("loading");
    }
};

HvHelpers.alert = function (msg, action, fn) {
    alert(msg);
    if (fn) fn();
};

HvHelpers.assignUrl = function (url) {

    HvHelpers.loading.show('force'); window.location.assign(url);
};
HvHelpers.getUrlParams = function (url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');
        
        for (var i=0; i<arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            var paramValue = typeof(a[1])==='undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toString().toLowerCase();

            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                    // if array index number specified...
                else {
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
                // if param name doesn't exist yet, set it
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;
}
HvHelpers.timeServer = function () {

    try {
        return new Date($("#realdate").html().trim().split('/').reverse().join("-") + ' ' + $("#realtime").html());
    } catch (ex) {
        return new Date();
    }
};

HvHelpers.AdjustDateTime = function (dateInput) {

    var date = new Date(dateInput);
    if (date == "Invalid Date") {
        var adjust = (dateInput.indexOf("CH") === -1) ? 0 : 12;
        var from = dateInput.split(" ");
        if (from.length === 1) from = dateInput.split("T");
        var numbers = from[0].match(/\d+/g);
        if (numbers != null) {
            if (numbers.length === 1) numbers = from[0].split("-");

            var time = from[1].replace("SA", "").replace("CH", "").split(":");
            if (numbers[2].toString().length === 4) {
                return new Date(numbers[2], numbers[1] - 1, numbers[0], time[0], time[1], time[2]).addHours(adjust);
            }
            else
                return new Date(numbers[0], numbers[1] - 1, numbers[2], time[0], time[1], time[2]).addHours(adjust);
        }

        return new Date();

    } else {
        return date;
    }

};

HvHelpers.getAgoDate = function (dateStr, format) {

    if (!dateStr) { return ""; }
    var date = HvHelpers.AdjustDateTime(dateStr);

    var relativeTo = HvHelpers.timeServer(); //defines relative to what ..default is now
    var delta = parseInt((relativeTo.getTime() - date.getTime()) / 1000);
    delta = (delta < 0) ? 1 : delta;
    var r = '';

    if (delta === 1) {
        r = Resources._("Just now!");
    }
    else if (delta < 10) {
        r = delta + ' ' + Resources._("seconds ago");

    } else if (delta < 120) {
        r = "1 " + Resources._("minutes") + ' ' + (delta - 60) + ' ' + Resources._("seconds") + ' ' + Resources._("ago");
    } else if (delta < (45 * 60)) {
        r = (parseInt(delta / 60, 10)).toString() + ' ' + Resources._("minutes") + ' ' + Resources._("ago");
    } else {
        var m;
        if (delta < (2 * 60 * 60)) {
            m = (Math.floor(delta / 60) - 60);
            r = '1 ' + Resources._('hours') + ' ' + (m < 0 ? '' : m + "'") + ' ' + Resources._('ago');
        } else if (delta < (24 * 60 * 60)) {
            var h = (parseInt(delta / 3600, 10));
            m = Math.floor((delta / 60) - (h * 60));
            r = '' + h + ' ' + Resources._('hours') + ' ' + (m < 0 ? '' : m + "'") + ' ' + Resources._('ago');
        } else { return HvHelpers.getFormatDate(dateStr, (format)); }
    }
    return ' ' + r;

};

HvHelpers.getFormatDate = function (dateInput, format) {

    var date = HvHelpers.AdjustDateTime(dateInput);
    var addZero = function (val) {

        if (val < 10) return "0" + val;
        else return val;
    };

    var dayMapping = Resources.Resource["dayMapping"];
    var hours = addZero(date.getUTCHours());
    var minutes = addZero(date.getUTCMinutes());
    var seconds = addZero(date.getUTCSeconds());
    var reft = AppConfigs.DateTimeFormatting === "dd/MM/yyyy" ? (addZero(date.getUTCDate()) + '/' + addZero(date.getUTCMonth() + 1) + '/' + addZero(date.getUTCFullYear())) : (addZero(date.getUTCMonth() + 1) + '/' + addZero(date.getUTCDate()) + '/' + addZero(date.getUTCFullYear()));
    if (format === 'full') return dayMapping[date.getUTCDay()] + ', ' + (reft) + ' - ' + hours + ':' + minutes + ':' + seconds + ' ' + Resources._("zone");
    if (format === 'date') return reft;
    else return (reft) + ' - ' + hours + ':' + minutes + ':' + seconds;
};


HvHelpers.getLocation = function (fn) {

    var callFn = function () {
        clearTimeout(limitedWait);
        if (fn) fn(window.Profiles);
    };
    var limitedWait = setTimeout(function () {
        if (fn) fn({ Ip: "undefined", Region: "undefined" });
    }, 5000);

    if (typeof (Profiles) == "undefined") {
        $.get("http://ipinfo.io", function (response) {
            window.Profiles = { Ip: response.ip, Region: response.region };
            callFn(window.Profiles);
        }, "jsonp");
    } else {
        callFn();
    }
};


HvHelpers.parseMoney = function (amount, callback) {

    if (AppConfigs.CurrencyRate === "1") {
        callback(HvHelpers.formatNumber(amount));
    }
    else {
        if (!isNaN(amount)) {
            $.getJSON(AppConfigs.HOST + "/api/Utils/GetFormatCurrency?value=" + amount, function (data) {
                callback(data);
            });
        }
    }
};

HvHelpers.formatNumber = function (v, n, x, s, c) {

    if (typeof v == "string") v = parseFloat(v);
    if (v == 0) return "free";
    if (AppConfigs.CurrencyFormatting === "$ {0:#,##0}") return accounting.formatMoney(v, {
        symbol: "$",
        precision: 0,
        thousand: ".",
        format: {
            pos: "%s %v",
            neg: "%s (%v)",
            zero: "%s 0"
        }
    });
    else if (AppConfigs.CurrencyFormatting === "{0:#,##0} ₫") return accounting.formatMoney(v, {
        symbol: "₫",
        precision: 0,
        thousand: ".",
        format: {
            pos: "%v %s",
            neg: "%s (%v)",
            zero: "0 %s"
        }
    });
    else if (AppConfigs.CurrencyFormatting === "¥ {0:#,##0}") return accounting.formatMoney(v, {
        symbol: "¥  ",
        precision: 0,
        thousand: ".",
        format: {
            pos: "%s %v",
            neg: "%s (%v)",
            zero: "0 %s"
        }
    });


    return accounting.formatMoney(v, {
        symbol: "# ",
        precision: 0,
        thousand: ".",
        format: {
            pos: "%v %s",
            neg: "%s (%v)",
            zero: "0 %s"
        }
    });
    //return accounting.formatMoney(v);
};

Number.prototype.formatMoney = function (n, x, s, c) {

    return HvHelpers.formatNumber(this, n, x, s, c);
};

HvHelpers.modifyUrlParameter = function (param, val, url) {
   
    url = url == undefined ? window.location.href : url;
    if (val == null || val == "") return url;
    var theAnchor = null;
    var newAdditionalUrl = "";
    var tempArray = url.split("?");
    var baseUrl = tempArray[0];
    var additionalUrl = tempArray[1];
    var temp = "";
    var tmpAnchor;
    var theParams;
    if (additionalUrl) {
        tmpAnchor = additionalUrl.split("#");
        theParams = tmpAnchor[0];
        theAnchor = tmpAnchor[1];
        if (theAnchor)
            additionalUrl = theParams;

        tempArray = additionalUrl.split("&");

        for (i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
                newAdditionalUrl += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    else {
        tmpAnchor = baseUrl.split("#");
        theParams = tmpAnchor[0];
        theAnchor = tmpAnchor[1];

        if (theParams)
            baseUrl = theParams;
    }

    if (theAnchor)
        val += "#" + theAnchor;

    var rowsTxt = temp + "" + param + "=" + val;
    return baseUrl + "?" + newAdditionalUrl + rowsTxt;
};


HvHelpers.loadJsQueued = [];
HvHelpers.loadJs = function (url, obj, isready, asyn) {

    var scripts = document.getElementsByTagName('script');
    var len = scripts.length;
    for (var i = 0; i < len; i++) {
        if (scripts[i].src.search(url) > 0 && scripts[i].src.lastIndexOf("/") >= 0) {
            HvHelpers.loadJsQueued.push(url);
            break;
        }
    }
    if (HvHelpers.loadJsQueued.indexOf(url) == -1) {
        HvHelpers.loadJsQueued.push(url);
        var script = document.createElement('script');
        script.src = AppConfigs.HOST + "/" + url;
        var head = document.getElementsByTagName('head')[0], done = false;
        head.appendChild(script);
        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true; console.log(url, ":: load when not ready!");
                if (isready) isready();
                script.onload = script.onreadystatechange = null;
                //head.removeChild(script);
            }
        };
    }
    else {
        //console.log(url,"::is ready, no load!");
        if (isready && asyn == undefined) isready();
    }
};

HvHelpers.Jsonify = (function (div) {
    return function (json) {
        if (json == "") return {};
        div.setAttribute('onclick', 'this.__json__ = ' + json);
        div.click();
        return div.__json__;
    };
})(document.createElement('div'));

//$.fn.scrollTo = function (target, options, callback) {
//    if (typeof options == 'function' && arguments.length == 2) { callback = options; options = target; }
//    var settings = $.extend({
//        scrollTarget: target,
//        offsetTop: 10,
//        duration: 500,
//        easing: 'swing'
//    }, options);
//    return this.each(function () {
//        var scrollPane = $(this);
//        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
//        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
//        scrollPane.animate({ scrollTop: scrollY }, parseInt(settings.duration), settings.easing, function () {
//            if (typeof callback == 'function') { callback.call(this); }
//        });
//    });
//};

HvHelpers.scrollTo = function (target, margin) {
    margin = margin || 0;
    var goTo = $(target).offset().top - (margin);
    document.body.scrollTop = goTo; // For Safari
    document.documentElement.scrollTop = goTo; // For Chrome, Firefox, IE and Opera
    //$('html, body').animate({ scrollTop: ($(target).offset().top - (margin)) }, 100);
};

HvHelpers.JqueryAgo = function () {

    $(".time-ago").timeago();
};

Number.prototype.format = function (n, x, s, c) {

    return HvHelpers.formatNumber(this, n, x, s, c);
};

Number.prototype.round = function (places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
};

HVGetFiles = { cssLoaded: {}, scriptLoaded: {}, waiting: {} };
HVGetFiles.Script = function (urlJs, callbacks) {
    if (urlJs) urlJs = AppConfigs.HOST + urlJs + "?7200";
    if (!HVGetFiles.scriptLoaded[urlJs]) {
        HVGetFiles.waiting[urlJs] = true;
        HVGetFiles.scriptLoaded[urlJs] = "__loaded__";
        jQuery.ajax({
            url: urlJs,
            type: 'GET',
            dataType: "script",
            cache: true,
            success: function () {
                delete HVGetFiles.waiting[urlJs];
                if (callbacks) callbacks();
            },
            error: function (response) {
                console.error("Ajax js Error: ", response);
            }
        });
    } else {
        if (callbacks) {
            if (HVGetFiles.waiting[urlJs] == true) {
                setTimeout(function () { callbacks(); }, 3200);
            } else callbacks();
        }
    }
};

HVGetFiles.Scripts = function (arrayLink) {

    for (var i in arrayLink) {
        if (arrayLink.hasOwnProperty(i)) {
            HVGetFiles.Script("/" + arrayLink[i]);
        }
    }
};

HVGetFiles.CSS = function (urlCss, callbacks) {
    if (urlCss) urlCss = AppConfigs.HOST + urlCss + "?7200";
    if (!HVGetFiles.cssLoaded[urlCss]) {
        var stylesheet = document.createElement('link');
        stylesheet.href = urlCss;
        stylesheet.rel = 'stylesheet';
        stylesheet.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
        HVGetFiles.cssLoaded[urlCss] = "__loaded__";
        if (callbacks) callbacks();

    } else {
        if (callbacks) callbacks();
    }
};

HVGetFiles.CSSs = function (arrayLink) {
    for (var i in arrayLink) {
        if (arrayLink.hasOwnProperty(i)) {
            HVGetFiles.CSS("/" + arrayLink[i]);
        }
    }
};

HVGetFiles.Htm = function (urlHtm, callbacks) {
    if (urlHtm) urlHtm = AppConfigs.HOST + urlHtm;
    $.get(urlHtm, callbacks);
};


window.AlertClass = AlertClass;
window.ConfirmClass = ConfirmClass;
window.ToastClass = ToastClass;


// ç»„ä»¶æ ·å¼ï¼Œå¼•å…¥jsè‡ªåŠ¨å¼•å…¥
window.onload = function () {
    let componentStyle = document.createElement('style');
    let componentStyleHtml = '.component_mask{' +
        'position: fixed;z-index: 999998;width: 100%;height: 100%;top: 0;left: 0;' +
        'background: rgba(0,0,0,.75);}' +
        '.component_toast {' +
        'position: relative;top: 30%;margin: 0 auto;min-width: 200px;width: 50%;max-width: 300px;' +
        'padding: 10px;background: #fff;text-align: center;border-radius: 5px;}' +
        '.component_dialog {' +
        'position: fixed;z-index: 999999;min-width: 300px;top: 50%;left: 50%;' +
        '-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);background-color: #fafafc;' +
        'text-align: center;border-radius: 0px;}' +
        '.component_dialog_confirm .component_dialog .component_dialog_hd {' +
        'padding: 1.2em 20px .5em}' +
        '.component_dialog_confirm .component_dialog .component_dialog_bd {' +
        'text-align: left}' +
        '.component_dialog_hd {' +
        'padding: 1.2em 20px .5em;}' +
        '.component_dialog_title {' +
        'font-weight: 400;font-size: 17px;}' +
        '.component_dialog_bd {' +
        'padding: 0 20px;font-size: 15px;color: #888;word-wrap: break-word;word-break: break-all;}' +
        '.component_dialog_ft {' +
        'position: relative;line-height: 42px;margin-top: 20px;font-size: 17px;display: -webkit-box;' +
        'display: -webkit-flex;display: -ms-flexbox;display: flex;}' +
        '.component_dialog_ft .component_btn {' +
        'display: block;-webkit-box-flex: 1;-webkit-flex: 1;-ms-flex: 1;flex: 1;color: #999;' +
        'text-decoration: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);border-left: 1px solid #d5d5d6;}' +
        '.component_dialog_ft .component_btn:first-child{border: none;    font-weight: 700;    background: #9E9E9E;    color: #fff;    cursor: pointer;}' +
        '.component_dialog_ft .component_btn:first-child:hover{color: #2D3657;}' +
        '.component_dialog_ft .component_btn:active {' +
        'background-color: #eee;}' +
        '.component_dialog_ft:after {content: " ";position: absolute;left: 0;top: 0;width: 100%;' +
        'height: 1px;border-top: 1px solid #d5d5d6;color: #d5d5d6;-webkit-transform-origin: 0 0;' +
        'transform-origin: 0 0;-webkit-transform: scaleY(.5);transform: scaleY(.5)}' +
        '.component_dialog_ft .confirm{' +
        'color: #3cc51f;}' +
        '.component_dialog_ft .cancel{' +
        'color: #E42626;}' +
        '.component_btn_dialog.default {color: #353535}.component_btn_dialog.primary {color: #0bb20c}';
    componentStyle.innerHTML = componentStyleHtml;
    document.body.appendChild(componentStyle);
};


// Toastå¼¹çª—
function ToastClass() { }

ToastClass.prototype.show = function (options) {
    if (this.instance) {
        this.hide();
    }
    ToastClass.instance = this;
    let text = options.text || 'Loading...';
    let duration = options.duration;
    this.showFn = options.onShow;
    this.hideFn = options.onHide;
    let loading = options.loading;

    let toast = document.createElement('div');
    let innerHTMLArr = ['<div class="component_mask"><div class="component_toast">'];
    if (loading) {
        innerHTMLArr.push('<div><img src="data:image/gif;base64,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" ' +
            'width="26%" /></div>');
    }
    innerHTMLArr.push('<div style="font-size: 16px;margin:10px 0;">' + text + '</div></div></div>');
    toast.innerHTML = innerHTMLArr.join('');
    document.body.appendChild(toast);

    // å¼€å¯äº‹ä»¶
    this.showFn && this.showFn();
    // å¦‚æžœæœ‰å…¨å±€äº‹ä»¶ï¼Œåˆ™æ‰§è¡Œ
    this.onShow && this.onShow();

    this.instance = toast;

    if (duration) {
        setTimeout(function () {
            ToastClass.instance.hide();
        }, duration);
    }

};

ToastClass.prototype.hide = function () {
    let instance = this.instance;
    if (instance && instance.parentNode) {
        instance.parentNode.removeChild(instance);
    }

    // å…³é—­äº‹ä»¶
    this.hideFn && this.hideFn();
    // å¦‚æžœæœ‰å…¨å±€äº‹ä»¶ï¼Œåˆ™æ‰§è¡Œ
    this.onHide && this.onHide();
};


// ç¡®è®¤å¼¹çª—
function ConfirmClass() { }

// ç¡®è®¤å¼¹çª—
ConfirmClass.prototype.show = function (options) {
    if (this.instance) {
        this.hide();
    }
    let defaultBtns = [{ text: 'Okey', class: 'confirm' }, { text: 'Cancel', class: 'cancel' }];
    ConfirmClass.instance = this;
    let title = options.title || '';
    let content = options.content || '';
    this.hideFn = options.onHide;
    this.showFn = options.onShow;
    this.close = true;

    // å¦‚æžœé…ç½®é¡¹æ²¡æœ‰è¿›è¡Œé…ç½®åˆ™ä½¿ç”¨é»˜è®¤çš„
    if (!!options.btns) {
        let tempBtns = options.btns.slice(0, 2);
        defaultBtns.forEach(function (v, i) {
            tempBtns[i] = tempBtns[i] || v;
            for (let j in v) {
                tempBtns[i][j] = tempBtns[i][j] || v[j];
            }
        });
        this.btns = tempBtns.concat(options.btns.slice(2));
    } else {
        this.btns = defaultBtns;
    }

    let confirm = document.createElement('div');
    let btnHtml = '';
    this.btns.forEach(function (v, i) {
        btnHtml += '<a class="component_btn ' + (v.class || '') + '" style="cursor: pointer;" onclick="ConfirmClass.btnClick(' + i + ', event)">' + (v.text || 'ç¡®å®š') + '</a>'
    });
    confirm.innerHTML = ['<div class="component_mask">',
        '<div class="component_dialog" id="ConfirmClass_ComfirmArea">',
        '<div class="component_dialog_hd"><strong class="component_dialog_title">' + title + '</strong></div>',
        '<div class="component_dialog_bd">' + content + '</div>',
        '<div class="component_dialog_ft">',
        btnHtml,
        '</div></div></div>'].join('');

    document.body.appendChild(confirm);

    // å¼€å¯äº‹ä»¶
    this.showFn && this.showFn();
    // å¦‚æžœæœ‰å…¨å±€äº‹ä»¶ï¼Œåˆ™æ‰§è¡Œ
    this.onShow && this.onShow();

    this.instance = confirm;

};

ConfirmClass.btnClick = function (index) {
    let instance = ConfirmClass.instance;
    if (typeof instance.btns[index].callback === 'function') {
        instance.btns[index].callback(instance);
    }
    if (instance.close) {
        instance.hide();
    } else {
        instance.close = true;
    }

};

ConfirmClass.prototype.hide = function () {
    let instance = this.instance;
    if (instance && instance.parentNode) {
        instance.parentNode.removeChild(instance);
    }

    // å…³é—­äº‹ä»¶
    this.hideFn && this.hideFn();
    // å¦‚æžœæœ‰å…¨å±€äº‹ä»¶ï¼Œåˆ™æ‰§è¡Œ
    this.onHide && this.onHide();
};


// alertå¼¹çª—
function AlertClass() { }


AlertClass.prototype.show = function (options) {
    if (this.instance) {
        this.hide();
    }
    AlertClass.instance = this;
    let title = options.title || '';
    let content = options.content || '';
    let btnText = options.btnText || 'Okey';
    this.hideFn = options.onHide;
    this.showFn = options.onShow;

    let alert = document.createElement('div');
    alert.innerHTML = ['<div class="component_mask">',
        '<div class="component_dialog">',
        '<div class="component_dialog_hd"><strong class="component_dialog_title">' + title + '</strong></div>',
        '<div class="component_dialog_bd">' + content + '</div>',
        '<div class="component_dialog_ft">',
        '<a class="component_btn component_btn_dialog primary" onclick="AlertClass.btnClick()">' + btnText + '</a>',
        '</div></div></div>'].join('');

    document.body.appendChild(alert);

    // å¼€å¯äº‹ä»¶
    this.showFn && this.showFn();
    // å¦‚æžœæœ‰å…¨å±€äº‹ä»¶ï¼Œåˆ™æ‰§è¡Œ
    this.onShow && this.onShow();

    this.instance = alert;
};

AlertClass.btnClick = function () {
    let instance = AlertClass.instance;
    instance.hide();
};

AlertClass.prototype.hide = function () {
    let instance = this.instance;
    if (instance && instance.parentNode) {
        instance.parentNode.removeChild(instance);
    }
    // å…³é—­äº‹ä»¶
    this.hideFn && this.hideFn();
    // å¦‚æžœæœ‰å…¨å±€äº‹ä»¶ï¼Œåˆ™æ‰§è¡Œ
    this.onHide && this.onHide();
};