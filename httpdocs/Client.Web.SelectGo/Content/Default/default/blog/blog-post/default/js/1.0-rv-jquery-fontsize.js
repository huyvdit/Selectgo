/* store.js - Copyright (c) 2010-2017 Marcus Westin */
!function (t) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else { var e; e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.store = t() } }(function () { var define, module, exports; return function t(e, n, r) { function o(u, s) { if (!n[u]) { if (!e[u]) { var a = "function" == typeof require && require; if (!s && a) return a(u, !0); if (i) return i(u, !0); var c = new Error("Cannot find module '" + u + "'"); throw c.code = "MODULE_NOT_FOUND", c } var f = n[u] = { exports: {} }; e[u][0].call(f.exports, function (t) { var n = e[u][1][t]; return o(n ? n : t) }, f, f.exports, t, e, n, r) } return n[u].exports } for (var i = "function" == typeof require && require, u = 0; u < r.length; u++)o(r[u]); return o }({ 1: [function (t, e, n) { "use strict"; var r = t("../src/store-engine"), o = t("../storages/all"), i = t("../plugins/all"); e.exports = r.createStore(o, i) }, { "../plugins/all": 2, "../src/store-engine": 15, "../storages/all": 17 }], 2: [function (t, e, n) { "use strict"; e.exports = [t("./compression"), t("./defaults"), t("./dump"), t("./events"), t("./observe"), t("./expire"), t("./json2"), t("./operations"), t("./update"), t("./v1-backcompat")] }, { "./compression": 3, "./defaults": 4, "./dump": 5, "./events": 6, "./expire": 7, "./json2": 8, "./observe": 11, "./operations": 12, "./update": 13, "./v1-backcompat": 14 }], 3: [function (t, e, n) { "use strict"; function r() { function t(t, e) { var n = t(e); if (!n) return n; var r = o.decompress(n); return null == r ? n : this._deserialize(r) } function e(t, e, n) { var r = o.compress(this._serialize(n)); t(e, r) } return { get: t, set: e } } var o = t("./lib/lz-string"); e.exports = r }, { "./lib/lz-string": 10 }], 4: [function (t, e, n) { "use strict"; function r() { function t(t, e) { n = e } function e(t, e) { var r = t(); return void 0 !== r ? r : n[e] } var n = {}; return { defaults: t, get: e } } e.exports = r }, {}], 5: [function (t, e, n) { "use strict"; function r() { function t(t) { var e = {}; return this.each(function (t, n) { e[n] = t }), e } return { dump: t } } e.exports = r }, {}], 6: [function (t, e, n) { "use strict"; function r() { function t(t, e, n) { return c.on(e, u(this, n)) } function e(t, e) { c.off(e) } function n(t, e, n) { c.once(e, u(this, n)) } function r(t, e, n) { var r = this.get(e); t(), c.fire(e, n, r) } function i(t, e) { var n = this.get(e); t(), c.fire(e, void 0, n) } function a(t) { var e = {}; this.each(function (t, n) { e[n] = t }), t(), s(e, function (t, e) { c.fire(e, void 0, t) }) } var c = o(); return { watch: t, unwatch: e, once: n, set: r, remove: i, clearAll: a } } function o() { return a(f, { _id: 0, _subSignals: {}, _subCallbacks: {} }) } var i = t("../src/util"), u = i.bind, s = i.each, a = i.create, c = i.slice; e.exports = r; var f = { _id: null, _subCallbacks: null, _subSignals: null, on: function (t, e) { return this._subCallbacks[t] || (this._subCallbacks[t] = {}), this._id += 1, this._subCallbacks[t][this._id] = e, this._subSignals[this._id] = t, this._id }, off: function (t) { var e = this._subSignals[t]; delete this._subCallbacks[e][t], delete this._subSignals[t] }, once: function (t, e) { var n = this.on(t, u(this, function () { e.apply(this, arguments), this.off(n) })) }, fire: function (t) { var e = c(arguments, 1); s(this._subCallbacks[t], function (t) { t.apply(this, e) }) } } }, { "../src/util": 16 }], 7: [function (t, e, n) { "use strict"; function r() { function t(t, e, n, r) { return this.hasNamespace(o) || s.set(e, r), t() } function e(t, e) { return this.hasNamespace(o) || u.call(this, e), t() } function n(t, e) { return this.hasNamespace(o) || s.remove(e), t() } function r(t, e) { return s.get(e) } function i(t) { var e = []; this.each(function (t, n) { e.push(n) }); for (var n = 0; n < e.length; n++)u.call(this, e[n]) } function u(t) { var e = s.get(t, Number.MAX_VALUE); e <= (new Date).getTime() && (this.raw.remove(t), s.remove(t)) } var s = this.createStore(this.storage, null, this._namespacePrefix + o); return { set: t, get: e, remove: n, getExpiration: r, removeExpiredKeys: i } } var o = "expire_mixin"; e.exports = r }, {}], 8: [function (t, e, n) { "use strict"; function r() { return t("./lib/json2"), {} } e.exports = r }, { "./lib/json2": 9 }], 9: [function (require, module, exports) { "use strict"; var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }; "object" !== ("undefined" == typeof JSON ? "undefined" : _typeof(JSON)) && (JSON = {}), function () { function f(t) { return t < 10 ? "0" + t : t } function this_value() { return this.valueOf() } function quote(t) { return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function (t) { var e = meta[t]; return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + t + '"' } function str(t, e) { var n, r, o, i, u, s = gap, a = e[t]; switch (a && "object" === ("undefined" == typeof a ? "undefined" : _typeof(a)) && "function" == typeof a.toJSON && (a = a.toJSON(t)), "function" == typeof rep && (a = rep.call(e, t, a)), "undefined" == typeof a ? "undefined" : _typeof(a)) { case "string": return quote(a); case "number": return isFinite(a) ? String(a) : "null"; case "boolean": case "null": return String(a); case "object": if (!a) return "null"; if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(a)) { for (i = a.length, n = 0; n < i; n += 1)u[n] = str(n, a) || "null"; return o = 0 === u.length ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + s + "]" : "[" + u.join(",") + "]", gap = s, o } if (rep && "object" === ("undefined" == typeof rep ? "undefined" : _typeof(rep))) for (i = rep.length, n = 0; n < i; n += 1)"string" == typeof rep[n] && (r = rep[n], o = str(r, a), o && u.push(quote(r) + (gap ? ": " : ":") + o)); else for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (o = str(r, a), o && u.push(quote(r) + (gap ? ": " : ":") + o)); return o = 0 === u.length ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + s + "}" : "{" + u.join(",") + "}", gap = s, o } } var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value); var gap, indent, meta, rep; "function" != typeof JSON.stringify && (meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function (t, e, n) { var r; if (gap = "", indent = "", "number" == typeof n) for (r = 0; r < n; r += 1)indent += " "; else "string" == typeof n && (indent = n); if (rep = e, e && "function" != typeof e && ("object" !== ("undefined" == typeof e ? "undefined" : _typeof(e)) || "number" != typeof e.length)) throw new Error("JSON.stringify"); return str("", { "": t }) }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) { function walk(t, e) { var n, r, o = t[e]; if (o && "object" === ("undefined" == typeof o ? "undefined" : _typeof(o))) for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (r = walk(o, n), void 0 !== r ? o[n] = r : delete o[n]); return reviver.call(t, e, o) } var j; if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (t) { return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse") }) }() }, {}], 10: [function (t, e, n) { "use strict"; var r = function () { function t(t, e) { if (!o[t]) { o[t] = {}; for (var n = 0; n < t.length; n++)o[t][t.charAt(n)] = n } return o[t][e] } var e = String.fromCharCode, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", o = {}, i = { compressToBase64: function (t) { if (null == t) return ""; var e = i._compress(t, 6, function (t) { return n.charAt(t) }); switch (e.length % 4) { default: case 0: return e; case 1: return e + "==="; case 2: return e + "=="; case 3: return e + "=" } }, decompressFromBase64: function (e) { return null == e ? "" : "" == e ? null : i._decompress(e.length, 32, function (r) { return t(n, e.charAt(r)) }) }, compressToUTF16: function (t) { return null == t ? "" : i._compress(t, 15, function (t) { return e(t + 32) }) + " " }, decompressFromUTF16: function (t) { return null == t ? "" : "" == t ? null : i._decompress(t.length, 16384, function (e) { return t.charCodeAt(e) - 32 }) }, compressToUint8Array: function (t) { for (var e = i.compress(t), n = new Uint8Array(2 * e.length), r = 0, o = e.length; r < o; r++) { var u = e.charCodeAt(r); n[2 * r] = u >>> 8, n[2 * r + 1] = u % 256 } return n }, decompressFromUint8Array: function (t) { if (null === t || void 0 === t) return i.decompress(t); for (var n = new Array(t.length / 2), r = 0, o = n.length; r < o; r++)n[r] = 256 * t[2 * r] + t[2 * r + 1]; var u = []; return n.forEach(function (t) { u.push(e(t)) }), i.decompress(u.join("")) }, compressToEncodedURIComponent: function (t) { return null == t ? "" : i._compress(t, 6, function (t) { return r.charAt(t) }) }, decompressFromEncodedURIComponent: function (e) { return null == e ? "" : "" == e ? null : (e = e.replace(/ /g, "+"), i._decompress(e.length, 32, function (n) { return t(r, e.charAt(n)) })) }, compress: function (t) { return i._compress(t, 16, function (t) { return e(t) }) }, _compress: function (t, e, n) { if (null == t) return ""; var r, o, i, u = {}, s = {}, a = "", c = "", f = "", l = 2, p = 3, h = 2, d = [], g = 0, v = 0; for (i = 0; i < t.length; i += 1)if (a = t.charAt(i), Object.prototype.hasOwnProperty.call(u, a) || (u[a] = p++ , s[a] = !0), c = f + a, Object.prototype.hasOwnProperty.call(u, c)) f = c; else { if (Object.prototype.hasOwnProperty.call(s, f)) { if (f.charCodeAt(0) < 256) { for (r = 0; r < h; r++)g <<= 1, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++; for (o = f.charCodeAt(0), r = 0; r < 8; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++ , o >>= 1 } else { for (o = 1, r = 0; r < h; r++)g = g << 1 | o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++ , o = 0; for (o = f.charCodeAt(0), r = 0; r < 16; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++ , o >>= 1 } l-- , 0 == l && (l = Math.pow(2, h), h++), delete s[f] } else for (o = u[f], r = 0; r < h; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++ , o >>= 1; l-- , 0 == l && (l = Math.pow(2, h), h++), u[c] = p++ , f = String(a) } if ("" !== f) { if (Object.prototype.hasOwnProperty.call(s, f)) { if (f.charCodeAt(0) < 256) { for (r = 0; r < h; r++)g <<= 1, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++; for (o = f.charCodeAt(0), r = 0; r < 8; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++ , o >>= 1 } else { for (o = 1, r = 0; r < h; r++)g = g << 1 | o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++ , o = 0; for (o = f.charCodeAt(0), r = 0; r < 16; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++ , o >>= 1 } l-- , 0 == l && (l = Math.pow(2, h), h++), delete s[f] } else for (o = u[f], r = 0; r < h; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++ , o >>= 1; l-- , 0 == l && (l = Math.pow(2, h), h++) } for (o = 2, r = 0; r < h; r++)g = g << 1 | 1 & o, v == e - 1 ? (v = 0, d.push(n(g)), g = 0) : v++ , o >>= 1; for (; ;) { if (g <<= 1, v == e - 1) { d.push(n(g)); break } v++ } return d.join("") }, decompress: function (t) { return null == t ? "" : "" == t ? null : i._decompress(t.length, 32768, function (e) { return t.charCodeAt(e) }) }, _decompress: function (t, n, r) { var o, i, u, s, a, c, f, l, p = [], h = 4, d = 4, g = 3, v = "", m = [], y = { val: r(0), position: n, index: 1 }; for (i = 0; i < 3; i += 1)p[i] = i; for (s = 0, c = Math.pow(2, 2), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1; switch (o = s) { case 0: for (s = 0, c = Math.pow(2, 8), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1; l = e(s); break; case 1: for (s = 0, c = Math.pow(2, 16), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1; l = e(s); break; case 2: return "" }for (p[3] = l, u = l, m.push(l); ;) { if (y.index > t) return ""; for (s = 0, c = Math.pow(2, g), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1; switch (l = s) { case 0: for (s = 0, c = Math.pow(2, 8), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1; p[d++] = e(s), l = d - 1, h--; break; case 1: for (s = 0, c = Math.pow(2, 16), f = 1; f != c;)a = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = r(y.index++)), s |= (a > 0 ? 1 : 0) * f, f <<= 1; p[d++] = e(s), l = d - 1, h--; break; case 2: return m.join("") }if (0 == h && (h = Math.pow(2, g), g++), p[l]) v = p[l]; else { if (l !== d) return null; v = u + u.charAt(0) } m.push(v), p[d++] = u + v.charAt(0), h-- , u = v, 0 == h && (h = Math.pow(2, g), g++) } } }; return i }(); "function" == typeof define && define.amd ? define(function () { return r }) : "undefined" != typeof e && null != e && (e.exports = r) }, {}], 11: [function (t, e, n) { "use strict"; function r() { function t(t, e, n) { var r = this.watch(e, n); return n(this.get(e)), r } function e(t, e) { this.unwatch(e) } return { observe: t, unobserve: e } } var o = t("./events"); e.exports = [o, r] }, { "./events": 6 }], 12: [function (t, e, n) { "use strict"; function r() { function t(t, e, n, r, o, i) { return a.call(this, "push", arguments) } function e(t, e) { return a.call(this, "pop", arguments) } function n(t, e) { return a.call(this, "shift", arguments) } function r(t, e, n, r, o, i) { return a.call(this, "unshift", arguments) } function i(t, e, n, r, i, a) { var c = u(arguments, 2); return this.update(e, {}, function (t) { if ("object" != ("undefined" == typeof t ? "undefined" : o(t))) throw new Error('store.assign called for non-object value with key "' + e + '"'); return c.unshift(t), s.apply(Object, c) }) } function a(t, e) { var n, r = e[1], o = u(e, 2); return this.update(r, [], function (e) { n = Array.prototype[t].apply(e, o) }), n } return { push: t, pop: e, shift: n, unshift: r, assign: i } } var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }, i = t("../src/util"), u = i.slice, s = i.assign, a = t("./update"); e.exports = [a, r] }, { "../src/util": 16, "./update": 13 }], 13: [function (t, e, n) { "use strict"; function r() { function t(t, e, n, r) { 3 == arguments.length && (r = n, n = void 0); var o = this.get(e, n), i = r(o); this.set(e, void 0 != i ? i : o) } return { update: t } } e.exports = r }, {}], 14: [function (t, e, n) { "use strict"; function r() { return this.disabled = !this.enabled, { has: o, transact: i, clear: u, forEach: s, getAll: a, serialize: c, deserialize: f } } function o(t, e) { return void 0 !== this.get(e) } function i(t, e, n, r) { null == r && (r = n, n = null), null == n && (n = {}); var o = this.get(e, n), i = r(o); this.set(e, void 0 === i ? o : i) } function u(t) { return this.clearAll.call(this) } function s(t, e) { return this.each.call(this, function (t, n) { e(n, t) }) } function a(t) { return this.dump.call(this) } function c(t, e) { return JSON.stringify(e) } function f(t, e) { if ("string" == typeof e) try { return JSON.parse(e) } catch (n) { return e || void 0 } } var l = t("./dump"), p = t("./json2"); e.exports = [l, p, r] }, { "./dump": 5, "./json2": 8 }], 15: [function (t, e, n) { "use strict"; function r() { var t = "undefined" == typeof console ? null : console; if (t) { var e = t.warn ? t.warn : t.log; e.apply(t, arguments) } } function o(t, e, n) { n || (n = ""), t && !l(t) && (t = [t]), e && !l(e) && (e = [e]); var o = n ? "__storejs_" + n + "_" : "", i = n ? new RegExp("^" + o) : null, g = /^[a-zA-Z0-9_\-]*$/; if (!g.test(n)) throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes"); var v = { _namespacePrefix: o, _namespaceRegexp: i, _testStorage: function (t) { try { var e = "__storejs__test__"; t.write(e, e); var n = t.read(e) === e; return t.remove(e), n } catch (r) { return !1 } }, _assignPluginFnProp: function (t, e) { var n = this[e]; this[e] = function () { function e() { if (n) return a(arguments, function (t, e) { r[e] = t }), n.apply(o, r) } var r = u(arguments, 0), o = this, i = [e].concat(r); return t.apply(o, i) } }, _serialize: function (t) { return JSON.stringify(t) }, _deserialize: function (t, e) { if (!t) return e; var n = ""; try { n = JSON.parse(t) } catch (r) { n = t } return void 0 !== n ? n : e }, _addStorage: function (t) { this.enabled || this._testStorage(t) && (this.storage = t, this.enabled = !0) }, _addPlugin: function (t) { var e = this; if (l(t)) return void a(t, function (t) { e._addPlugin(t) }); var n = s(this.plugins, function (e) { return t === e }); if (!n) { if (this.plugins.push(t), !p(t)) throw new Error("Plugins must be function values that return objects"); var r = t.call(this); if (!h(r)) throw new Error("Plugins must return an object of function properties"); a(r, function (n, r) { if (!p(n)) throw new Error("Bad plugin property: " + r + " from plugin " + t.name + ". Plugins should only return functions."); e._assignPluginFnProp(n, r) }) } }, addStorage: function (t) { r("store.addStorage(storage) is deprecated. Use createStore([storages])"), this._addStorage(t) } }, m = f(v, d, { plugins: [] }); return m.raw = {}, a(m, function (t, e) { p(t) && (m.raw[e] = c(m, t)) }), a(t, function (t) { m._addStorage(t) }), a(e, function (t) { m._addPlugin(t) }), m } var i = t("./util"), u = i.slice, s = i.pluck, a = i.each, c = i.bind, f = i.create, l = i.isList, p = i.isFunction, h = i.isObject; e.exports = { createStore: o }; var d = { version: "2.0.12", enabled: !1, get: function (t, e) { var n = this.storage.read(this._namespacePrefix + t); return this._deserialize(n, e) }, set: function (t, e) { return void 0 === e ? this.remove(t) : (this.storage.write(this._namespacePrefix + t, this._serialize(e)), e) }, remove: function (t) { this.storage.remove(this._namespacePrefix + t) }, each: function (t) { var e = this; this.storage.each(function (n, r) { t.call(e, e._deserialize(n), (r || "").replace(e._namespaceRegexp, "")) }) }, clearAll: function () { this.storage.clearAll() }, hasNamespace: function (t) { return this._namespacePrefix == "__storejs_" + t + "_" }, createStore: function () { return o.apply(this, arguments) }, addPlugin: function (t) { this._addPlugin(t) }, namespace: function (t) { return o(this.storage, this.plugins, t) } } }, { "./util": 16 }], 16: [function (t, e, n) { (function (t) { "use strict"; function n() { return Object.assign ? Object.assign : function (t, e, n, r) { for (var o = 1; o < arguments.length; o++)s(Object(arguments[o]), function (e, n) { t[n] = e }); return t } } function r() { if (Object.create) return function (t, e, n, r) { var o = u(arguments, 1); return h.apply(this, [Object.create(t)].concat(o)) }; var t = function () { }; return function (e, n, r, o) { var i = u(arguments, 1); return t.prototype = e, h.apply(this, [new t].concat(i)) } } function o() { return String.prototype.trim ? function (t) { return String.prototype.trim.call(t) } : function (t) { return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") } } function i(t, e) { return function () { return e.apply(t, Array.prototype.slice.call(arguments, 0)) } } function u(t, e) { return Array.prototype.slice.call(t, e || 0) } function s(t, e) { c(t, function (t, n) { return e(t, n), !1 }) } function a(t, e) { var n = f(t) ? [] : {}; return c(t, function (t, r) { return n[r] = e(t, r), !1 }), n } function c(t, e) { if (f(t)) { for (var n = 0; n < t.length; n++)if (e(t[n], n)) return t[n] } else for (var r in t) if (t.hasOwnProperty(r) && e(t[r], r)) return t[r] } function f(t) { return null != t && "function" != typeof t && "number" == typeof t.length } function l(t) { return t && "[object Function]" === {}.toString.call(t) } function p(t) { return t && "[object Object]" === {}.toString.call(t) } var h = n(), d = r(), g = o(), v = "undefined" != typeof window ? window : t; e.exports = { assign: h, create: d, trim: g, bind: i, slice: u, each: s, map: a, pluck: c, isList: f, isFunction: l, isObject: p, Global: v } }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}) }, {}], 17: [function (t, e, n) { "use strict"; e.exports = [t("./localStorage"), t("./oldFF-globalStorage"), t("./oldIE-userDataStorage"), t("./cookieStorage"), t("./sessionStorage"), t("./memoryStorage")] }, { "./cookieStorage": 18, "./localStorage": 19, "./memoryStorage": 20, "./oldFF-globalStorage": 21, "./oldIE-userDataStorage": 22, "./sessionStorage": 23 }], 18: [function (t, e, n) { "use strict"; function r(t) { if (!t || !a(t)) return null; var e = "(?:^|.*;\\s*)" + escape(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"; return unescape(p.cookie.replace(new RegExp(e), "$1")) } function o(t) { for (var e = p.cookie.split(/; ?/g), n = e.length - 1; n >= 0; n--)if (l(e[n])) { var r = e[n].split("="), o = unescape(r[0]), i = unescape(r[1]); t(i, o) } } function i(t, e) { t && (p.cookie = escape(t) + "=" + escape(e) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/") } function u(t) { t && a(t) && (p.cookie = escape(t) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/") } function s() { o(function (t, e) { u(e) }) } function a(t) { return new RegExp("(?:^|;\\s*)" + escape(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(p.cookie) } var c = t("../src/util"), f = c.Global, l = c.trim; e.exports = { name: "cookieStorage", read: r, write: i, each: o, remove: u, clearAll: s }; var p = f.document }, { "../src/util": 16 }], 19: [function (t, e, n) { "use strict"; function r() { return f.localStorage } function o(t) { return r().getItem(t) } function i(t, e) { return r().setItem(t, e) } function u(t) { for (var e = r().length - 1; e >= 0; e--) { var n = r().key(e); t(o(n), n) } } function s(t) { return r().removeItem(t) } function a() { return r().clear() } var c = t("../src/util"), f = c.Global; e.exports = { name: "localStorage", read: o, write: i, each: u, remove: s, clearAll: a } }, { "../src/util": 16 }], 20: [function (t, e, n) { "use strict"; function r(t) { return a[t] } function o(t, e) { a[t] = e } function i(t) { for (var e in a) a.hasOwnProperty(e) && t(a[e], e) } function u(t) { delete a[t] } function s(t) { a = {} } e.exports = { name: "memoryStorage", read: r, write: o, each: i, remove: u, clearAll: s }; var a = {} }, {}], 21: [function (t, e, n) { "use strict"; function r(t) { return f[t] } function o(t, e) { f[t] = e } function i(t) { for (var e = f.length - 1; e >= 0; e--) { var n = f.key(e); t(f[n], n) } } function u(t) { return f.removeItem(t) } function s() { i(function (t, e) { delete f[t] }) } var a = t("../src/util"), c = a.Global; e.exports = { name: "oldFF-globalStorage", read: r, write: o, each: i, remove: u, clearAll: s }; var f = c.globalStorage }, { "../src/util": 16 }], 22: [function (t, e, n) { "use strict"; function r(t, e) { if (!g) { var n = a(t); d(function (t) { t.setAttribute(n, e), t.save(p) }) } } function o(t) { if (!g) { var e = a(t), n = null; return d(function (t) { n = t.getAttribute(e) }), n } } function i(t) { d(function (e) { for (var n = e.XMLDocument.documentElement.attributes, r = n.length - 1; r >= 0; r--) { var o = n[r]; t(e.getAttribute(o.name), o.name) } }) } function u(t) { var e = a(t); d(function (t) { t.removeAttribute(e), t.save(p) }) } function s() { d(function (t) { var e = t.XMLDocument.documentElement.attributes; t.load(p); for (var n = e.length - 1; n >= 0; n--)t.removeAttribute(e[n].name); t.save(p) }) } function a(t) { return t.replace(/^\d/, "___$&").replace(v, "___") } function c() { if (!h || !h.documentElement || !h.documentElement.addBehavior) return null; var t, e, n, r = "script"; try { e = new ActiveXObject("htmlfile"), e.open(), e.write("<" + r + ">document.w=window</" + r + '><iframe src="/favicon.ico"></iframe>'), e.close(), t = e.w.frames[0].document, n = t.createElement("div") } catch (o) { n = h.createElement("div"), t = h.body } return function (e) { var r = [].slice.call(arguments, 0); r.unshift(n), t.appendChild(n), n.addBehavior("#default#userData"), n.load(p), e.apply(this, r), t.removeChild(n) } } var f = t("../src/util"), l = f.Global; e.exports = { name: "oldIE-userDataStorage", write: r, read: o, each: i, remove: u, clearAll: s }; var p = "storejs", h = l.document, d = c(), g = (l.navigator ? l.navigator.userAgent : "").match(/ (MSIE 8|MSIE 9|MSIE 10)\./), v = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g") }, { "../src/util": 16 }], 23: [function (t, e, n) { "use strict"; function r() { return f.sessionStorage } function o(t) { return r().getItem(t) } function i(t, e) { return r().setItem(t, e) } function u(t) { for (var e = r().length - 1; e >= 0; e--) { var n = r().key(e); t(o(n), n) } } function s(t) { return r().removeItem(t) } function a() { return r().clear() } var c = t("../src/util"), f = c.Global; e.exports = { name: "sessionStorage", read: o, write: i, each: u, remove: s, clearAll: a } }, { "../src/util": 16 }] }, {}, [1])(1) });


    ; (function ($, window, document, undefined) {
        "use strict";

        var rvFontsize = "rvFontsize",
            defaults = {
                targetSection: 'body',
                store: false,
                storeIsDefined: !(typeof store === "undefined"),
                variations: 7,
                controllers: {
                    append: true,
                    appendTo: 'body',
                    showResetButton: false,
                    template: ''
                }
            };

        function Plugin(element, options) {
            var _self = this;

            _self.element = element;
            _self.options = $.extend({}, defaults, options);

            _self._defaults = defaults;
            _self._name = rvFontsize;

            _self.init();
        }

        Plugin.prototype = {

            init: function () {
                var _self = this,
                    fn = function () {
                        _self.defineElements();
                        _self.getDefaultFontSize();
                    };

                fn();

                if (_self.options.store === true && !(_self.options.storeIsDefined)) {
                    _self.dependencyWarning();
                }
            },

            dependencyWarning: function () {
                console.warn('When you difine "store: true", store script is required (https://github.com/ramonvictor/rv-jquery-fontsize/blob/master/js/store.min.js)');
            },

            bindControlerHandlers: function () {

                var _self = this;

                // decrease fn
                _self.$decreaseButton = $('.rvfs-decrease');
                if (_self.$decreaseButton.length > 0) {

                    _self.$decreaseButton.on('click', function (e) {
                        e.preventDefault();
                        var $el = $(this);

                        if (!$el.hasClass('disabled')) {
                            var n = _self.getCurrentVariation();
                            if (n > 1) {
                                _self.$target.removeClass('rvfs-' + n);
                                _self.$target.attr('data-rvfs', n - 1);
                                if (_self.options.store === true) {
                                    _self.storeCurrentSize();
                                }
                                _self.fontsizeChanged();
                            }
                        }
                    });
                }

                // increase fn
                _self.$increaseButton = $('.rvfs-increase');
                if (_self.$increaseButton.length > 0) {
                    _self.$increaseButton.on('click', function (e) {
                        e.preventDefault();
                        var $el = $(this);

                        if (!$el.hasClass('disabled')) {
                            var n = _self.getCurrentVariation();
                            if (n < _self.options.variations) {
                                _self.$target.removeClass('rvfs-' + n);
                                _self.$target.attr('data-rvfs', n + 1);

                                if (_self.options.store === true) {
                                    _self.storeCurrentSize();
                                }
                                _self.fontsizeChanged();
                            }
                        }
                    });
                }

                // reset the font size to its default
                _self.$resetButton = $(".rvfs-reset");
                if (_self.$resetButton.length > 0) {
                    _self.$resetButton.on('click', function (e) {
                        e.preventDefault();
                        var $el = $(this);

                        if (!$el.hasClass('disabled')) {
                            var n = _self.getCurrentVariation();
                            _self.$target.removeClass('rvfs-' + n);

                            _self.$target.attr('data-rvfs', _self.defaultFontsize);
                            if (_self.options.store === true) {
                                _self.storeCurrentSize();
                            }
                            _self.fontsizeChanged();
                        }
                    });
                }

            },

            defineElements: function () {
                var _self = this;
                _self.$target = $(_self.options.targetSection);

                if (_self.options.controllers.append !== false) {
                    var resetButton = _self.options.controllers.showResetButton ? '<a href="javascript;" class="rvfs-reset btn" title="Default font size">A</a>' : '';
                    var template = _self.options.controllers.template,
                        controllersHtml = '';
                    _self.$appendTo = $(_self.options.controllers.appendTo);

                    if ($.trim(template).length > 0) {
                        controllersHtml = template;
                    } else {
                        controllersHtml = '<div class="btn-group">' +
                            '<a href="javascript;" class="rvfs-decrease btn" title="Decrease font size">A-</a></li>' +
                            resetButton +
                            '<a href="javascript;" class="rvfs-increase btn" title="Increase font size">A+</a></li>' +
                            '</div>';
                    }

                    _self.$appendTo.html(controllersHtml);

                    _self.bindControlerHandlers();
                }
            },

            getDefaultFontSize: function () {
                var _self = this,
                    v = _self.options.variations;
                _self.defaultFontsize = 0;

                if (v % 2 === 0) {
                    _self.defaultFontsize = (v / 2) + 1;
                } else {
                    _self.defaultFontsize = parseInt((v / 2) + 1, 10);
                }

                _self.setDefaultFontSize();
            },

            setDefaultFontSize: function () {
                var _self = this;

                if (_self.options.store === true && _self.options.storeIsDefined) {
                    var currentFs = store.get('rvfs') || _self.defaultFontsize;
                    _self.$target.attr("data-rvfs", currentFs);
                } else {
                    _self.$target.attr("data-rvfs", _self.defaultFontsize);
                }

                _self.fontsizeChanged();
            },

            storeCurrentSize: function () {
                var _self = this;
                if (_self.options.storeIsDefined) {
                    store.set('rvfs', _self.$target.attr("data-rvfs"));
                } else {
                    _self.dependencyWarning();
                }
            },

            getCurrentVariation: function () {
                return parseInt(this.$target.attr("data-rvfs"), 10);
            },

            fontsizeChanged: function () {
                var _self = this,
                    currentFs = _self.getCurrentVariation();
                _self.$target.addClass("rvfs-" + currentFs);

                if (currentFs === _self.defaultFontsize) {
                    _self.$resetButton.addClass('disabled');
                } else {
                    _self.$resetButton.removeClass('disabled');
                }

                if (currentFs === _self.options.variations) {
                    _self.$increaseButton.addClass('disabled');
                } else {
                    _self.$increaseButton.removeClass('disabled');
                }

                if (currentFs === 1) {
                    _self.$decreaseButton.addClass('disabled');
                } else {
                    _self.$decreaseButton.removeClass('disabled');
                }
            }
        };


        $.fn[rvFontsize] = function (options) {
            var _self = this;
            return _self.each(function () {
                if (!$.data(_self, "plugin_" + rvFontsize)) {
                    $.data(_self, "plugin_" + rvFontsize, new Plugin(_self, options));
                }
            });
        };

        $[rvFontsize] = function () {
            var $window = $(window);
            return $window.rvFontsize.apply($window, Array.prototype.slice.call(arguments, 0));
        };


    })(jQuery, window, document);