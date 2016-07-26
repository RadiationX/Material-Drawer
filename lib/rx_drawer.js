function Drawer(drawerElem) {
    "use strict";

    function checkMobile(a) {
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
    }
    var drawerIcon = {
            set: function (a) {},
            setState: function (a, b) {},
            setOnClick: function(a) {}
        },
        drawerBg,
        drawerStarted = false,
        width = drawerElem.offsetWidth,
        correct = 0,
        percent = 0,
        trx = 0,
        opened = false,
        startMoveTime = 0,
        startX = 0,
        speedSwipe = 0,
        isMobile = checkMobile(navigator.userAgent || navigator.vendor || window.opera),
        isIE = window.navigator.msPointerEnabled,
        isIE11 = window.navigator.pointerEnabled,
        typeStart = isIE ? "MSPointerDown" : (isMobile ? "touchstart" : "mousedown"),
        typeMove = isIE ? "MSPointerMove" : (isMobile ? "touchmove" : "mousemove"),
        typeEnd = isIE ? "MSPointerUp" : (isMobile ? "touchend" : "mouseup"),
        trZ = "translateZ(0)",
        stateMoved = false,
        transformProp = "transform",
        transitionProp = "transition",
        propPrefixCss = "",
        antiSelect,
        onOpened = function () {},
        onClosed = function () {},
        onMove = function (x, percent, animation, duration) {};

    function setProperty(elem, property, value) {
        elem.style[property] = value;
    }

    function transfrom(x) {
        setProperty(drawerElem, transformProp, x + " " + trZ);
    }

    function move(x, e) {
        if (x < 0) {
            x = 0;
        }
        if (x > width) {
            x = width;
        }
        if (!stateMoved) {
            if (!isMobile) {
                antiSelect.style.visibility = "visible";
                if (!document.body.classList.contains("rx_noselect"))
                    document.body.classList.add("rx_noselect");
            }
            if (trx == x) {
                stateMoved = false;
                return;
            } else {
                e.preventDefault();
                stateMoved = true;
            }

        }
        trx = x;
        transfrom("translateX(-" + x + "px)");
        percent = (1 - (x / width));
        if (percent >= 1) {
            percent = 1;
        } else if (percent <= 0) {
            percent = 0;
        }
        drawerIcon.set(percent * 100);
        drawerBg.style.opacity = percent;
        onMove(320 - x, percent, false, 0);
    }

    function setTransition(s) {
        setProperty(drawerElem, transitionProp, propPrefixCss + "transform " + s + "s cubic-bezier(0.0, 0.0, 0.2, 1)");
        setProperty(drawerBg, transitionProp, "opacity " + s + "s cubic-bezier(0.0, 0.0, 0.2, 1)");
    }

    function clearTransition() {
        setProperty(drawerElem, transitionProp, "none");
        setProperty(drawerBg, transitionProp, "none");
    }

    function openDrawer(s) {
        s = s || 0.225;
        opened = true;
        setTransition(s);
        drawerElem.style.opacity = 1;
        drawerBg.style.opacity = 1;
        drawerBg.style.visibility = "visible";
        transfrom("translateX(0)");
        drawerIcon.setState(1, s);
        onMove(width, 1, true, s);
        setTimeout(function () {
            clearTransition();
            if (drawerStarted) {
                return;
            }
            onOpened();
        }, s * 1000);
    }

    function closeDrawer(s) {
        s = s || 0.225;
        opened = false;
        setTransition(s);
        drawerBg.style.opacity = 0.001;
        transfrom("translateX(-" + width + "px)");
        drawerIcon.setState(0, s);
        onMove(0, 0, true, s);
        setTimeout(function () {
            clearTransition();
            if (drawerStarted) {
                return;
            }
            drawerElem.style.opacity = 0.001;
            drawerBg.style.visibility = "hidden";
            onClosed();
        }, s * 1000);
    }

    function toggleDrawer() {
        if (opened) {
            closeDrawer(0.225);
        } else {
            openDrawer(0.225);
        }
    }

    function onMovedNoOpen(e) {
        move(correct - e.touches[0].clientX, e);
    }

    function onMovedOpen(e) {
        move(startX - e.touches[0].clientX, e);
    }

    function onMovedNoOpenDesktop(e) {
        move(correct - e.clientX, e);
    }

    function onMovedOpenDesktop(e) {
        move(startX - e.clientX, e);
    }

    window.addEventListener("resize", function (e) {
        width = drawerElem.offsetWidth;
        if (!opened) {
            transfrom("translateX(-" + width + "px)");
        }
    });

    drawerElem.addEventListener(typeStart, function (e) {
        drawerElem.style.opacity = 1;
        drawerBg.style.visibility = "visible";
        startX = isMobile ? e.touches[0].clientX : e.clientX;
        startMoveTime = new Date();
        correct = width + startX;
        drawerStarted = true;
    });
    document.addEventListener(typeStart, function (e) {
        if (!drawerStarted) {
            return;
        }
        if (opened) {
            document.addEventListener(typeMove, isMobile ? onMovedOpen : onMovedOpenDesktop);
        } else {
            document.addEventListener(typeMove, isMobile ? onMovedNoOpen : onMovedNoOpenDesktop);
        }
    });

    document.addEventListener(typeEnd, function (e) {
        drawerStarted = false;
        stateMoved = false;
        if (!isMobile) {
            antiSelect.style.visibility = "hidden";
            document.body.classList.remove("rx_noselect");
        }
        document.removeEventListener(typeMove, isMobile ? onMovedOpen : onMovedOpenDesktop);
        document.removeEventListener(typeMove, isMobile ? onMovedNoOpen : onMovedNoOpenDesktop);

        speedSwipe = (((width / 2) / ((Math.abs((isMobile ? e.changedTouches[0].clientX : e.clientX) - startX)) / (new Date() - startMoveTime))) / 1000).toFixed(3);
        if (speedSwipe == Infinity) {
            if (!opened) {
                closeDrawer(0);
            } else {
                openDrawer(0);
            }
            return;
        }
        if (trx == 0) {
            return;
        }
        if (speedSwipe <= 0.150) {
            speedSwipe = 0.150;
        } else if (speedSwipe >= 0.5) {
            speedSwipe = 0.5;
        }
        var intent = (startX - (isMobile ? e.changedTouches[0].clientX : e.clientX)) > 0;
        if ((width / 2.25) > trx) {
            if (intent && speedSwipe < 0.4) {
                closeDrawer(speedSwipe);
            } else {
                openDrawer(speedSwipe);
            }
        } else {
            if (!intent && speedSwipe < 0.4) {
                openDrawer(speedSwipe);
            } else {
                closeDrawer(speedSwipe);
            }
        }
        trx = 0;
    });
    this.setDrawerIcon = function (icon) {
        drawerIcon = icon;
        drawerIcon.setOnClick(function (e) {
            toggleDrawer();
        });
    };
    this.getDrawerIcon = function () {
        return drawerIcon;
    };
    this.resetIconOnClick = function(){
        drawerIcon.setOnClick(function (e) {
            toggleDrawer();
        });
    };
    this.onOpenListener = function (listener) {
        onOpened = listener;
    };
    this.onCloseListener = function (listener) {
        onClosed = listener;
    };
    this.onMoveListener = function (listener) {
        onMove = listener;
    };
    this.openDrawer = function () {
        openDrawer();
    };
    this.closeDrawer = function () {
        closeDrawer();
    };
    this.toggleDrawer = function () {
        toggleDrawer();
    };
    this.isOpen = function () {
        return opened;
    };

    (function () {
        drawerBg = document.createElement("DIV");
        drawerBg.className = "drawer_bg";
        drawerBg.id = "drawer_bg";
        drawerElem.parentElement.insertBefore(drawerBg, drawerElem);
        drawerBg.onclick = function () {
            if (opened) {
                closeDrawer(0.225);
            }
        };
        antiSelect = document.createElement("DIV");
        antiSelect.className = "antiSelect";
        drawerElem.appendChild(antiSelect);
        var label = document.createElement("DIV");
        label.className = "label";
        drawerElem.appendChild(label);
        //Find prop name
        var vendors;
        if (antiSelect.style.transform === undefined) {
            vendors = ['Webkit', 'Moz', 'ms', 'O'];
            for (var vendor in vendors) {
                if (antiSelect.style[vendors[vendor] + 'Transform'] !== undefined) {
                    transformProp = vendors[vendor] + 'Transform';
                    propPrefixCss = "-" + vendors[vendor].toLowerCase() + "-";
                }
                if (antiSelect.style[vendors[vendor] + 'Transition'] !== undefined) {
                    transitionProp = vendors[vendor] + 'Transition';
                }
            }
        }
        if (/.*opera.*presto/i.test(navigator.userAgent)) {
            trZ = "";
        }
    })();
}
