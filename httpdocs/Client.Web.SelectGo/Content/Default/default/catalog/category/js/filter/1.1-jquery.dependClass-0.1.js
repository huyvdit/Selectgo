/**
 * jquery.dependClass - Attach class based on first class in list of current element
 * 
 * Written by
 * Egor Khmelev (hmelyoff@gmail.com)
 *
 * Licensed under the MIT (MIT-LICENSE.txt).
 *
 * @author Egor Khmelev
 * @version 0.1.0-BETA ($Id$)
 * 
 **/

(function($) {
	$.baseClass = function(obj){
	  obj = $(obj);
	  return obj.get(0).className.match(/([^ ]+)/)[1];
	};
	
	$.fn.addDependClass = function(className, delimiter){
		var options = {
		  delimiter: delimiter ? delimiter : '-'
		}
		return this.each(function(){
		  var baseClass = $.baseClass(this);
		  if(baseClass)
    		$(this).addClass(baseClass + options.delimiter + className);
		});
	};

	$.fn.removeDependClass = function(className, delimiter){
		var options = {
		  delimiter: delimiter ? delimiter : '-'
		}
		return this.each(function(){
		  var baseClass = $.baseClass(this);
		  if(baseClass)
    		$(this).removeClass(baseClass + options.delimiter + className);
		});
	};

	$.fn.toggleDependClass = function(className, delimiter){
		var options = {
		  delimiter: delimiter ? delimiter : '-'
		}
		return this.each(function(){
		  var baseClass = $.baseClass(this);
		  if(baseClass)
		    if($(this).is("." + baseClass + options.delimiter + className))
    		  $(this).removeClass(baseClass + options.delimiter + className);
    		else
    		  $(this).addClass(baseClass + options.delimiter + className);
		});
	};

})(jQuery);

