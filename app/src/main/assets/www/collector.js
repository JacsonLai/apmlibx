!function(e) {
    function t() {
        if (0 != p.events.length) {
            var e = {
                type: "monitor_ajax",
                payload: {
                    url: c,
                    domain: d,
                    uri: u,
                    events: p.events.splice(0, p.events.length)
                }
            };
            jsinterface.ajaxsend(JSON.stringify(e))
        }
    }
    function n() {
        var e = v.getError();
        if (e.length > 0) {
            var t = {
                type: "monitor_error",
                payload: {
                    url: c,
                    domain: d,
                    uri: u,
                    navigationTiming: {},
                    resourceTiming: [],
                    error_list: e
                }
            };
            jsinterface.errsend(JSON.stringify(t))
        }
    }
    function r() {
        h && (h = !1, t(), n())
    }
    function i(e) {
        jsinterface.ressend(JSON.stringify(e))
    }
    function o() {
        if (e.pageMonitorStarted) return ! 1;
        e.pageMonitorStarted = !0;
        var t = 3e3;
        setTimeout(function() {
            var e = {
                type: "monitor_resourceTiming",
                payload: {
                    url: c,
                    domain: d,
                    uri: u,
                    navigationTiming: g.getNavigationTiming(),
                    resourceTiming: g.getResourceTiming(),
                    error_list: []
                }
            };
            i(e)
        },
        0);
        var n = function() {
            var e = g.getResourceTiming();
            if (e.length > 0) {
                var t = {
                    type: "monitor_resourceTiming",
                    payload: {
                        url: c,
                        domain: d,
                        uri: u,
                        navigationTiming: {},
                        resourceTiming: e,
                        error_list: []
                    }
                };
                i(t)
            }
        };
        e.setInterval(n, t);
        var r = !0;
        e.addEventListener("beforeunload",
        function() {
            r && (r = !1, n())
        }),
        e.addEventListener("unload",
        function() {
            r && (r = !1, n())
        })
    }
    function a(e, t, n) {
        return e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n),
        this
    }
    if (e.pmcMonitorVersion) return ! 1;
    e.pmcMonitorVersion = "1.0";
    var s = 3e3,
    c = e.location.href,
    d = e.location.hostname,
    u = e.location.pathname,
    l = e.location.host,
    f = (new Date).getTime(),
    p = {
        base: {},
        events: []
    },
    m = function() {
        function t(e, t) {
            if (Object.defineProperty && Object.keys) try {
                var n = Object.keys(e);
                return n.forEach(function(n) {
                    Object.defineProperty(t, n, {
                        get: function() {
                            return e[n]
                        },
                        set: function(t) {
                            return e[n] = t,
                            t
                        }
                    })
                }),
                t
            } catch(r) {}
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        }
        function n(e) {
            return ! (e && "function" == typeof e && e.apply && !e[l])
        }
        function r(e, t) {
            f[e] = i(e).concat(t)
        }
        function i(e) {
            return void 0 != e ? f[e] || [] : f
        }
        function o(e, t) {
            for (var n = i(e), r = n.length, o = 0; r > o; o++)"function" == typeof n[o] && n[o].apply(this, t)
        }
        function a(t, n, r) {
            e.addEventListener ? t.addEventListener(n, r, !1) : t.attachEvent("on" + n, r)
        }
        function s(t, n, r) {
            e.addEventListener ? t.removeEventListener(n, r, !1) : t.detachEvent("on" + n, r)
        }
        function c(e, r, i) {
            function a() {
                try {
                    var t = this,
                    n = Array.prototype.slice.call(arguments);
                    return o(r + (i || "") + "start", [t, n]),
                    e.apply(t, n)
                } catch(a) {
                    throw a
                } finally {
                    o(r + (i || "") + "end", [t, n])
                }
            }
            return n(e) ? e: (t(e, a), a[l] = !0, e.pmc_wrapped = a, a)
        }
        function d(e, t, r) {
            for (var i = 0,
            o = t.length; o > i; i++) {
                var a = t[i],
                s = e[a];
                n(s) || (e[a] = c(s, a, r))
            }
        }
        function u(e) {
            for (var t = 0,
            n = 0; n < e.length; n++) e.charCodeAt(n) > 127 || 94 == e.charCodeAt(n) ? t += 2 : t++;
            return t
        }
        var l = "pmc_wrapper",
        f = {},
        p = function() {
            function t() {
                o || a || (a = !0, e.addEventListener ? document.addEventListener("DOMContentLoaded", r, !1) : e.attachEvent && n())
            }
            function n() {
                try {
                    document.documentElement.doScroll("left")
                } catch(e) {
                    return setTimeout(n, 20)
                }
                r()
            }
            function r() {
                if (!o) {
                    o = !0;
                    for (var t = 0; t < i.length; t++) i[t].call(e);
                    i = []
                }
            }
            var i = [],
            o = !1,
            a = !1;
            return function(n) {
                o ? n.call(e) : i.push(n),
                t()
            }
        } ();
        return {
            on: r,
            listener: i,
            emit: o,
            addEvent: a,
            removeEvent: s,
            eventsWrapper: c,
            eventLisenerWrapper: d,
            lenReg: u,
            domReady: p
        }
    } (); !
    function() {
        var e = ["onreadystatechange", "onload", "onerror", "onabort", "onloadstart", "onloadend", "onprogress", "ontimeout"];
        if (XMLHttpRequest) {
            var t = XMLHttpRequest;
            XMLHttpRequest = function() {
                var n = new t(arguments);
                return m.emit("new-xhr", [n]),
                t.prototype.addEventListener && (n.addEventListener("readystatechange",
                function() {
                    m.eventLisenerWrapper(this, e, "-xhr-")
                }), m.eventLisenerWrapper(n, ["addEventListener", "removeEventListener"], "-xhr-"), n.addEventListener("loadstart",
                function() {},
                !1)),
                n
            },
            XMLHttpRequest.pmc_original = t,
            XMLHttpRequest.prototype = t.prototype,
            m.eventLisenerWrapper(XMLHttpRequest.prototype, ["open", "send"], "-xhr-"),
            m.on("open-xhr-start",
            function(t, n) {
                m.eventLisenerWrapper(t, e, "-xhr-")
            }),
            m.on("send-xhr-start",
            function(t, n) {
                m.eventLisenerWrapper(t, e, "-xhr-")
            })
        }
    } (),
    function() {
        function e(e) {
            if ("string" == typeof e) return m.lenReg(e);
            if ("undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer && e.byteLength) return e.byteLength;
            if ("undefined" != typeof Blob && e instanceof Blob && e.size) return e.size;
            try {
                return m.lenReg(JSON.stringify(e))
            } catch(t) {
                return 0
            }
            return 0
        }
        function t(t) {
            var n = "";
            switch (t.responseType) {
            case "arraybuffer":
            case "blob":
                n = t.response;
                break;
            default:
                n = t.responseText
            }
            return e(n)
        }
        function n(e) {
            3 == e.readyState && (e.pmc_metrics.firstbyte_time = (new Date).getTime()),
            4 == e.readyState && (e.pmc_metrics.res_time = e.pmc_metrics.cb_start_time = e.pmc_metrics.lastbyte_time = (new Date).getTime(), e.pmc_metrics.rep_code = e.status, e.pmc_metrics.code_text = e.statusText, e.pmc_metrics.rep_size = t(e), e.pmc_metrics.timeout = e.timeout, e.pmc_metrics.is_err = e.status < 400 ? 0 : 1)
        }
        function r(e) {
            4 == e.readyState && (e.pmc_metrics.cb_end_time = (new Date).getTime(), p.events.push(e.pmc_metrics))
        }
        XMLHttpRequest && (m.on("new-xhr",
        function(e, t) {
            e.pmc_metrics = {
                eve_type: "ajax"
            }
        }), m.on("open-xhr-start",
        function(e, t) {
            e.pmc_metrics.req_url = t[1],
            e.pmc_metrics.req_method = t[0].toLocaleLowerCase(),
            e.pmc_metrics.is_asyn = t[2]
        }), m.on("send-xhr-start",
        function(t, n) {
            t.pmc_metrics.req_time = (new Date).getTime(),
            t.pmc_metrics.req_size = e(n[0])
        }), m.on("onreadystatechange-xhr-start",
        function(e, t) {
            n(e)
        }), m.on("onreadystatechange-xhr-end",
        function(e, t) {
            r(e)
        }), m.on("onload-xhr-start",
        function(e, t) {
            n(e)
        }), m.on("onload-xhr-end",
        function(e, t) {
            r(e)
        }), m.on("onloadstart-xhr-start",
        function(e, t) {
            e.pmc_metrics.firstbyte_time = (new Date).getTime()
        }), m.on("addEventListener-xhr-start",
        function(e, t) {
            var n = t[1];
            "function" == typeof n && (t[1] = n.pmc_wrapped || m.eventsWrapper(n, "eventListener-xhr-fn-"))
        }), m.on("removeEventListener-xhr-start",
        function(e, t) {
            var n = t[1].pmc_wrapped;
            n && (t[1] = n)
        }), m.on("eventListener-xhr-fn-start",
        function(e, t) {
            var r = t[0];
            "readystatechange" != r.type && "load" != r.type || n(e)
        }), m.on("eventListener-xhr-fn-end",
        function(e, t) {
            var n = t[0];
            "readystatechange" != n.type && "load" != n.type || r(e),
            "loadstart" == n.type && (e.pmc_metrics.firstbyte_time = (new Date).getTime())
        }))
    } ();
    var v = function() {
        var t = [];
        return e.addEventListener && e.addEventListener("error",
        function(e) {
            var n = {};
            n.time = e.timeStamp || (new Date).getTime(),
            n.url = e.filename,
            n.msg = e.message,
            n.line = e.lineno,
            n.column = e.colno,
            e.error ? (n.type = e.error.name, n.stack = e.error.stack) : (n.msg.indexOf("Uncaught ") > -1 ? n.stack = n.msg.split("Uncaught ")[1] + " at " + n.url + ":" + n.line + ":" + n.column: n.stack = n.msg + " at " + n.url + ":" + n.line + ":" + n.column, n.type = n.stack.slice(0, n.stack.indexOf(":"))),
            n.type.toLowerCase().indexOf("script error") > -1 && (n.type = "ScriptError"),
            t.push(n)
        },
        !1),
        {
            getError: function() {
                return t.splice(0, t.length)
            }
        }
    } ();
    e.setInterval(function() {
        t(),
        n()
    },
    s);
    var h = !0;
    m.addEvent(e, "beforeunload", r),
    m.addEvent(e, "unload", r);
    var g = function() {
        function t() {
            if (!e.performance || !e.performance.timing) return {};
            var t = e.performance.timing;
            return {
                navigationStart: t.navigationStart,
                redirectStart: t.redirectStart,
                redirectEnd: t.redirectEnd,
                fetchStart: t.fetchStart,
                domainLookupStart: t.domainLookupStart,
                domainLookupEnd: t.domainLookupEnd,
                connectStart: t.connectStart,
                secureConnectionStart: t.secureConnectionStart ? t.secureConnectionStart: t.connectEnd - t.secureConnectionStart,
                connectEnd: t.connectEnd,
                requestStart: t.requestStart,
                responseStart: t.responseStart,
                responseEnd: t.responseEnd,
                unloadEventStart: t.unloadEventStart,
                unloadEventEnd: t.unloadEventEnd,
                domLoading: t.domLoading,
                domInteractive: t.domInteractive,
                domContentLoadedEventStart: t.domContentLoadedEventStart,
                domContentLoadedEventEnd: t.domContentLoadedEventEnd,
                domComplete: t.domComplete,
                loadEventStart: t.loadEventStart,
                loadEventEnd: t.loadEventEnd,
                pageTime: f || (new Date).getTime()
            }
        }
        function n() {
            if (!e.performance || !e.performance.getEntriesByType) return [];
            for (var t = e.performance.getEntriesByType("resource"), n = [], r = 0; r < t.length; r++) {
                var i = t[r].secureConnectionStart ? t[r].secureConnectionStart: t[r].connectEnd - t[r].secureConnectionStart,
                o = {
                    connectEnd: t[r].connectEnd,
                    connectStart: t[r].connectStart,
                    domainLookupEnd: t[r].domainLookupEnd,
                    domainLookupStart: t[r].domainLookupStart,
                    duration: t[r].duration,
                    entryType: t[r].entryType,
                    fetchStart: t[r].fetchStart,
                    initiatorType: t[r].initiatorType,
                    name: t[r].name,
                    redirectEnd: t[r].redirectEnd,
                    redirectStart: t[r].redirectStart,
                    requestStart: t[r].requestStart,
                    responseEnd: t[r].responseEnd,
                    responseStart: t[r].responseStart,
                    secureConnectionStart: i,
                    startTime: t[r].startTime
                };
                n.push(o)
            }
            return n
        }
        return {
            cacheResourceTimingLength: 0,
            getNavigationTiming: function() {
                return t()
            },
            getResourceTiming: function() {
                var e = n(),
                t = e.length;
                return e.length != this.cacheResourceTimingLength ? (e = e.slice(this.cacheResourceTimingLength, t), this.cacheResourceTimingLength = t, e) : []
            }
        }
    } ();

    e.startWebViewMonitor = o;

    for (var y = 0,
    E = !1,
    L = ["iPad", "iPhone", "iPod"]; y < L.length; y++) if (navigator.platform.indexOf(L[y]) >= 0) {
        E = !0;
        break
    }
    var w = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
    S = navigator.userAgent.toLowerCase().indexOf("android") > -1,
    _ = {
        callbacks: {},
        send: function(e, t) {
            this.dispatchMessage("event", e, t)
        },
        sendCallback: function(e) {
            var t = C.createEnvelope(e);
            this.dispatchMessage("callback", t,
            function() {})
        },
        triggerCallback: function(e) {
            var t = this;
            setTimeout(function() {
                t.callbacks[e] && t.callbacks[e]()
            },
            0)
        },
        dispatchMessage: function(e, t, n) {
            var r = this;
            if (this.callbacks[t.id] = function() {
                n(),
                delete r.callbacks[t.id]
            },
            w) {
                var i = "pmc://" + e + "/" + t.id + "?" + encodeURIComponent(JSON.stringify(t)),
                o = document.createElement("iframe");
                o.setAttribute("src", i),
                document.documentElement.appendChild(o),
                o.parentNode.removeChild(o),
                o = null
            } else S && jsinterface.send(JSON.stringify(t))
        }
    },
    C = {
        listeners: {},
        dispatcher: null,
        messageCount: 0,
        on: function(e, t) { (!this.listeners.hasOwnProperty(e) || !this.listeners[e] instanceof Array) && (this.listeners[e] = []),
            this.listeners[e].push(t)
        },
        off: function(e) { (!this.listeners.hasOwnProperty(e) || !this.listeners[e] instanceof Array) && (this.listeners[e] = []),
            this.listeners[e] = []
        },
        send: function(e, t, n) {
            t instanceof Function && (n = t, t = null),
            t = t || {},
            n = n ||
            function() {};
            var r = this.createEnvelope(this.messageCount, e, t);
            this.dispatcher.send(r, n),
            this.messageCount += 1
        },
        trigger: function(e, t, n) {
            for (var r = this,
            i = this.listeners[e] || [], o = 0, a = function() {
                o += 1,
                o >= i.length && r.dispatcher.sendCallback(t)
            },
            s = 0; s < i.length; s++) {
                var c = i[s];
                c.length <= 1 ? (c(n), a()) : c(n, a)
            }
        },
        triggerCallback: function(e) {
            this.dispatcher.triggerCallback(e)
        },
        createEnvelope: function(e, t, n) {
            return {
                id: e,
                type: t,
                host: l,
                payload: n
            }
        }
    },
    T = {
        send: function(e, t) {
            t()
        },
        triggerCallback: function() {},
        sendCallback: function() {}
    };
    E && w || S ? C.dispatcher = _: C.dispatcher = T,

    e.pmcAddEvent = function() {
        function t(e) {
            function t(e) {
                var r = e.nodeName.toLocaleLowerCase();
                "body" != r && "a" != r && t(e.parentNode),
                "a" == r && (n = !0)
            }
            var n = !1;
            return t(e.parentNode),
            n
        }
        if (e.pmcEventStart) return ! 1;
        e.pmcEventStart = !0;
        for (var n = document.getElementsByTagName("a"), r = 0, i = n.length; i > r; r++) a(n[r], "click",
        function(e) {
            var t = this.innerText,
            n = this.href;
            t = t.replace(/<.*[^>]*>/g, ""),
            C.send("onclick", {
                linkText: t.replace(/[\\r\\n]/g, ""),
                linkUrl: n
            })
        });
        e.onclick = function(e) {
            var n = e.target,
            r = t(n);
            if (!r && "a" != n.nodeName.toLocaleLowerCase()) {
                var i = n.innerHTML;
                i ? i = i.replace(/<.*[^>]*>/g, "") : "img" == n.tagName.toLocaleLowerCase() && (i = n.alt || ""),
                C.send("onclick", {
                    linkText: i.replace(/[\\r\\n]/g, ""),
                    linkUrl: ""
                })
            }
        }
    }
} (this);