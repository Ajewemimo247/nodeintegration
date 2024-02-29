/*! For license information please see loader.template.js.LICENSE.txt */
(() => {
    var t = {
            228: t => {
                t.exports = function() {
                    var t = !1; - 1 !== navigator.appVersion.indexOf("MSIE 10") && (t = !0);
                    var e, n = [],
                        r = "object" == typeof document && document,
                        o = t ? r.documentElement.doScroll("left") : r.documentElement.doScroll,
                        i = "DOMContentLoaded",
                        s = r && (o ? /^loaded|^c/ : /^loaded|^i|^c/).test(r.readyState);
                    return !s && r && r.addEventListener(i, e = function() {
                            for (r.removeEventListener(i, e), s = 1; e = n.shift();) e()
                        }),
                        function(t) {
                            s ? setTimeout(t, 0) : n.push(t)
                        }
                }()
            },
            412: (t, e, n) => {
                "use strict";
                n.r(e);
                const r = function(t) {
                        var e = this.constructor;
                        return this.then((function(n) {
                            return e.resolve(t()).then((function() {
                                return n
                            }))
                        }), (function(n) {
                            return e.resolve(t()).then((function() {
                                return e.reject(n)
                            }))
                        }))
                    },
                    o = function(t) {
                        return new this((function(e, n) {
                            if (!t || void 0 === t.length) return n(new TypeError(typeof t + " " + t + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
                            var r = Array.prototype.slice.call(t);
                            if (0 === r.length) return e([]);
                            var o = r.length;

                            function i(t, n) {
                                if (n && ("object" == typeof n || "function" == typeof n)) {
                                    var s = n.then;
                                    if ("function" == typeof s) return void s.call(n, (function(e) {
                                        i(t, e)
                                    }), (function(n) {
                                        r[t] = {
                                            status: "rejected",
                                            reason: n
                                        }, 0 == --o && e(r)
                                    }))
                                }
                                r[t] = {
                                    status: "fulfilled",
                                    value: n
                                }, 0 == --o && e(r)
                            }
                            for (var s = 0; s < r.length; s++) i(s, r[s])
                        }))
                    };
                var i = setTimeout,
                    s = "undefined" != typeof setImmediate ? setImmediate : null;

                function a(t) {
                    return Boolean(t && void 0 !== t.length)
                }

                function c() {}

                function u(t) {
                    if (!(this instanceof u)) throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof t) throw new TypeError("not a function");
                    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], y(t, this)
                }

                function l(t, e) {
                    for (; 3 === t._state;) t = t._value;
                    0 !== t._state ? (t._handled = !0, u._immediateFn((function() {
                        var n = 1 === t._state ? e.onFulfilled : e.onRejected;
                        if (null !== n) {
                            var r;
                            try {
                                r = n(t._value)
                            } catch (t) {
                                return void d(e.promise, t)
                            }
                            p(e.promise, r)
                        } else(1 === t._state ? p : d)(e.promise, t._value)
                    }))) : t._deferreds.push(e)
                }

                function p(t, e) {
                    try {
                        if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
                        if (e && ("object" == typeof e || "function" == typeof e)) {
                            var n = e.then;
                            if (e instanceof u) return t._state = 3, t._value = e, void f(t);
                            if ("function" == typeof n) return void y((r = n, o = e, function() {
                                r.apply(o, arguments)
                            }), t)
                        }
                        t._state = 1, t._value = e, f(t)
                    } catch (e) {
                        d(t, e)
                    }
                    var r, o
                }

                function d(t, e) {
                    t._state = 2, t._value = e, f(t)
                }

                function f(t) {
                    2 === t._state && 0 === t._deferreds.length && u._immediateFn((function() {
                        t._handled || u._unhandledRejectionFn(t._value)
                    }));
                    for (var e = 0, n = t._deferreds.length; e < n; e++) l(t, t._deferreds[e]);
                    t._deferreds = null
                }

                function h(t, e, n) {
                    this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = n
                }

                function y(t, e) {
                    var n = !1;
                    try {
                        t((function(t) {
                            n || (n = !0, p(e, t))
                        }), (function(t) {
                            n || (n = !0, d(e, t))
                        }))
                    } catch (t) {
                        if (n) return;
                        n = !0, d(e, t)
                    }
                }
                u.prototype.catch = function(t) {
                    return this.then(null, t)
                }, u.prototype.then = function(t, e) {
                    var n = new this.constructor(c);
                    return l(this, new h(t, e, n)), n
                }, u.prototype.finally = r, u.all = function(t) {
                    return new u((function(e, n) {
                        if (!a(t)) return n(new TypeError("Promise.all accepts an array"));
                        var r = Array.prototype.slice.call(t);
                        if (0 === r.length) return e([]);
                        var o = r.length;

                        function i(t, s) {
                            try {
                                if (s && ("object" == typeof s || "function" == typeof s)) {
                                    var a = s.then;
                                    if ("function" == typeof a) return void a.call(s, (function(e) {
                                        i(t, e)
                                    }), n)
                                }
                                r[t] = s, 0 == --o && e(r)
                            } catch (t) {
                                n(t)
                            }
                        }
                        for (var s = 0; s < r.length; s++) i(s, r[s])
                    }))
                }, u.allSettled = o, u.resolve = function(t) {
                    return t && "object" == typeof t && t.constructor === u ? t : new u((function(e) {
                        e(t)
                    }))
                }, u.reject = function(t) {
                    return new u((function(e, n) {
                        n(t)
                    }))
                }, u.race = function(t) {
                    return new u((function(e, n) {
                        if (!a(t)) return n(new TypeError("Promise.race accepts an array"));
                        for (var r = 0, o = t.length; r < o; r++) u.resolve(t[r]).then(e, n)
                    }))
                }, u._immediateFn = "function" == typeof s && function(t) {
                    s(t)
                } || function(t) {
                    i(t, 0)
                }, u._unhandledRejectionFn = function(t) {
                    "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
                };
                const v = u;
                var w = function() {
                    if ("undefined" != typeof self) return self;
                    if ("undefined" != typeof window) return window;
                    if (void 0 !== n.g) return n.g;
                    throw new Error("unable to locate global object")
                }();
                "function" != typeof w.Promise ? w.Promise = v : (w.Promise.prototype.finally || (w.Promise.prototype.finally = r), w.Promise.allSettled || (w.Promise.allSettled = o))
            },
            42: (t, e, n) => {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.SmartsuppLoader = void 0;
                var r = n(521),
                    o = n(416),
                    i = n(35),
                    s = function() {
                        function t(t) {
                            this.options = t, this.widgets = {}, this.chats = this.widgets
                        }
                        return t.prototype.setDefaults = function(t) {
                            return this.options = (0, o.mergeDeep)(this.options, t), this
                        }, t.prototype.getChat = function(t) {
                            return this.widgets[t]
                        }, t.prototype.getWidget = function(t) {
                            return this.widgets[t]
                        }, t.prototype.create = function(t, e, n, s) {
                            var c = (0, o.mergeDeep)(this.options, e);
                            a(c);
                            var u = this.widgets[t] = new i.SmartsuppWidget(t, c, n);
                            return u._initPromise = (0, o.request)("".concat(c.bootstrapUrl, "/widget/").concat(c.key, ".json")).then((function(t) {
                                var n = (0, o.parseJSON)(t);
                                return delete e.features, u.init((0, o.mergeDeep)(n, e), n.features), e && e.widgetTrackerEnabled && 3 === e.widgetVersion && (0, r.trackOptions)(u.options, Object.keys(e)), s && s(void 0, u), u.options.renderTo && u.render(u.options.renderTo), null
                            })).catch((function(t) {
                                s && s(t)
                            })), u
                        }, t.prototype.createWidget = function(t, e, n) {
                            var s = this,
                                c = (0, o.mergeDeep)(this.options, e);
                            return a(c), (0, o.request)("".concat(c.bootstrapUrl, "/widget/").concat(c.key, ".json")).then((function(a) {
                                var u = (0, o.parseJSON)(a),
                                    l = s.widgets[t] = new i.SmartsuppWidget(t, c, n);
                                return delete e.features, l.init((0, o.mergeDeep)(u, e), u.features), e && e.widgetTrackerEnabled && 3 === e.widgetVersion && (0, r.trackOptions)(l.options, Object.keys(e)), l
                            }))
                        }, t
                    }();
                e.SmartsuppLoader = s;
                var a = function(t) {
                    if (!t.bootstrapUrl) throw new Error("Missing option bootstrapUrl");
                    if (!t.key) throw new Error("Missing option key")
                }
            },
            521: function(t, e, n) {
                "use strict";
                var r = this && this.__awaiter || function(t, e, n, r) {
                        return new(n || (n = Promise))((function(o, i) {
                            function s(t) {
                                try {
                                    c(r.next(t))
                                } catch (t) {
                                    i(t)
                                }
                            }

                            function a(t) {
                                try {
                                    c(r.throw(t))
                                } catch (t) {
                                    i(t)
                                }
                            }

                            function c(t) {
                                var e;
                                t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n((function(t) {
                                    t(e)
                                }))).then(s, a)
                            }
                            c((r = r.apply(t, e || [])).next())
                        }))
                    },
                    o = this && this.__generator || function(t, e) {
                        var n, r, o, i, s = {
                            label: 0,
                            sent: function() {
                                if (1 & o[0]) throw o[1];
                                return o[1]
                            },
                            trys: [],
                            ops: []
                        };
                        return i = {
                            next: a(0),
                            throw: a(1),
                            return: a(2)
                        }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                            return this
                        }), i;

                        function a(i) {
                            return function(a) {
                                return function(i) {
                                    if (n) throw new TypeError("Generator is already executing.");
                                    for (; s;) try {
                                        if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                                        switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                            case 0:
                                            case 1:
                                                o = i;
                                                break;
                                            case 4:
                                                return s.label++, {
                                                    value: i[1],
                                                    done: !1
                                                };
                                            case 5:
                                                s.label++, r = i[1], i = [0];
                                                continue;
                                            case 7:
                                                i = s.ops.pop(), s.trys.pop();
                                                continue;
                                            default:
                                                if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                                    s = 0;
                                                    continue
                                                }
                                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                                    s.label = i[1];
                                                    break
                                                }
                                                if (6 === i[0] && s.label < o[1]) {
                                                    s.label = o[1], o = i;
                                                    break
                                                }
                                                if (o && s.label < o[2]) {
                                                    s.label = o[2], s.ops.push(i);
                                                    break
                                                }
                                                o[2] && s.ops.pop(), s.trys.pop();
                                                continue
                                        }
                                        i = e.call(t, s)
                                    } catch (t) {
                                        i = [6, t], r = 0
                                    } finally {
                                        n = o = 0
                                    }
                                    if (5 & i[0]) throw i[1];
                                    return {
                                        value: i[0] ? i[1] : void 0,
                                        done: !0
                                    }
                                }([i, a])
                            }
                        }
                    };
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.trackOptions = e.trackOperation = void 0;
                var i = n(416),
                    s = ["html:apply", "chat:message", "on"],
                    a = ["www.smartsupp.com", "app.smartsupp.com"],
                    c = ["key", "gaOptions", "gaName", "cookiePrefix", "cookiePath", "crossDomainEnabled", "position", "openOnTrigger"];
                e.trackOperation = function(t, e) {
                    return r(this, void 0, void 0, (function() {
                        return o(this, (function(n) {
                            switch (n.label) {
                                case 0:
                                    if (!t.widgetTrackerUrl || s.indexOf(e) >= 0 || a.indexOf(window.location.hostname) >= 0) return [2, !1];
                                    n.label = 1;
                                case 1:
                                    return n.trys.push([1, 3, , 4]), [4, (0, i.request)(t.widgetTrackerUrl + "/track/operation?key=".concat(t.key, "&operation=").concat(e, "&domain=").concat(window.location.hostname))];
                                case 2:
                                    return n.sent(), [2, !0];
                                case 3:
                                    return n.sent(), [2, !1];
                                case 4:
                                    return [2]
                            }
                        }))
                    }))
                }, e.trackOptions = function(t, e) {
                    return r(this, void 0, void 0, (function() {
                        var n;
                        return o(this, (function(r) {
                            switch (r.label) {
                                case 0:
                                    if (!t.widgetTrackerUrl || a.indexOf(window.location.hostname) >= 0) return [2, !1];
                                    if (0 === (n = e.filter((function(t) {
                                            return c.indexOf(t) < 0
                                        }))).length) return [2, !1];
                                    r.label = 1;
                                case 1:
                                    return r.trys.push([1, 3, , 4]), [4, (0, i.request)(t.widgetTrackerUrl + "/track/options?key=".concat(t.key, "&options=").concat(n.join(","), "&domain=").concat(window.location.hostname))];
                                case 2:
                                    return r.sent(), [2, !0];
                                case 3:
                                    return r.sent(), [2, !1];
                                case 4:
                                    return [2]
                            }
                        }))
                    }))
                }
            },
            416: (t, e) => {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.parseJSON = e.request = e.createLink = e.createScript = e.resolveTargetElement = e.mergeDeep = void 0;
                var n = function(t) {
                    return t && "object" == typeof t
                };
                e.mergeDeep = function() {
                    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    var o = {};
                    return t.forEach((function(t) {
                        Object.keys(t).forEach((function(r) {
                            var i = o[r],
                                s = t[r];
                            void 0 !== s && (Array.isArray(i) || Array.isArray(s) ? o[r] = s : n(i) && n(s) ? o[r] = (0, e.mergeDeep)(i, s) : o[r] = s)
                        }))
                    })), o
                }, e.resolveTargetElement = function(t) {
                    return t instanceof Element ? t : "string" == typeof t ? document.getElementById(t) : document.getElementsByTagName("body")[0]
                }, e.createScript = function(t, e) {
                    var n = t.createElement("script");
                    return n.type = "text/javascript", n.charset = "utf-8", e && (n.src = e), n
                }, e.createLink = function(t, e) {
                    var n = t.createElement("link");
                    return e && (n.href = e), n
                }, e.request = function(t) {
                    var e = new XMLHttpRequest;
                    return new Promise((function(n, r) {
                        e.onreadystatechange = function() {
                            4 === e.readyState && (e.status >= 200 && e.status < 300 ? n(e.response) : r(new Error("Request failed with status ".concat(e.status))))
                        }, e.open("GET", t, !0), e.setRequestHeader("Content-Type", "text/plain"), e.send()
                    }))
                }, e.parseJSON = function(t) {
                    if (JSON.parse) return JSON.parse(t);
                    if (JSON.decode) return JSON.decode(t);
                    throw new Error("Unable to parse json.")
                }
            },
            35: function(t, e, n) {
                "use strict";
                var r = this && this.__awaiter || function(t, e, n, r) {
                        return new(n || (n = Promise))((function(o, i) {
                            function s(t) {
                                try {
                                    c(r.next(t))
                                } catch (t) {
                                    i(t)
                                }
                            }

                            function a(t) {
                                try {
                                    c(r.throw(t))
                                } catch (t) {
                                    i(t)
                                }
                            }

                            function c(t) {
                                var e;
                                t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n((function(t) {
                                    t(e)
                                }))).then(s, a)
                            }
                            c((r = r.apply(t, e || [])).next())
                        }))
                    },
                    o = this && this.__generator || function(t, e) {
                        var n, r, o, i, s = {
                            label: 0,
                            sent: function() {
                                if (1 & o[0]) throw o[1];
                                return o[1]
                            },
                            trys: [],
                            ops: []
                        };
                        return i = {
                            next: a(0),
                            throw: a(1),
                            return: a(2)
                        }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                            return this
                        }), i;

                        function a(i) {
                            return function(a) {
                                return function(i) {
                                    if (n) throw new TypeError("Generator is already executing.");
                                    for (; s;) try {
                                        if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                                        switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                            case 0:
                                            case 1:
                                                o = i;
                                                break;
                                            case 4:
                                                return s.label++, {
                                                    value: i[1],
                                                    done: !1
                                                };
                                            case 5:
                                                s.label++, r = i[1], i = [0];
                                                continue;
                                            case 7:
                                                i = s.ops.pop(), s.trys.pop();
                                                continue;
                                            default:
                                                if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                                    s = 0;
                                                    continue
                                                }
                                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                                    s.label = i[1];
                                                    break
                                                }
                                                if (6 === i[0] && s.label < o[1]) {
                                                    s.label = o[1], o = i;
                                                    break
                                                }
                                                if (o && s.label < o[2]) {
                                                    s.label = o[2], s.ops.push(i);
                                                    break
                                                }
                                                o[2] && s.ops.pop(), s.trys.pop();
                                                continue
                                        }
                                        i = e.call(t, s)
                                    } catch (t) {
                                        i = [6, t], r = 0
                                    } finally {
                                        n = o = 0
                                    }
                                    if (5 & i[0]) throw i[1];
                                    return {
                                        value: i[0] ? i[1] : void 0,
                                        done: !0
                                    }
                                }([i, a])
                            }
                        }
                    };
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.SmartsuppWidget = void 0;
                var i = n(521),
                    s = n(416),
                    a = window,
                    c = "-application",
                    u = "-application-iframe",
                    l = function() {
                        function t(t, e, n) {
                            if (void 0 === n && (n = []), this.id = t, this.options = e, this._pushApi = n, this.rendered = !1, this.api = null, this.el = null, this.frame = null, this.version = 2, this.initialized = !1, !e.bootstrapUrl) throw new Error("Missing option bootstrapUrl");
                            if (!e.key) throw new Error("Missing option key")
                        }
                        return t.prototype.setOptions = function(t) {
                            return this.options = (0, s.mergeDeep)(this.options, t), this.features && (this.features.rating || (this.options.ratingEnabled = !1), this.features.groups || (this.options.groupSelectEnabled = !1), this.features.customize || (this.options.hideWidget = !1, this.options.hideOfflineChat = !1, this.options.numberControl = !1, this.options.requireLogin = !1, this.options.privacyNoticeEnabled = !0, this.options.orientation = "right"), this.features.ga || (this.options.googleAnalyticsEnabled = !1)), this
                        }, t.prototype.init = function(t, e) {
                            var n = this;
                            this.features = e, this.setOptions(t), this.initialized = !0, "auto" === this.options.position && (this.options.position = this.options.renderTo ? "relative" : "fixed"), this._pushApi && this._pushApi.forEach((function(t) {
                                "recording:disable" === t[0] ? n.options.recordingDisable = !0 : "recording:off" === t[0] && (n.options.recordingOff = !0)
                            }))
                        }, t.prototype.createContainer = function() {
                            var t = document.createElement("div");
                            return t.id = "".concat(this.id).concat(c), t.setAttribute("style", "display: none"), this.options.zIndex && (t.style.zIndex = "".concat(this.options.zIndex + 1)), t.style.position = this.options.position, t
                        }, t.prototype.createFrame = function() {
                            var t = document.createElement("iframe");
                            return t.id = "".concat(this.id).concat(u), t.setAttribute("title", "Smartsupp"), t.setAttribute("aria-hidden", "true"), t
                        }, t.prototype.createFrameV2 = function() {
                            var t = this.createFrame();
                            return t.setAttribute("style", "width: 100%; height: 100%; border: none; position: absolute; left: 0"), this.options.zIndex && (t.style.zIndex = "".concat(this.options.zIndex + 1)), t
                        }, t.prototype.createFrameV3 = function() {
                            var t = this.createFrame();
                            return t.style.display = "block", t.style.position = "fixed", t.style.top = "0", t.style.left = "0", t.style.width = "1px", t.style.height = "1px", t.style.opacity = "0", t.style.border = "none", t.style.zIndex = "-1", t.style.pointerEvents = "none", t
                        }, t.prototype.render = function(t) {
                            return r(this, void 0, void 0, (function() {
                                return o(this, (function(e) {
                                    switch (e.label) {
                                        case 0:
                                            return this._initPromise ? [4, this._initPromise] : [3, 2];
                                        case 1:
                                            e.sent(), e.label = 2;
                                        case 2:
                                            return 3 === this.options.widgetVersion ? this.renderV3(t) : this.renderV2(t), [2]
                                    }
                                }))
                            }))
                        }, t.prototype.renderV2 = function(t) {
                            if (!document.getElementById(this.id + c)) {
                                if (!this.initialized) throw new Error("failed to initialize widget");
                                !t && this.options.renderTo && (t = this.options.renderTo), t && (this.options.zIndex = null);
                                var e = (0, s.resolveTargetElement)(t);
                                if (!e) throw new Error("target element not found");
                                this.el = this.createContainer(), this.renderFrameV2(this.el, e), this.rendered = !0
                            }
                        }, t.prototype.renderV3 = function(t) {
                            if (!document.getElementById(this.id + u)) {
                                if (!this.initialized) throw new Error("failed to initialize widget");
                                var e = (0, s.resolveTargetElement)(t);
                                if (!e) throw new Error("target element not found");
                                this.renderFrameV3(e), this.rendered = !0
                            }
                        }, t.prototype.renderFrameV2 = function(t, e) {
                            var n = this,
                                i = this.frame = this.createFrameV2();
                            i.addEventListener("load", (function() {
                                var t, e, a = null !== (t = i.contentDocument) && void 0 !== t ? t : null === (e = i.contentWindow) || void 0 === e ? void 0 : e.document;
                                if (!a) throw new Error("Cannot find Document");
                                var c = a.getElementsByTagName("head")[0],
                                    u = a.getElementsByTagName("body")[0];
                                u.id = "body", u.dataset.smartsuppId = n.id, u.innerHTML = '<div id="root"></div>', r(n, void 0, void 0, (function() {
                                    var t = this;
                                    return o(this, (function(e) {
                                        switch (e.label) {
                                            case 0:
                                                return [4, (0, s.request)("".concat(this.getBaseUrl(), "/asset-manifest.json")).then((function(t) {
                                                    return (0, s.parseJSON)(t)
                                                }))];
                                            case 1:
                                                return e.sent().entrypoints.forEach((function(e) {
                                                    var n = (0, s.createScript)(a, t.getBaseUrl() + "/".concat(e));
                                                    c.appendChild(n)
                                                })), [2]
                                        }
                                    }))
                                }))
                            })), t.appendChild(i), e.appendChild(t)
                        }, t.prototype.renderFrameV3 = function(t) {
                            var e = this,
                                n = this.frame = this.createFrameV3();
                            n.addEventListener("load", (function() {
                                var t, i, a = null !== (t = n.contentDocument) && void 0 !== t ? t : null === (i = n.contentWindow) || void 0 === i ? void 0 : i.document;
                                if (!a) throw new Error("Cannot find Document");
                                var c = a.getElementsByTagName("head")[0],
                                    u = a.getElementsByTagName("body")[0];
                                u.id = "body", u.dataset.smartsuppId = e.id, u.innerHTML = '<div id="app"></div>';
                                var l = "src/main.ts",
                                    p = function(t) {
                                        var n = (0, s.createScript)(a, e.getBaseUrl() + "/".concat(t));
                                        n.type = "module", c.appendChild(n)
                                    },
                                    d = function(t) {
                                        var n = (0, s.createLink)(a, "".concat(e.getBaseUrl(), "/").concat(t));
                                        n.rel = "stylesheet", n.crossOrigin = "anonymous", c.appendChild(n)
                                    };
                                !0 === e.options.widgetV3DevMode ? ["@vite/client", l].forEach(p) : r(e, void 0, void 0, (function() {
                                    var t, n, r, i;
                                    return o(this, (function(o) {
                                        switch (o.label) {
                                            case 0:
                                                return [4, (0, s.request)("".concat(this.getBaseUrl(), "/manifest.json")).then((function(t) {
                                                    return (0, s.parseJSON)(t)
                                                }))];
                                            case 1:
                                                return t = o.sent(), n = t[l], p(n.file), null === (r = n.imports) || void 0 === r || r.forEach((function(n) {
                                                    var r, o;
                                                    r = t[n].file, (o = (0, s.createLink)(a, "".concat(e.getBaseUrl(), "/").concat(r))).rel = "modulepreload", c.appendChild(o)
                                                })), null === (i = n.css) || void 0 === i || i.forEach(d), d(t["style.css"].file), [2]
                                        }
                                    }))
                                }))
                            })), t.appendChild(n)
                        }, t.prototype.destroy = function() {
                            this.el && this.el.parentNode && (this.el.parentNode.removeChild(this.el), this.el = null)
                        }, t.prototype.getOption = function(t, e) {
                            return void 0 !== this.options[t] ? this.options[t] : e
                        }, t.prototype.getBaseUrl = function() {
                            return 3 === this.options.widgetVersion ? this.options.widgetV3Url : this.options.widgetV2Url
                        }, t.prototype.getAssetUrl = function(t) {
                            return "".concat(this.getBaseUrl(), "/").concat(t)
                        }, t.prototype.getInternalApiUrl = function() {
                            return "".concat(this.options.bootstrapUrl, "/widget/").concat(this.options.key, "/code.js")
                        }, t.prototype.exec = function() {
                            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                            this._pushApi.push(t)
                        }, t.prototype.installApi = function(t) {
                            var e = this;
                            if (this.api = t, a.smartsupp.api = t, this._pushApi && (this._pushApi.forEach((function(n) {
                                    var r = Array.prototype.slice.call(n, 0);
                                    try {
                                        e.options.widgetTrackerEnabled && 3 === e.options.widgetVersion && (0, i.trackOperation)(e.options, r[0]), t.execute(r)
                                    } catch (t) {
                                        console.log(t)
                                    }
                                })), this._pushApi.push = function(n) {
                                    var r = Array.prototype.slice.call(n, 0);
                                    try {
                                        e.options.widgetTrackerEnabled && 3 === e.options.widgetVersion && (0, i.trackOperation)(e.options, r[0]), t.execute(r)
                                    } catch (t) {
                                        console.log(t)
                                    }
                                }), this.options.onStartup) try {
                                this.options.onStartup(t)
                            } catch (t) {
                                console.log(t)
                            }
                        }, t
                    }();
                e.SmartsuppWidget = l
            }
        },
        e = {};

    function n(r) {
        var o = e[r];
        if (void 0 !== o) return o.exports;
        var i = e[r] = {
            exports: {}
        };
        return t[r].call(i.exports, i, i.exports, n), i.exports
    }
    n.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (t) {
            if ("object" == typeof window) return window
        }
    }(), n.r = t => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, (() => {
        "use strict";
        n(412);
        var t = n(228),
            e = n(42);
        if (window.smartsupp || (window.smartsupp = function() {
                window.smartsupp._.push(arguments)
            }, window.smartsupp._ = []), !window.SMARTSUPP_LOADED) {
            window.SMARTSUPP_LOADED = !0;
            var r = new e.SmartsuppLoader({
                widgetVersion: 2,
                bootstrapUrl: "https://bootstrap.smartsuppchat.com",
                filesUrl: "https://files.smartsuppcdn.com",
                widgetV2Url: "https://widget-v2.smartsuppcdn.com",
                widgetV3Url: "https://widget-v3.smartsuppcdn.com",
                storageUrl: "https://{key}.storage.smartsuppchat.com",
                widgetApiUrl: "https://api.smartsuppchat.com",
                zIndex: 1e7,
                position: "auto",
                orientation: "right",
                autoInlineMode: !0,
                widgetV3DevMode: !1
            });
            window.$smartsupp = r, window.smartsupp = Object.assign(window.smartsupp, {
                chats: r.widgets,
                create: r.create.bind(r),
                createWidget: r.createWidget.bind(r),
                getChat: r.getChat.bind(r),
                getWidget: r.getWidget.bind(r),
                setDefaults: r.setDefaults.bind(r)
            }), !1 !== window.SMARTSUPP_AUTOCREATE && t((function() {
                window.smartsupp("html:apply", document), r.createWidget("chat", window._smartsupp, window.smartsupp._).then((function(t) {
                    return window.smartsupp.getAssetUrl = t.getAssetUrl.bind(t), t.render()
                })).catch((function(t) {
                    console.warn(t)
                }))
            }))
        }
    })()
})();