/*
 * jQuery BBQ: Back Button & Query Library - v1.3pre - 8/26/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function (e) { function t(a) { return "string" === typeof a } function q(a) { var b = B.call(arguments, 1); return function () { return a.apply(this, b.concat(B.call(arguments))) } } function C(a, b, c, d, w) { var m; d !== g ? (b = c.match(a ? u : /^([^#?]*)\??([^#]*)(#?.*)/), c = b[3] || "", 2 === w && t(d) ? d = d.replace(a ? v : D, "") : (m = j(b[2]), d = t(d) ? j[a ? h : r](d) : d, d = 2 === w ? d : 1 === w ? e.extend({}, d, m) : e.extend({}, m, d), d = E(d), a && (d = d.replace(F, x))), a = b[1] + (a ? y : d || !b[1] ? "?" : "") + d + c) : a = b(c !== g ? c : location.href); return a } function G(a, b, c) { b === g || "boolean" === typeof b ? (c = b, b = s[a ? h : r]()) : b = t(b) ? b.replace(a ? v : D, "") : b; return j(b, c) } function H(a, b, c, d) { !t(c) && "object" !== typeof c && (d = c, c = b, b = g); return this.each(function () { var g = e(this), m = b || I()[(this.nodeName || "").toLowerCase()] || "", f = m && g.attr(m) || ""; g.attr(m, s[a](f, c, d)) }) } "$:nomunge"; var g, B = Array.prototype.slice, x = decodeURIComponent, s = e.param, E, p, j, z, A = e.bbq = e.bbq || {}, J, K, I, L = e.event.special, r = "querystring", h = "fragment", D = /^.*\?|#.*$/g, v, u, F, M, y, N = {}; s[r] = q(C, 0, function (a) { return a.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1") }); s[h] = p = q(C, 1, function (a) { return a.replace(u, "$2") }); s.sorted = E = function (a, b) { var c = [], d = {}; e.each(s(a, b).split("&"), function (a, b) { var f = b.replace(/(?:%5B|=).*$/, ""), e = d[f]; e || (e = d[f] = [], c.push(f)); e.push(b) }); return e.map(c.sort(), function (a) { return d[a] }).join("&") }; p.noEscape = function (a) { a = e.map((a || "").split(""), encodeURIComponent); F = RegExp(a.join("|"), "g") }; p.noEscape(",/"); p.ajaxCrawlable = function (a) { a !== g && (a ? (v = /^.*(?:#!|#)/, u = /^([^#]*)(?:#!|#)?(.*)$/, y = "#!") : (v = /^.*#/, u = /^([^#]*)#?(.*)$/, y = "#"), M = !!a); return M }; p.ajaxCrawlable(0); e.deparam = j = function (a, b) { var c = {}, d = { "true": !0, "false": !1, "null": null }; e.each(a.replace(/\+/g, " ").split("&"), function (a, m) { var f = m.split("="), l = x(f[0]), j = c, h = 0, k = l.split("]["), n = k.length - 1; /\[/.test(k[0]) && /\]$/.test(k[n]) ? (k[n] = k[n].replace(/\]$/, ""), k = k.shift().split("[").concat(k), n = k.length - 1) : n = 0; if (2 === f.length) if (f = x(f[1]), b && (f = f && !isNaN(f) ? +f : "undefined" === f ? g : d[f] !== g ? d[f] : f), n) for (; h <= n; h++)l = "" === k[h] ? j.length : k[h], j = j[l] = h < n ? j[l] || (k[h + 1] && isNaN(k[h + 1]) ? {} : []) : f; else e.isArray(c[l]) ? c[l].push(f) : c[l] = c[l] !== g ? [c[l], f] : f; else l && (c[l] = b ? g : "") }); return c }; j[r] = q(G, 0); j[h] = z = q(G, 1); e.elemUrlAttr || (e.elemUrlAttr = function (a) { return e.extend(N, a) })({ a: "href", base: "href", iframe: "src", img: "src", input: "src", form: "action", link: "href", script: "src" }); I = e.elemUrlAttr; e.fn[r] = q(H, r); e.fn[h] = q(H, h); A.pushState = J = function (a, b) { t(a) && (/^#/.test(a) && b === g) && (b = 2); var c = a !== g, c = p(location.href, c ? a : {}, c ? b : 2); location.href = c }; A.getState = K = function (a, b) { return a === g || "boolean" === typeof a ? z(a) : z(b)[a] }; A.removeState = function (a) { var b = {}; a !== g && (b = K(), e.each(e.isArray(a) ? a : arguments, function (a, d) { delete b[d] })); J(b, 2) }; L.hashchange = e.extend(L.hashchange, { add: function (a) { function b(a) { var b = a[h] = p(); a.getState = function (a, c) { return a === g || "boolean" === typeof a ? j(b, a) : j(b, c)[a] }; c.apply(this, arguments) } var c; if (e.isFunction(a)) return c = a, b; c = a.handler; a.handler = b } }) })(jQuery, this);
/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function (c, q, r) { function d(a) { a = a || location.href; return "#" + a.replace(/^[^#]*#?(.*)$/, "$1") } "$:nomunge"; var j = document, l, b = c.event.special, e = j.documentMode, m = "onhashchange" in q && (e === r || 7 < e); c.fn.hashchange = function (a) { return a ? this.bind("hashchange", a) : this.trigger("hashchange") }; c.fn.hashchange.delay = 50; b.hashchange = c.extend(b.hashchange, { setup: function () { if (m) return !1; c(l.start) }, teardown: function () { if (m) return !1; c(l.stop) } }); var p = function () { var a = d(), b = s(k); a !== k ? (n(k = a, b), c(q).trigger("hashchange")) : b !== k && (location.href = location.href.replace(/#.*/, "") + b); g = setTimeout(p, c.fn.hashchange.delay) }, b = {}, g, k = d(), n = e = function (a) { return a }, s = e; b.start = function () { g || p() }; b.stop = function () { g && clearTimeout(g); g = r }; var t = navigator.userAgent.toLowerCase(); if (/msie/.test(t) && !/opera/.test(t) && !m) { var f, h; b.start = function () { f || (h = (h = c.fn.hashchange.src) && h + d(), f = c('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () { h || n(d()); p() }).attr("src", h || "javascript:0").insertAfter("body")[0].contentWindow, j.onpropertychange = function () { try { "title" === event.propertyName && (f.document.title = j.title) } catch (a) { } }) }; b.stop = e; s = function () { return d(f.location.href) }; n = function (a, b) { var d = f.document, e = c.fn.hashchange.domain; a !== b && (d.title = j.title, d.open(), e && d.write('<script>document.domain="' + e + '"\x3c/script>'), d.close(), f.location.hash = a) } } l = b })(jQuery, this);
