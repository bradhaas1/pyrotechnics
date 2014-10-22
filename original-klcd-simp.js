var klcdFramework = function() {
    var a = {},
        b = !0,
        c = 200,
        d = [],
        e = [],
        f = [];
    a.width = 0, a.height = 0;
    var g = "http://fls-na.amazon.com/1/4167135/1/OP/?impid=";
    a.hasForesterTracking = !1;
    var h = "onorientationchange" in window,
        i = h ? "orientationchange" : "resize",
        j = "/",
        k = "?",
        l = {
            maroon: "#800000",
            red: "#ff0000",
            orange: "#ffA500",
            yellow: "#ffff00",
            olive: "#808000",
            purple: "#800080",
            fuchsia: "#ff00ff",
            white: "#ffffff",
            lime: "#00ff00",
            green: "#008000",
            navy: "#000080",
            blue: "#0000ff",
            aqua: "#00ffff",
            teal: "#008080",
            black: "#000000",
            silver: "#c0c0c0",
            grey: "#808080"
        };
    a.init = function() {
        $isMobile && $("html,body").addClass("noscroll"), $(document).ready(function() {
            if (a.initForesterImp(), a.hasForesterTracking || a.trackEvent("133"), "undefined" != typeof evt) try {
                evt.pageReady(), console.log("KSO tracking:pageReady")
            } catch (b) {
                console.warn("KSO tracking:pageReady not in webview")
            }
        })
    }, a.initOrientation = function(b, d) {
        a.addOrientationListeners(b, d), window.addEventListener(i, function() {
            a.orientStartHandler(), setTimeout(a.orientHandler, c)
        }, !1), setTimeout(a.orientHandler, c)
    }, a.orientHandler = function() {
        h ? a.width === window.innerWidth ? setTimeout(a.orientHandler, c) : window.innerWidth > window.innerHeight ? p() : q() : $("body").width() > $("body").height() ? "landscape" !== a.orientation && p() : "portrait" !== a.orientation && q()
    }, a.orientStartHandler = function() {
        for (var a = 0; a < f.length; a++) f[a]()
    }, a.addOrientationListeners = function(a, b) {
        a && d.push(a), b && e.push(b)
    }, a.addOrientationStartListener = function(a) {
        a && f.push(a)
    }, a.setLandscapeBg = function(b) {
        b.src && (b.src = $adjustImgSuffix(b.src) + $ord), a.bgLandscape = b.src;
        var d = '<style type="text/css">';
        d += "body.landscape " + m(b), d += "</style>", setTimeout(function() {
            n(b, d, "landscape")
        }, c)
    }, a.setPortraitBg = function(b) {
        b.src && (b.src = $adjustImgSuffix(b.src) + $ord), a.bgPortrait = b.src;
        var d = '<style type="text/css">';
        d += "body.portrait " + m(b), d += "</style>", setTimeout(function() {
            n(b, d, "portrait")
        }, c)
    };
    var m = function(a) {
            var b = {
                repeat: "no-repeat",
                align: "center top",
                backgroundColor: "#000"
            };
            return $.extend(b, a), b.src ? "{background:" + b.backgroundColor + " url(" + b.src + ") " + b.align + " " + b.repeat + "}" : "{background-color:" + b.backgroundColor + "}"
        },
        n = function(b, c, d) {
            b.src ? a.orientation === d ? $("<img/>").attr("src", b.src).bind("load", function() {
                $("body").append(c), $(this).remove(), o(), backgroundPreloadComplete()
            }) : setTimeout(function() {
                $("<img/>").attr("src", b.src).bind("load", function() {
                    $("body").append(c), $(this).remove()
                })
            }, 1500) : ($("body").append(c), o(), backgroundPreloadComplete())
        };
    a.preloadImage = function(a, b) {
        $('<img src="' + a + '" />').on("load", function() {
            b && b.apply(void 0, b.arguments), $(this).remove()
        })
    };
    var o = function() {
        if (b) {
            for (var a = 0; a < _readyBgFuncs.length; a++) _readyBgFuncs[a]();
            b = !1
        }
    };
    a.writeCustomTag = function(a, b) {
        var c = b.split("<"),
            d = $(b);
        $(a).append(d), d[c[1].split(" ")[0].toLowerCase()]()
    }, a.listenForUrlHash = function(b) {
        b(a.getHash());
        var c = $isInFrame ? "uriStore" : "hashchange";
        $(window).on(c, function() {
            b(a.getHash())
        })
    }, a.setUrlHashSec = function(b) {
        var c = a.getHash(),
            d = c.split(k)[1];
        d = d ? k + d : "", a.storeHash(j + b + d)
    }, a.getUrlHashSec = function() {
        var b = a.getHash();
        if (b) {
            var c = b.split(k)[0].split("#/");
            if (c.length > 1) return c[1].split("/")[0]
        }
        return ""
    }, a.getUrlQueryParam = function(a) {
        return a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), retvar = window.location.search.match("[\\?&]" + a + "=([^&#]*)"), retvar ? retvar[1] : ""
    }, a.setUrlHashSubSec = function(b) {
        var c = a.getHash(),
            d = a.getUrlHashSec(),
            e = c.split(k)[1];
        e = e ? k + e : "", a.storeHash(j + d + "/" + b + e)
    }, a.getUrlHashSubSec = function() {
        var b = a.getHash();
        if (b) {
            var c = b.split(k)[0].split("#/");
            if (c.length > 1) return c[1].split("/")[1] || ""
        }
        return ""
    }, a.getUrlHashParams = function() {
        var b = a.getHash();
        if (b) {
            var c, d, e = b.split(k)[1];
            if (e) {
                c = {}, e = e.split("&");
                for (var f = 0; f < e.length; f++) d = e[f].split("="), c[d[0]] = d[1]
            }
            return c
        }
    }, a.setUrlHashParam = function(b, c) {
        var d = a.getUrlHashParams(),
            e = a.getHash(),
            f = "",
            g = !1;
        for (var h in d) h === b && (g = !0, d[h] = c), f += "&" + h + "=" + d[h];
        g || (f += "&" + b + "=" + c), a.storeHash(e.split(k)[0] + k + f.substr(1, f.length - 1))
    }, a.storeHash = function(a) {
        $isInFrame ? (localStorage.setItem("klcdUri", a), $dispatchEvent(window, "uriStore")) : location.hash = a
    }, a.getHash = function() {
        return $isInFrame ? localStorage.getItem("klcdUri") || "" : location.hash
    }, a.getProdUrl = function(a, b) {
        var c = "";
        if ($isAndroid) switch (b) {
            case "mp3":
                c = "amzn://mp3/android/buy?ASIN=" + a + "&type=album";
                break;
            case "app":
                c = "amzn://apps/android?asin=" + a;
                break;
            case "kindle":
                c = "kindle://store/openstore/?asin=" + a + "&storefront-context=ebooks";
                break;
            case "aiv":
                c = "intent://com.amazon.avod.detail#Intent;scheme=content;action=android.intent.action.VIEW;launchFlags=0x10000000;S.asin=" + a + ";end";
                break;
            case "physical":
                c = "intent://amazon/popup?asin=" + a + "&viewId=GameCenterInApp#Intent;scheme=amazonshop;action=android.intent.action.VIEW;end";
                break;
            case "physicalfull":
                c = "intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;package=com.amazon.windowshop;component=com.amazon.windowshop/.home.HomeLauncherActivity;S.com.amazon.windowshop.refinement.asin=" + a + ";end"
        } else c = "http://www.amazon.com/gp/product/" + a;
        return c
    }, a.getShareUrl = function(a, b) {
        return b || (b = "Sharing from Kindle"), "browser" === a.substr(0, 7) && (a = "http" + a.substring(7)), "intent://#Intent;action=android.intent.action.SEND;type=text/plain;S.android.intent.extra.TEXT=" + escape(a) + ";S.android.intent.extra.SUBJECT=" + escape(b) + ";end"
    }, a.redirectTo = function(a) {
        a && "#" !== a && (location.href = a)
    }, a.resetOverflowScrolling = function(a) {
        $isAndroid && $(a).css("display", "none"), $(a)[0].scrollTop = 0, $isAndroid && $(a).css("display", "block")
    }, a.trackEvent = function(b, c) {
        b += "";
        var d = b.split("|");
        d.length > 1 && a.hasForesterTracking ? c ? $klcd.trackForesterEvent(d[1], function() {
            a.redirectTo(c)
        }) : $klcd.trackForesterEvent(d[1]) : (console.log("KSO tracking:" + d[0]), "undefined" == typeof evt || a.hasForesterTracking || evt.clk("" + d[0]), c && a.redirectTo(c))
    }, a.trackForesterEvent = function(b, c) {
        a.genForesterPixel(b, c), console.log(" - forester tracking:" + b)
    }, a.initForesterImp = function() {
        var b = a.getUrlQueryParam("id");
        "" !== b && (a.hasForesterTracking = !0, g += b + "&type=")
    }, a.genForesterPixel = function(a, b) {
        $("<img />").attr("src", g + a).on("load", function() {
            b && b(), $(this).off("load")
        })
    }, a.showAfter = function(a, b) {
        if (showAfter = $(a).attr("showAfter"), void 0 != showAfter) {
            var c = "#" + showAfter;
            "" === showAfter && (c = $(a).next());
            var d = $(c).attr("transitionDuration") || $defaultTransDuration;
            $(c).css({
                opacity: 1,
                "-webkit-transition": "opacity " + d + "ms " + Math.floor(b / 2) + "ms"
            })
        }
    }, a.hideShowAfterElt = function(a) {
        if (a && $(a).attr("showAfter")) {
            var b = "#" + $(a).attr("showAfter");
            "" === $(a).attr("showAfter") && (b = $(a).next()), $(b).css({
                opacity: 0
            })
        }
    }, a.convertToCanvas = function(a, b) {
        $(a).show();
        var c = $(a).parent(),
            d = $(a).attr("src"),
            e = Math.floor($(a).width()),
            f = Math.floor($(a).height());
        $(c).find("canvas").remove(), $(a).after('<canvas width="' + e + '" height="' + f + '" data-id="' + d + '" style="opacity:0"></canvas>');
        var g = $(c).find('canvas[data-id="' + d + '"]')[0].getContext("2d");
        g.drawImage(a[0], 0, 0, e, f), setTimeout(function() {
            $(c).find('canvas[data-id="' + d + '"]').css({
                opacity: 1,
                "-webkit-transition": "opacity " + (b || $defaultTransDuration) + "ms"
            })
        }, 10), $(a).hide()
    }, a.initializeKlcdCompsFromStr = function(b, c) {
        for (var d = new RegExp("/klcd[A-Za-z0-9_]*(?=>)", "g"), e = b.match(d) || [], f = "", g = 0; g < e.length; g++) {
            var h = e[g].toLowerCase();
            if (-1 === f.indexOf(h)) {
                f += h;
                var i = h.split("/")[1];
                $(c).find(i).each(function() {
                    $(this)[i](), a.hideShowAfterElt($(this))
                })
            }
        }
    }, a.alignElt = function(a, b) {
        if (b) {
            var c = "end";
            "center" === b ? c = "center" : "left" === b && (c = "start"), $(a).css("-webkit-box-pack", c)
        }
    };
    var p = function() {
            r("landscape");
            for (var a = 0; a < d.length; a++) d[a]()
        },
        q = function() {
            r("portrait");
            for (var a = 0; a < e.length; a++) e[a]()
        },
        r = function(b) {
            a.orientation && $("body").removeClass(a.orientation), a.orientation = b, $("body").addClass(b), $isMobile ? (a.width = window.innerWidth, a.height = window.innerHeight) : (a.width = $("body").width(), a.height = $("body").height())
        };
    return a.hex2rgba = function(a, b) {
        if ("#" !== a[0]) {
            var c = a;
            a = "#000";
            for (var d in l)
                if (d === c) {
                    a = l[d];
                    break
                }
        }
        if (a = a.substr(1), 3 === a.length) {
            var e = a;
            a = "", e = /^([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(e).slice(1);
            for (var f = 0; 3 > f; f++) a += e[f] + e[f]
        }
        var g = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(a).slice(1);
        return "rgba(" + parseInt(g[0], 16) + "," + parseInt(g[1], 16) + "," + parseInt(g[2], 16) + "," + b + ")"
    }, a.generateFadeGradient = function(a, b) {
        return "-webkit-linear-gradient(" + (b || "bottom") + ", " + $klcd.hex2rgba(a, 1) + " 0%, " + $klcd.hex2rgba(a, 0) + " 100%)"
    }, a.isVertOverflowed = function(a) {
        return a.length > 0 ? $(a)[0].scrollHeight > $(a)[0].clientHeight : !1
    }, a.isVideo = function(a) {
        var b = a.split(".").pop();
        return "mp4" === b || "mov" === b || "3gp" === b || "ogv" === b
    }, a.isAsin = function(a) {
        return -1 === a.indexOf("/") && -1 === a.indexOf(".") && "#" !== a
    }, a.addAlertbox = function(a, b, c) {
        $(a).after('<div class="alertbox ' + c + '"><div class="inner">' + b + "</div></div>")
    }, a.removeAlertbox = function(a) {
        $(a).find(".alertbox").remove()
    }, a.addOverflowFader = function(b) {
        if (a.isVertOverflowed(b) && $(b).attr("fadeColor")) {
            "static" === $(b).css("position") && $(b).css("position", "relative");
            var c = $(b).html();
            $(b).html('<div class="_oflow">' + c + '<div style="height:3em;"></div></div>').css({
                overflow: "none"
            }), $klcd.initializeKlcdCompsFromStr(c, b), $(b).find("div._oflow").css({
                overflow: "auto",
                height: "100%",
                width: "100%",
                position: "relative"
            }), $(b).append('<div class="fade"></div>'), $(b).find("div.fade").css({
                background: a.generateFadeGradient($(b).attr("fadeColor"))
            })
        }
    }, a.throwMsg = function(a, b) {
        var c = "kLCD ::> ";
        "warn" == b ? console.warn(c + a) : "error" == b ? console.error(c + a) : console.log(c + a)
    }, a.getRandomArbitraryNum = function(a, b) {
        return Math.round(Math.random() * (b - a) + a)
    }, a.loadScript = function(a, b) {
        var c = document.createElement("script");
        return c.onreadystatechange = function() {
            "completed" != this.readyState && "loaded" != this.readyState || this.loadScriptDone || (this.loadScriptDone = !0, b())
        }, c.onload = b, c.type = "text/javascript", c.src = a, document.getElementsByTagName("head")[0].appendChild(c), c
    }, a.getKeyCode = function(a) {
        var b;
        return b = a ? a.which : window.event.keyCode
    }, a.createCookie = function(a, b, c) {
        var d, e;
        c ? (d = new Date, d.setTime(d.getTime() + 24 * c * 60 * 60 * 1e3), e = "; expires=" + d.toGMTString()) : e = "", document.cookie = a + "=" + b + e + "; path=/"
    }, a.eraseCookie = function(a) {
        $klcd.createCookie(a, "", -1)
    }, a.readCookie = function(a) {
        var b, c, d, e = a + "=";
        for (b = document.cookie.split(";"), c = 0; c < b.length; c++) {
            for (d = b[c];
                 " " == d.charAt(0);) d = d.substring(1, d.length);
            if (0 == d.indexOf(e)) return d.substring(e.length, d.length)
        }
        return null
    }, a.sortArray = function(a) {
        return Array.apply(0, Array(a.length)).map(function() {
            return a.splice(a.reduce(function(a, b, c) {
                return b > a.value ? {
                    index: c,
                    value: b
                } : a
            }, {
                value: null
            }).index, 1).pop()
        })
    }, a
};
$klcd = new klcdFramework, $klcd.init(),
    function(a) {
        var b, c, d, e, f, g;
        a.fn.klcdimgfill = function() {
            c = a(this).attr("src"), b = a(this).addClass("klcdImgFill").attr("data-src", c), a(b).attr("useSame") || (c = $adjustImgSuffix(c)), d = a(b).attr("loadDelay") || 0,
                function(a, b, c) {
                    setTimeout(h, b, a, c)
                }(b, d, c)
        };
        var h = function(b, c) {
            f = a(b).attr("appearDelay") || 0, e = a(b).attr("transitionDuration") || $defaultTransDuration, g = a(b).attr("width") || "100%", "yes" === a(b).attr("placeholder") && (c = $addSuffix(a(b).attr("data-src"), "@pre"));
            var d = "0" === a(b).attr("transitionDuration") ? 1 : 0,
                h = a('<img src="' + c + $ord + '" style="opacity:' + d + "; -webkit-transition: all " + e + "ms " + f + "ms;width:" + g + '" />');
            a(h).bind("load", function() {
                ! function(b) {
                    var c = b.parent();
                    c.attr("placeholder") ? (b.attr("src", $adjustImgSuffix(b.parent().attr("data-src"))), c.css("visibility", "hidden"), setTimeout(function() {
                        c.css("visibility", "visible")
                    }, 10)) : setTimeout(function() {
                        b.css({
                            opacity: 1
                        })
                    }, 5), $dispatchEvent(c[0], "load", {
                        src: a(b).attr("src")
                    }), $klcd.showAfter(c, c.attr("transitionDuration") || $defaultTransDuration)
                }(a(this))
            }), a(b).append(h)
        };
        $klcdReady(function() {
            a("klcdImgFill").each(function() {
                $klcd.hideShowAfterElt(a(this))
            })
        }), $klcdBackgroundsReady(function() {
            a("klcdImgFill").each(function() {
                a(this).klcdimgfill()
            })
        })
    }($jsLib),
    function(a) {
        var b, c = "images/klcd/klcd-device-btn_primary_spr.png",
            d = {
                paddingVert: "0.8em",
                spriteTopOffset: "-.33em",
                spriteVertSpacing: "4.4em",
                textSize: "1.4em"
            };
        a.fn.klcddevicebtn = function(f) {
            d = a.extend(d, f), b = a(this).addClass("klcdDeviceBtn"), loadDelay = a(b).attr("loadDelay") || 0, a(this).css({
                opacity: 0
            }),
                function(a, b, c) {
                    setTimeout(e, b, a, c)
                }(b, loadDelay, c)
        };
        var e = function(b) {
                appearDelay = a(b).attr("appearDelay") || 0, transitionDuration = a(b).attr("transitionDuration") || $defaultTransDuration, a(b).attr("style", "-webkit-transition:opacity " + transitionDuration + "ms " + appearDelay + 'ms;"'),
                    function(b) {
                        setTimeout(function() {
                            a(b).css({
                                opacity: 1
                            }), $klcd.showAfter(a(b), a(b).attr("transitionDuration") || $defaultTransDuration)
                        }, 10)
                    }(b), f(b)
            },
            f = function(b) {
                var c, d, e;
                a(b).bind("click", function() {
                    d = a(this).attr("href"), e = a(this).attr("share"), 1 === window.location.pathname.indexOf("AmazonSales") && (d = "defaultLandingPage.html"), e ? c = $klcd.getShareUrl(e) : !a(this).attr("klcdSection") && d && (c = $klcd.isAsin(d) ? $klcd.getProdUrl(d, a(this).attr("type") || "physical") : d), a(this).attr("tracker") ? $klcd.trackEvent(a(this).attr("tracker"), c) : $klcd.redirectTo(c)
                })
            };
        $klcdReady(function() {
            a("klcdDeviceBtn").each(function() {
                $klcd.hideShowAfterElt(a(this))
            })
        }), $klcdBackgroundsReady(function() {
            a("klcdDeviceBtn").each(function() {
                a(this).klcddevicebtn()
            })
        })
    }($jsLib);